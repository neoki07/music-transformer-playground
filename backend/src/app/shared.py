from tensor2tensor.data_generators import text_encoder


# Decode a list of IDs.
def decode(ids, encoder):
    ids = list(ids)
    if text_encoder.EOS_ID in ids:
        ids = ids[: ids.index(text_encoder.EOS_ID)]
    return encoder.decode(ids)
