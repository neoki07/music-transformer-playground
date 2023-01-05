from typing import List

import note_seq
import numpy as np
from magenta.models.score2perf import score2perf
from tensor2tensor.utils import decoding, trainer_lib

from app.shared import decode


class PianoPerformanceLanguageModelProblem(score2perf.Score2PerfProblem):
    @property
    def add_eos_symbol(self):
        return True


# Create input generator (so we can adjust priming and
# decode length on the fly).
def input_generator(targets, decode_length):
    while True:
        yield {
            "targets": np.array([targets], dtype=np.int32),
            "decode_length": np.array(decode_length, dtype=np.int32),
        }


def generate_ns_from_scratch(estimator, ckpt_path, unconditional_encoders):
    targets: List[int] = []
    decode_length = 1024

    # Start the Estimator, loading from the specified checkpoint.
    input_fn = decoding.make_input_fn_from_generator(
        input_generator(targets, decode_length)
    )
    unconditional_samples = estimator.predict(input_fn, checkpoint_path=ckpt_path)

    # Generate sample events.
    sample_ids = next(unconditional_samples)["outputs"]

    # Decode to NoteSequence.
    midi_filename = decode(sample_ids, encoder=unconditional_encoders["targets"])
    unconditional_ns = note_seq.midi_file_to_note_sequence(midi_filename)

    return unconditional_ns


def generate_ns_continuation(primer_ns, estimator, ckpt_path, unconditional_encoders):
    targets = unconditional_encoders["targets"].encode_note_sequence(primer_ns)

    # Remove the end token from the encoded primer.
    targets = targets[:-1]

    decode_length = max(0, 4096 - len(targets))
    if len(targets) >= 4096:
        print(
            "Primer has more events than maximum sequence length; nothing will be generated."
        )

    # Start the Estimator, loading from the specified checkpoint.
    input_fn = decoding.make_input_fn_from_generator(
        input_generator(targets, decode_length)
    )
    unconditional_samples = estimator.predict(input_fn, checkpoint_path=ckpt_path)

    # Generate sample events.
    sample_ids = next(unconditional_samples)["outputs"]

    # Decode to NoteSequence.
    midi_filename = decode(sample_ids, encoder=unconditional_encoders["targets"])
    ns = note_seq.midi_file_to_note_sequence(midi_filename)

    # Append continuation to primer.
    continuation_ns = note_seq.concatenate_sequences([primer_ns, ns])

    return continuation_ns


def generate_from_scratch():
    model_name = "transformer"
    hparams_set = "transformer_tpu"
    ckpt_path = "checkpoints/unconditional_model_16.ckpt"

    problem = PianoPerformanceLanguageModelProblem()
    unconditional_encoders = problem.get_feature_encoders()

    # Set up HParams.
    hparams = trainer_lib.create_hparams(hparams_set=hparams_set)
    trainer_lib.add_problem_hparams(hparams, problem)
    hparams.num_hidden_layers = 16
    hparams.sampling_method = "random"

    # Set up decoding HParams.
    decode_hparams = decoding.decode_hparams()
    decode_hparams.alpha = 0.0
    decode_hparams.beam_size = 1

    # Create Estimator.
    run_config = trainer_lib.create_run_config(hparams)
    estimator = trainer_lib.create_estimator(
        model_name, hparams, run_config, decode_hparams=decode_hparams
    )

    generated_ns = generate_ns_from_scratch(
        estimator,
        ckpt_path,
        unconditional_encoders,
    )

    return generated_ns
