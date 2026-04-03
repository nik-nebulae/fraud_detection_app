import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix

from xgboost import XGBClassifier


# 1. Load dataset
df = pd.read_csv("/Users/tech_nebulae/Desktop/fraud_detection_app/training/creditcard.csv")

# 2. Split features and target
X = df.drop("Class", axis=1)
y = df["Class"]

print("Dataset shape:", X.shape, y.shape)
print("Class distribution:\n", y.value_counts())


# 3. Train-test split (with stratification)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)


# 4. Scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)


# 5. Handle imbalance
scale_pos_weight = (y_train == 0).sum() / (y_train == 1).sum()
print("scale_pos_weight:", scale_pos_weight)


# 6. Train XGBoost model
xgb_model = XGBClassifier(
    n_estimators=200,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    scale_pos_weight=scale_pos_weight,
    random_state=42,
    n_jobs=-1,
    eval_metric="logloss"
)

xgb_model.fit(X_train, y_train)


# 7. Predictions
y_pred = xgb_model.predict(X_test)
y_prob = xgb_model.predict_proba(X_test)[:, 1]


# 8. Evaluation
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:\n")
print(confusion_matrix(y_test, y_pred))


# 9. Save model and scaler
joblib.dump(xgb_model, "fraud_model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("\n Model and scaler saved successfully!")