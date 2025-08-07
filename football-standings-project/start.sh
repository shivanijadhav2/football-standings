#!/bin/bash

# Check if Docker Compose is installed (modern syntax)
if ! command -v docker &> /dev/null || ! docker compose version &> /dev/null
then
    echo "Docker or Docker Compose could not be found. Please install Docker Desktop."
    exit 1
fi

echo "Starting the Football Standings application..."

# Use a .env file to load environment variables
if [ -f .env ]; then
    export $(cat .env | xargs)
else
    echo ".env file not found. Please create one with your API_FOOTBALL_KEY."
    exit 1
fi

# Build and start the containers (updated syntax)
docker compose up --build --detach

if [ $? -eq 0 ]; then
    echo "Application started successfully."
    echo "Backend is running on http://localhost:8080"
    echo "Frontend is accessible at http://localhost"
else
    echo "Failed to start the application. Please check the logs."
    exit 1
fi