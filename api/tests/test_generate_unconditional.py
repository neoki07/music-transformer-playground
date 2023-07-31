from app.generate_unconditional import generate_from_scratch


def test_generate_from_scratch():
    generated_ns = generate_from_scratch()
    assert generated_ns is not None
