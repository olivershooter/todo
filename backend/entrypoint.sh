#!/bin/bash

# Apply database migrations
python manage.py migrate

# Start Gunicorn server
exec gunicorn backend.wsgi:application --bind 0.0.0.0:8000