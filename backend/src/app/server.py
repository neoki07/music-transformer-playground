import fastapi
from google.protobuf.json_format import MessageToDict

from app.generate_unconditional import generate_from_scratch

app = fastapi.FastAPI()


@app.get("/")
def root():
    return {"message": "hello, world"}


@app.get("/generate/unconditional/from-scratch")
def generate_from_scratch_with_unconditional_model():
    generated_ns = generate_from_scratch()
    return MessageToDict(generated_ns)
