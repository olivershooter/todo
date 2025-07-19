# Dockerfile
FROM python:3.12-slim-bookworm

RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /code

WORKDIR /code

COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY . /code

RUN python manage.py collectstatic --noinput

RUN chmod +x /code/entrypoint.sh