import fastapi

app = fastapi.FastAPI()


@app.get("/")
def root():
    return {"message": "hello, world"}
