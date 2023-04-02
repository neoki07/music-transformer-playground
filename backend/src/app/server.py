import io

import fastapi
import note_seq
from app.generate_unconditional import generate_from_scratch
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from google.protobuf.json_format import MessageToDict

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
    ns = generate_from_scratch()
    pm = note_seq.note_sequence_to_pretty_midi(ns)
    midi_bytes = io.BytesIO()
    pm.write(midi_bytes)
    return Response(
        content=midi_bytes.getvalue(),
        media_type="audio/midi"
    )
