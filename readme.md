# Gizi Wise Image Prediction Service

## Installation

Install required packages

`pip install --no-cache-dir --upgrade -r /requirements.txt`

## Running the App

`uvicorn main:app --port 8088`

The image prediction server will run at `http://127.0.0.1:8088`, put this url into `.env` file of the main app
