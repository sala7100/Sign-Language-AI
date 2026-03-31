from fastapi import FastAPI, File, UploadFile
import numpy as np
import cv2
import joblib
import mediapipe as mp
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load("asl_model.joblib")
label_encoder = joblib.load("label_encoder.joblib")

mp_hands = mp.solutions.hands

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is None:
        return {"error": "Invalid image"}

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    with mp_hands.Hands(static_image_mode=True) as hands:
        result = hands.process(img_rgb)

        if not result.multi_hand_landmarks:
            return {"prediction": "No hand detected"}

        hand_landmarks = result.multi_hand_landmarks[0]

        data = []
        for lm in hand_landmarks.landmark:
            data.extend([lm.x, lm.y, lm.z])

        prediction = model.predict([data])
        label = label_encoder.inverse_transform(prediction)[0]

        return {"prediction": label}