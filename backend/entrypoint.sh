#!/bin/bash

# Apply database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start Gunicorn server
exec gunicorn backend.wsgi:application --bind 0.0.0.0:8000