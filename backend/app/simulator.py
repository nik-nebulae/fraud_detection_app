import pandas as pd
import numpy as np
import time
import threading
import os

from .model_loader import predict
from .crud import insert_transaction


# Load dataset once
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "creditcard.csv")

df = pd.read_csv(DATA_PATH)
FEATURE_COLUMNS = df.drop("Class", axis=1).columns

# Control flag
running = False


def augment_transaction(row):
    """
    Slightly modify amount and time to simulate new data
    """
    row = row.copy()

    # Modify amount ±10%
    row["Amount"] = row["Amount"] * np.random.uniform(0.9, 1.1)

    # Modify time slightly
    row["Time"] = row["Time"] + np.random.uniform(-1000, 1000)

    return row


def simulation_loop():
    global running

    while running:
        
        if np.random.rand() < 0.2:
            # 20% chance → pick fraud sample
            row = df[df["Class"] == 1].sample(n=1).iloc[0]
        else:
            row = df[df["Class"] == 0].sample(n=1).iloc[0]

        # Apply augmentation
        row = augment_transaction(row)

        # Prepare input (drop Class)
        features = row.drop("Class").values

        # Predict
        prob = predict(features, FEATURE_COLUMNS)
        prob = float(prob)

        prob = float(prob)

        # add slight noise
        prob = prob + np.random.uniform(-0.05, 0.05)
        prob = max(0, min(1, prob))

        # Decision
        decision = "Fraud" if prob > 0.7 else "Safe"

        # Store in DB
        insert_transaction(
            time=row["Time"],
            amount=row["Amount"],
            fraud_probability=prob,
            decision=decision
        )

        print(f"Transaction processed | Risk: {prob:.2f} | {decision}")

        time.sleep(2)  # slow simulation


def start_simulation():
    global running

    if not running:
        running = True
        thread = threading.Thread(target=simulation_loop)
        thread.start()
        return "Simulation started"
    
    return "Already running"


def stop_simulation():
    global running
    running = False
    return "Simulation stopped"

if __name__ == "__main__":
    print(start_simulation())
    time.sleep(10)
    print(stop_simulation())