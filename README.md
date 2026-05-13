# Hitayu AI Assistant
A full-stack disease prediction application leveraging Machine Learning
(Random Forest) for real-time health insights.
## Project Architecture
- **Frontend**: React.js with TypeScript and CSS3.
- **Backend**: FastAPI (Python) serving a Scikit-Learn model.

- **Machine Learning**: Random Forest Classifier trained on symptom-
disease datasets.

## Project Structure
- `/frontend`: React application files.
- `/backend`: FastAPI server, ML models (.pkl), and training notebook
(.ipynb).
## Setup Instructions
### Backend
1. Navigate to `/backend`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run server: `uvicorn main:app --reload`.
### Frontend
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Start app: `npm start`.
