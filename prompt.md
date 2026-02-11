# SYSTEM BUILD PROMPT — Lumina Garden MVP

## ROLE

You are a senior full-stack AI engineer and UX architect.

Your task is to generate a **fully working MVP web application** called:

**“Lumina Garden — Multimodal Cognitive Study Coach.”**

The MVP must be:

* hackathon-ready
* UI-complete
* logically consistent
* runnable without external infrastructure
* using **TXT/JSON file storage instead of databases**

Focus on **clarity, stability, and demo impact**, not scale.

---

# 1. PRODUCT GOAL

Build a **multimodal AI study coach interface** that:

* accepts **video, PDF, and text notes**
* converts them into:

  * structured notes
  * concept graph
  * adaptive quiz
  * weak-topic analysis
* visualizes mastery using a **Living Knowledge Garden**

The system must demonstrate a **complete learning loop**:

**Ingest → Understand → Test → Detect Weakness → Revise → Grow Mastery**

Even if AI outputs are mocked,
the **workflow must feel real and intelligent**.

---

# 2. MVP SCOPE (STRICT)

Only implement what is required for a **convincing hackathon demo**.

### MUST INCLUDE

* Guest + Logged-in UI
* Upload → Processing → Notes → Quiz → Weak topics → Garden growth
* Concept graph visualization
* TXT-based persistence
* Clean dashboard
* Realistic AI-style outputs (mocked allowed)

### MUST NOT INCLUDE

* Real cloud deployment
* Heavy authentication systems
* External vector DB setup
* Complex backend scaling
* Non-essential features

Keep architecture **simple but believable**.

---

# 3. TECHNICAL ARCHITECTURE

## Frontend

Create a **modern responsive PWA-style web UI** using:

* React (preferred) OR simple component framework
* clean routing between pages
* reusable UI components
* smooth transitions and loading states

Design tone:

* calm academic feel
* soft gradients + glass cards
* rounded layouts
* subtle animations
* nature-inspired visuals for the garden

---

## Backend Logic (Lightweight)

Implement a **minimal local server layer** (Node or Python acceptable) that:

* handles file read/write
* simulates AI processing
* returns structured JSON responses to UI

No real databases.

---

## Storage System (MANDATORY)

All persistence must use:

**TXT files containing structured JSON.**

Directory structure:

```
/data
  /users
  /sessions
  /concepts
  /quizzes
  /progress
```

Each user/session stored as:

```
user_id.txt
session_id.txt
```

System must support:

* create
* read
* update
* list history

Pure file-based simulation of a database.

---

# 4. USER MODES

## Guest Mode

Allow limited demo usage:

* upload **max 3 study sources**
* generate:

  * transcript preview (mocked allowed)
  * structured notes
  * flashcards
  * adaptive quiz
  * weak-topic highlight
  * mini garden growth

After limit → show **upgrade/login prompt UI**.

---

## Logged-In Dashboard Mode

Provide full learning workspace:

### Dashboard must show

* studied topics list
* mastery progress
* weak concepts
* recent quizzes
* garden visualization

### Study Flow

User can:

1. Upload new source
2. View generated notes
3. See concept graph
4. Take adaptive quiz
5. Observe weak topics
6. Watch garden update

All saved to TXT storage.

---

# 5. MULTIMODAL PROCESSING FLOW (SIMULATED AI)

Create believable AI pipeline:

### Step 1 — Upload

Accept:

* YouTube link OR video file OR PDF OR text

### Step 2 — Processing Screen

Show:

* transcription animation
* “extracting concepts…”
* “building knowledge graph…”

Return **structured mock data** shaped like real AI output.

---

### Step 3 — Generated Outputs

UI must display:

#### Structured Notes

* hierarchical headings
* bullet summaries
* key definitions

#### Concept List

* main topics
* dependencies

#### Concept Graph View

* node-edge visualization
* clickable concepts

---

### Step 4 — Adaptive Quiz

Quiz must include:

* 5–10 questions
* mixed difficulty
* instant feedback
* score calculation

---

### Step 5 — Weak Topic Detection

After quiz:

* mark low-accuracy concepts
* highlight in:

  * report
  * concept graph
  * garden visualization

---

# 6. LIVING KNOWLEDGE GARDEN (HERO FEATURE)

Create an **interactive visual panel** where:

* each concept = plant/node
* mastery ↑ → plant grows greener
* weakness → plant fades/red
* completion → full bloom animation

Must be:

* emotionally engaging
* visually memorable
* demo-ready for judges

This is the **core differentiator**.

---

# 7. REQUIRED PAGES

Generate full UI for:

1. Landing page
2. Guest upload workspace
3. Login/Register screen (simple local auth)
4. Main dashboard
5. Notes viewer
6. Concept graph view
7. Quiz interface
8. Knowledge garden view
9. Progress report page

All connected via routing.

---

# 8. CODE QUALITY RULES

* clean folder structure
* readable components
* reusable styles
* no unused dependencies
* must run locally with **simple start command**

Output must be **demo-stable**.

---

# 9. FINAL EXPECTED RESULT

The generated system should allow a judge to:

1. Open the app
2. Upload a study source
3. Watch AI processing
4. Read notes
5. take quiz
6. see weak topics
7. view growing knowledge garden

All within **2–3 minutes**.

If this flow works smoothly,
the MVP is successful.

---

# 10. CORE VISION STATEMENT

Design everything around this principle:

> **Not just an AI tutor, but a cognitive learning system that makes understanding visible.**

---

This is now a **true system-level build prompt** —
clear enough for Antigravity to generate a **complete hackathon MVP**.


