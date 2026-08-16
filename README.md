
College AI Helpdesk

An AI-powered student support chatbot built using Natural Language Processing and Machine Learning.

College AI Helpdesk is a web-based chatbot designed to assist students with common college-related queries. The project combines NLP-based intent classification with a Flask web application to provide relevant and automated responses.

The project also serves as an experimental platform for studying incremental model improvement through multiple model versions.

Project Highlights
NLP-based student query classification
Automated responses for common college queries
Multiple machine learning model versions
Flask-based web application
Custom training dataset
Separate model and vectorizer files
Version-based model improvement
Experimentation with targeted training data
Model Development

A major focus of this project is understanding how an existing model can be improved without unnecessarily rebuilding the entire system.

V1 — Baseline Model

The first version establishes the initial chatbot and provides the baseline performance for future experiments.

V2 — Incremental Improvement

The second version introduces additional training data targeting areas where the baseline model requires improvement.

V3 — Further Refinement

The third version continues the improvement process by focusing on weaker or confusing intents while attempting to preserve previously learned capabilities.

Experimental Goal

The V1 → V2 → V3 approach is being used to investigate:

Whether targeted data can improve weak intents
Whether previous knowledge can be preserved during improvement
The effect of incremental training on model performance
The possibility of catastrophic forgetting
Whether incremental development can reduce unnecessary retraining
System Architecture
User
  │
  ▼
Web Interface
  │
  ▼
Flask Application
  │
  ▼
Text Preprocessing
  │
  ▼
Vectorizer
  │
  ▼
ML Intent Classifier
  │
  ▼
Predicted Intent
  │
  ▼
Response
Technology Stack
Category	Technologies
Programming	Python
Machine Learning	Scikit-learn
NLP	Text preprocessing, intent classification
Backend	Flask
Frontend	HTML, CSS, JavaScript
Model Storage	Pickle
Development	VS Code, Git, GitHub
Project Structure
College-AI-Helpdesk/
│
├── app.py
│
├── models/
│   ├── v1/
│   │   ├── chatbot_v1_model.pkl
│   │   └── chatbot_v1_vectorizer.pkl
│   │
│   ├── v2/
│   │   ├── chatbot_v2_model.pkl
│   │   └── chatbot_v2_vectorizer.pkl
│   │
│   └── v3/
│       ├── chatbot_v3_model.pkl
│       └── chatbot_v3_vectorizer.pkl
│
├── dataset/
│
├── templates/
│   └── index.html
│
├── static/
│
├── requirements.txt
│
└── README.md
Installation

Clone the repository:

git clone https://github.com/priyanshukumarverma091-hub/College-AI-Helpdesk.git

Move into the project directory:

cd College-AI-Helpdesk

Install dependencies:

pip install -r requirements.txt
Run the Application

Start the Flask application:

python app.py

Then open:

http://127.0.0.1:5000
Current Development

The project is currently under active development.

The main focus is improving the chatbot's ability to correctly identify different student queries, especially intents that are difficult or easily confused with one another.

Model versions are being tested against similar queries to understand how performance changes after each training stage.

Future Work
Expand the training dataset
Improve difficult intents
Add multilingual support
Improve conversational responses
Create systematic V1/V2/V3 evaluation
Analyze catastrophic forgetting
Add more college-specific knowledge
Improve model reliability
Deploy the chatbot for real-world student use
Research Perspective

This project represents a practical exploration of efficient machine learning development.

Rather than assuming that every improvement requires complete retraining, the project investigates whether models can be developed progressively by identifying weaknesses and adding targeted data.

The long-term objective is to better understand the trade-offs between:

Incremental Training → Model Improvement → Knowledge Preservation → Training Efficiency

Author

Priyanshu Kumar Verma

Computer Science Engineering Student

Interests:

Artificial Intelligence
Machine Learning
Natural Language Processing
Computer Vision
AI Research
License

This project is intended for educational and research purposes.
