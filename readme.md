# Lumina Garden

Lumina Garden is a multimodal study coach MVP that turns uploaded learning material into a guided learning loop:

Ingest -> Understand -> Test -> Detect weak topics -> Visualize mastery growth.

The core idea is to make learning progress feel alive. Instead of only showing scores, Lumina Garden uses a Living Knowledge Garden where concepts appear as growing or fading plants based on mastery.

## Idea and Product Perspective

Most learning tools stop at content delivery or quiz scoring. Lumina Garden is designed around cognitive reinforcement:

- Learning sources become structured notes.
- Notes become concepts and relationships.
- Concepts become quiz checkpoints.
- Quiz performance drives weak-topic detection.
- Weak and strong concepts are visualized in a memorable garden metaphor.

This creates a feedback cycle that is useful for students and compelling for demo audiences:

1. Upload study material.
2. Watch processing states that simulate intelligent analysis.
3. Read generated notes.
4. Take adaptive checks.
5. Observe mastery and weak areas.
6. See knowledge represented visually as growth.

## What Is Implemented in This Repository

This repository contains a functional full-stack MVP with:

- React + Vite frontend with animated multi-page flow.
- FastAPI backend with upload and quiz endpoints.
- Mock AI pipeline for transcript, notes, quiz, and garden state.
- Persistent user progress and sessions in SQLite.
- Optional TXT-based storage utility (present in codebase as an alternative helper).

## User Journey (Current Flow)

1. Landing page starts a session.
2. Guest upload accepts a file and calls backend upload API.
3. Processing page shows staged analysis animation.
4. Notes page shows generated notes (from session storage if available).
5. Quiz page runs a checkpoint quiz.
6. Garden page visualizes concept graph and optional 3D garden-like view.
7. Dashboard reads mastery and weak-topic stats from backend.

## Architecture Overview

### Frontend

- React 19 with Vite
- React Router for page navigation
- Framer Motion for transitions and progress animations
- React Flow for concept graph visualization
- Tailwind CSS v4 for styling (with custom nature palette)

Key frontend areas:

- Pages: landing, upload, processing, dashboard, notes, quiz, garden
- Session context gate for protected routes
- API service wrapper for backend integration

### Backend

- FastAPI service
- CORS enabled for local frontend development
- Upload endpoint saves file temporarily, runs mock processing, persists session
- Quiz submission updates progress and weak-topic data
- Garden endpoint returns visualization payload plus persisted stats

### Data and Persistence

Current active persistence:

- SQLite database in data/lumina.db
- Tables: users, sessions, progress

Also included:

- TXT/JSON storage helper in backend/storage/txt_db.py

## API Endpoints

Base URL: http://localhost:8000

- GET / -> health/status
- POST /api/upload -> upload source and generate transcript + notes
- GET /api/garden/{user_id} -> get garden payload and user progress stats
- GET /api/quiz/{topic} -> get quiz questions
- POST /api/quiz/submit -> submit quiz results and update mastery

## Project Structure

```
lumina_garden/
	backend/
		app.py
		mock_ai.py
		storage/
			db.py
			txt_db.py
	frontend/
		src/
			components/
			context/
			pages/
			services/
	data/
		lumina.db
	verify_backend.py
```

## Local Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

### 1) Run backend

From project root:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### 2) Run frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL:

- http://localhost:5173

## Quick Verification

With backend running, execute:

```bash
python verify_backend.py
```

This script validates:

- API connectivity
- File upload pipeline
- Garden stats retrieval
- Quiz submission persistence

## Design Direction

The UI uses a calm, nature-inspired academic style:

- Green-centric mastery palette
- Glass-card panels and rounded surfaces
- Motion-driven transitions for processing and quiz flow
- Dual garden views (graph and stylized 3D scene)

## Current MVP Notes

This is intentionally a demo-focused implementation. A few areas are scaffolded or mocked for speed:

- AI outputs are simulated in backend/mock_ai.py.
- Notes and quiz currently use mock-first behavior in parts of the frontend.
- TXT-based persistence utility exists but SQLite is currently wired as primary storage.
- Authentication is session-gated in frontend context, not full auth.

## Suggested Next Enhancements

1. Connect quiz and notes pages fully to dynamic backend session data.
2. Use TXT/JSON persistence end-to-end if strict file-only mode is required.
3. Add concept extraction from uploaded content into live graph nodes/edges.
4. Add weak-topic remediation recommendations and spaced repetition scheduling.
5. Add user accounts and long-term progress history.

## Why This Project Is Demo-Strong

Lumina Garden combines pedagogy + visualization + interaction in one coherent loop. Even with mocked AI internals, the UX demonstrates a believable intelligent tutor that judges can understand quickly and remember after the demo.
