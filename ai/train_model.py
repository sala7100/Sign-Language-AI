import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# 1️⃣ اقرأ CSV
df = pd.read_csv("sign_data.csv", low_memory=False)

# تأكد إن عمود الليبل كله string
df["label"] = df["label"].astype(str)

# 2️⃣ فصل البيانات عن ال labels
X = df.drop("label", axis=1)
y = df["label"]

# 3️⃣ حول الحروف لأرقام
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# 4️⃣ قسم Train/Test
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# 5️⃣ درب موديل سريع (Random Forest)
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# 6️⃣ اختبر الموديل
y_pred = clf.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Accuracy: {acc*100:.2f}%")

# 7️⃣ احفظ الموديل + LabelEncoder باستخدام joblib
joblib.dump(clf, "asl_model.joblib")
joblib.dump(le, "label_encoder.joblib")
print("✅ Model & Label Encoder saved successfully!")