# College AI Helpdesk

An NLP-based AI assistant designed to help college students with common academic and administrative queries.

## Overview

College AI Helpdesk is a machine learning based chatbot developed to provide quick and accessible responses to common student questions.

The project also explores an incremental model development approach using multiple model versions. Instead of retraining the complete system from scratch for every improvement, new versions are developed by targeting specific weaknesses and adding relevant training data.

## Key Features

- Natural Language Processing based intent classification
- Automated responses to common student queries
- Multiple model versions for experimentation
- Flask-based web application
- Machine learning model and vectorizer integration
- Expandable intent and training-data structure

## Model Development

The project currently follows a version-based development approach:

| Version | Purpose |
|---------|---------|
| V1 | Initial baseline model |
| V2 | Model improvement with additional data |
| V3 | Further refinement of targeted intents |

The main objective is to evaluate whether incremental training can improve weak intents while preserving the performance of previously learned intents.

## Research Direction

This project is also an experiment in practical AI model improvement.

The major questions being explored are:

- Can targeted data improve weak intents effectively?
- Can model performance be improved without completely rebuilding the training pipeline?
- Does incremental training affect previously learned intents?
- Can this approach reduce unnecessary retraining?
- How can catastrophic forgetting be identified and evaluated?

## Technology Stack

- Python
- Flask
- Scikit-learn
- Natural Language Processing
- HTML
- CSS
- JavaScript

## Project Structure

```text
College-AI-Helpdesk/
│
├── app.py
├── models/
│   ├── v1/
│   ├── v2/
│   └── v3/
│
├── templates/
├── static/
├── dataset/
└── README.md
