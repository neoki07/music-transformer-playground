import fastapi
from fastapi.middleware.cors import CORSMiddleware
from google.protobuf.json_format import MessageToDict

from app.generate_unconditional import generate_from_scratch

app = fastapi.FastAPI()

origins = ['http://localhost:3000', 'http://localhost:5173', 'https://music-transformer-playground-frontend.vercel.app']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "hello, world"}


@app.get("/generate/unconditional/from-scratch")
def generate_from_scratch_with_unconditional_model():
    generated_ns = generate_from_scratch()
    return MessageToDict(generated_ns)
