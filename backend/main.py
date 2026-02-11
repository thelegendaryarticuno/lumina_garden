from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import os
import uuid
import json
from .mock_ai import MockAI
from .storage.db import Database

app = FastAPI(title="Lumina Garden API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mock_ai = MockAI()
db = Database()

@app.on_event("startup")
async def startup_event():
    await db.init_schema()

class User(BaseModel):
    username: str

class QuizResult(BaseModel):
    user_id: str
    score: int
    total: int
    weak_topics: list[str]

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Lumina Garden API is running (SQLite)"}

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...), user_id: str = Form(...)):
    session_id = str(uuid.uuid4())
    # Save file temporarily (mock processing)
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Mock AI Processing
    transcript = mock_ai.transcribe(temp_path)
    notes = mock_ai.extract_notes(transcript)
    
    # Save to storage
    await db.save_session(session_id, user_id, transcript, notes)
    
    # Clean up
    if os.path.exists(temp_path):
        os.remove(temp_path)
    
    return {
        "session_id": session_id,
        "transcript": transcript,
        "notes": notes,
        "status": "processed"
    }

@app.get("/api/garden/{user_id}")
async def get_garden(user_id: str):
    # Retrieve user progress
    progress = await db.get_progress(user_id)
    
    # Mock the garden response based on progress
    garden_state = mock_ai.get_garden_state()
    # Inject real stats
    garden_state["stats"] = progress
    
    return garden_state

@app.get("/api/quiz/{topic}")
def get_quiz(topic: str):
    return mock_ai.generate_quiz(topic)

@app.post("/api/quiz/submit")
async def submit_quiz(result: QuizResult):
    # Update user progress with quiz results
    new_progress = await db.update_progress(result.user_id, {
        "quizzes_taken": 1,
        "last_score": result.score, # In mock this is simple score
        "weak_topics": result.weak_topics
    })
    return {"status": "success", "new_mastery": new_progress["mastery_score"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
