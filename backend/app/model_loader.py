import joblib
import os
import pandas as pd

# Get current directory
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "model", "fraud_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "model", "scaler.pkl")

# Load once (important)
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)


def predict(transaction_array, columns):
    df = pd.DataFrame([transaction_array], columns=columns)
    scaled = scaler.transform(df)
    prob = model.predict_proba(scaled)[0][1]
    return prob
