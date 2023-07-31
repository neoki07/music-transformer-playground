FROM python:3.7-slim as pdm

RUN apt-get update -y
RUN apt-get install build-essential -y

RUN pip install -U pip setuptools wheel
RUN pip install pdm


FROM pdm as builder
WORKDIR /project

COPY pyproject.toml pdm.lock /project/
RUN pdm sync -G server --prod --no-self

COPY src/ /project/src
RUN pdm sync -G server --prod --no-editable


FROM google/cloud-sdk as downloader

RUN mkdir -p /project/content /project/checkpoints

RUN gsutil -q -m cp gs://magentadata/soundfonts/Yamaha-C5-Salamander-JNv5.1.sf2 /project/content
RUN gsutil -q -m cp -r gs://magentadata/models/music_transformer/checkpoints/* /project/checkpoints


FROM python:3.7-slim

RUN apt-get update -y
RUN apt-get install libsndfile1 -y

COPY --from=builder /project/.venv /project/.venv
ENV PATH /project/.venv/bin:$PATH

COPY --from=downloader /project/content /project/content
COPY --from=downloader /project/checkpoints /project/checkpoints

WORKDIR /project
COPY src/ /project/src

ENV PORT 8080
EXPOSE $PORT

CMD uvicorn src.app.server:app --reload --host 0.0.0.0 --port $PORT
