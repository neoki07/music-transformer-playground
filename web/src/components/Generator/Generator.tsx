import { useCallback, Suspense } from "react";
import {
  NoteNumber,
  Seconds,
  Synth,
  Velocity,
} from "@resonance-box/recital-core";
import { Player } from "./Player";
import { LoadingSong } from "./LoadingSong";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Error } from "./Error";

interface GeneratorProps {
  apiUrl: string;
  synth: Synth;
}

export function Generator({ apiUrl, synth }: GeneratorProps) {
  const { reset } = useQueryErrorResetBoundary();

  const playNote = useCallback(
    (noteNumber: number) => {
      synth.noteOn(
        new NoteNumber(noteNumber),
        new Velocity(100),
        new Seconds(0)
      );
    },
    [synth]
  );

  const stopNote = useCallback(
    (noteNumber: number) => {
      synth.noteOff(new NoteNumber(noteNumber), new Seconds(0));
    },
    [synth]
  );

  return (
    <div>
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <Error onReset={resetErrorBoundary} />
        )}
      >
        <Suspense
          fallback={<LoadingSong playNote={playNote} stopNote={stopNote} />}
        >
          <Player apiUrl={apiUrl} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
