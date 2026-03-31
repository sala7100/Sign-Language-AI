# Sign Language AI Project

A complete project for **Sign Language Recognition** using AI, with a full **backend** and **frontend** setup.

---

## Project Structure

- **AI Folder**  
  - `ai_service.py` → Core AI model service  
  - `train_model.py` → Training script  
  - `collect_data.py` → Script for collecting dataset  
  - `.gitignore` → Excludes large datasets and model files

- **Backend Folder**  
  - Express server setup  
  - Routes for authentication, users, AI predictions  
  - Middlewares for authentication, file upload, validation  
  - `uploads/` → Temporary uploads storage (ignored in Git)

- **Frontend Folder**  
  - React + TypeScript project  
  - Components for login, practice mode, camera recognition, progress dashboard  
  - UI components organized under `components/ui`

---

## Features

- Real-time Sign Language recognition using AI models  
- User authentication and management (login/register)  
- Practice mode for learning sign language  
- Progress tracking dashboard  
- Responsive and modern UI

---

## Requirements

### Backend
- Node.js (v16+)  
- npm packages as listed in `backend/package.json`  
- Environment variables: `.env` file (ignored in Git)

### AI
- Python 3.8+  
- Packages listed in `ai/requirements.txt`  
- Dataset (excluded from Git due to size)

### Frontend
- React + TypeScript  
- Packages listed in `frontend/package.json`  

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/sala7100/Sign-Language-AI.git
cd Sign-Language-AI
