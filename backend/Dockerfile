# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc build-essential

# Copy requirements and install dependencies
COPY backend/requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt gunicorn

# Copy the application code
COPY backend /app/

# Run database migrations and collect static files
RUN python manage.py migrate --noinput && \
    python manage.py collectstatic --noinput

# Expose the application port
EXPOSE 8000

# Run the application using Gunicorn
CMD ["gunicorn", "appliance_management.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]