from flask import Flask, render_template, request, jsonify
import joblib
import os

# ============================================================
# COLLEGE AI HELPDESK
# V1 / V2 / V3 MODEL LOADER
# ============================================================

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")


# ============================================================
# MODEL LOADING
# ============================================================

def load_model(version):
    folder = os.path.join(MODELS_DIR, version)

    model_path = os.path.join(
        folder, f"chatbot_{version}_model.pkl"
    )

    vectorizer_path = os.path.join(
        folder, f"chatbot_{version}_vectorizer.pkl"
    )

    encoder_path = os.path.join(
        folder, f"chatbot_{version}_label_encoder.pkl"
    )

    print("\n" + "=" * 60)
    print(f"Loading {version.upper()}")
    print("=" * 60)

    print("Model    :", model_path)
    print("Vectorizer:", vectorizer_path)
    print("Encoder  :", encoder_path)

    # Check files
    if not os.path.exists(model_path):
        print("❌ Model not found")
        return None

    if not os.path.exists(vectorizer_path):
        print("❌ Vectorizer not found")
        return None

    if not os.path.exists(encoder_path):
        print("❌ Label encoder not found")
        return None

    try:
        model = joblib.load(model_path)
        vectorizer = joblib.load(vectorizer_path)
        encoder = joblib.load(encoder_path)

        print("✅ Model loaded")
        print("✅ Vectorizer loaded")
        print("✅ Encoder loaded")

        print("Classes:")
        print(encoder.classes_)

        return {
            "model": model,
            "vectorizer": vectorizer,
            "encoder": encoder
        }

    except Exception as e:
        print("❌ Loading error:", e)
        return None


# ============================================================
# LOAD ALL MODELS
# ============================================================

models = {}

models["v1"] = load_model("v1")
models["v2"] = load_model("v2")
models["v3"] = load_model("v3")


# ============================================================
# PREDICTION FUNCTION
# ============================================================

def predict(version, text):

    data = models.get(version)

    if data is None:
        return {
            "success": False,
            "error": f"{version.upper()} model is not available"
        }

    model = data["model"]
    vectorizer = data["vectorizer"]
    encoder = data["encoder"]

    try:
        # Convert text into features
        X = vectorizer.transform([text])

        # Model prediction
        predicted_class = model.predict(X)[0]

        # Convert numeric class -> intent name
        intent = encoder.inverse_transform(
            [predicted_class]
        )[0]

        # Confidence
        confidence = None

        if hasattr(model, "predict_proba"):
            probabilities = model.predict_proba(X)[0]
            confidence = float(max(probabilities))

        return {
            "success": True,
            "intent": str(intent),
            "class": int(predicted_class),
            "confidence": confidence
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


# ============================================================
# RESPONSE DATABASE
# ============================================================

RESPONSES = {

    "goodbye": [
        "Goodbye! 👋 Have a great day!",
        "Bye! 👋 Take care!",
        "See you later! 😊"
    ],

    "greeting": [
        "Hello! 👋 How can I help you?",
        "Hi! 😊 What can I help you with?"
    ],

    "thanks": [
        "You're welcome! 😊",
        "Anytime! 👍"
    ],

    "thank_you": [
        "You're welcome! 😊",
        "Happy to help! 👍"
    ]
}


# ============================================================
# GET RESPONSE
# ============================================================

def get_response(intent):

    if intent in RESPONSES:
        return RESPONSES[intent][0]

    return f"I understood your question as **{intent}**."


# ============================================================
# HOME PAGE
# ============================================================

@app.route("/")
def home():
    return render_template("index.html")


# ============================================================
# CHAT API
# ============================================================

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "error": "No JSON data received"
        })

    message = data.get("message", "").strip()

    if not message:
        return jsonify({
            "success": False,
            "error": "Message is empty"
        })

    # Default version
    version = data.get("version", "v1").lower()

    if version not in ["v1", "v2", "v3"]:
        version = "v1"

    # Predict
    result = predict(version, message)

    if not result["success"]:
        return jsonify(result)

    intent = result["intent"]

    response = get_response(intent)

    return jsonify({
        "success": True,
        "version": version,
        "message": message,
        "intent": intent,
        "class": result["class"],
        "confidence": result["confidence"],
        "response": response
    })


# ============================================================
# DIRECT TERMINAL TEST
# ============================================================

def terminal_test():

    print("\n")
    print("=" * 60)
    print("MODEL TEST")
    print("=" * 60)

    test_questions = [
        "bye",
        "goodbye",
        "good bye",
        "see you",
        "hello",
        "hi",
        "thank you"
    ]

    for version in ["v1", "v2", "v3"]:

        print("\n" + "-" * 60)
        print(version.upper())
        print("-" * 60)

        for question in test_questions:

            result = predict(version, question)

            if result["success"]:

                print(
                    f"{question:20} -> "
                    f"{result['intent']:20} "
                    f"class={result['class']} "
                    f"confidence={result['confidence']}"
                )

            else:

                print(
                    f"{question:20} -> ERROR: "
                    f"{result['error']}"
                )


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":

    terminal_test()

    print("\n")
    print("=" * 60)
    print("COLLEGE AI HELPDESK")
    print("=" * 60)
    print("Server starting...")
    print("Open: http://127.0.0.1:5000")
    print("=" * 60)

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )