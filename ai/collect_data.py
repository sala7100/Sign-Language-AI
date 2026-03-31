import cv2
import mediapipe as mp
import os
import csv

mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils

dataset_path = "dataset"  # فولدر الصور
csv_path = "sign_data.csv" 

# انشئ CSV مع Header
with open(csv_path, "w", newline="") as f:
    writer = csv.writer(f)
    header = [f"x{i}" for i in range(1, 22)] + \
             [f"y{i}" for i in range(1, 22)] + \
             [f"z{i}" for i in range(1, 22)] + ["label"]
    writer.writerow(header)

# ابدأ معالجة الصور
with mp_hands.Hands(
    static_image_mode=True,
    max_num_hands=1,
    min_detection_confidence=0.7
) as hands:

    for label in os.listdir(dataset_path):
        label_path = os.path.join(dataset_path, label)
        if not os.path.isdir(label_path):
            continue

        for img_file in os.listdir(label_path):
            img_path = os.path.join(label_path, img_file)
            image = cv2.imread(img_path)
            if image is None:
                continue

            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            result = hands.process(image_rgb)

            if result.multi_hand_landmarks:
                hand_landmarks = result.multi_hand_landmarks[0]
                row = []
                for lm in hand_landmarks.landmark:
                    row.extend([lm.x, lm.y, lm.z])
                row.append(label)

                # احفظ في CSV
                with open(csv_path, "a", newline="") as f:
                    writer = csv.writer(f)
                    writer.writerow(row)
            else:
                print(f"No hand detected in {img_path}")
