import aiosqlite
import json
import os
import asyncio

DB_PATH = "data/lumina.db"

class Database:
    def __init__(self):
        self.db_path = DB_PATH
        self._ensure_db()

    def _ensure_db(self):
        os.makedirs("data", exist_ok=True)
        # We need async init, so schema creation is handled in methods or startup
        pass

    async def init_schema(self):
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    user_id TEXT PRIMARY KEY,
                    data TEXT
                )
            """)
            await db.execute("""
                CREATE TABLE IF NOT EXISTS sessions (
                    session_id TEXT PRIMARY KEY,
                    user_id TEXT,
                    transcript TEXT,
                    notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            await db.execute("""
                CREATE TABLE IF NOT EXISTS progress (
                    user_id TEXT PRIMARY KEY,
                    mastery_score INTEGER DEFAULT 0,
                    weak_topics TEXT,
                    quizzes_taken INTEGER DEFAULT 0,
                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            await db.commit()

    async def save_session(self, session_id: str, user_id: str, transcript: str, notes: dict):
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute(
                "INSERT OR REPLACE INTO sessions (session_id, user_id, transcript, notes) VALUES (?, ?, ?, ?)",
                (session_id, user_id, transcript, json.dumps(notes))
            )
            await db.commit()

    async def get_session(self, session_id: str):
        async with aiosqlite.connect(self.db_path) as db:
            async with db.execute("SELECT * FROM sessions WHERE session_id = ?", (session_id,)) as cursor:
                row = await cursor.fetchone()
                if row:
                    return {
                        "session_id": row[0],
                        "user_id": row[1],
                        "transcript": row[2],
                        "notes": json.loads(row[3]),
                        "created_at": row[4]
                    }
                return None

    async def update_progress(self, user_id: str, updates: dict):
        async with aiosqlite.connect(self.db_path) as db:
            # Check existing
            async with db.execute("SELECT mastery_score, weak_topics, quizzes_taken FROM progress WHERE user_id = ?", (user_id,)) as cursor:
                row = await cursor.fetchone()
                
            current_mastery = row[0] if row else 0
            current_weak = json.loads(row[1]) if row and row[1] else []
            current_quizzes = row[2] if row else 0

            # Merge updates
            new_mastery = updates.get("last_score", current_mastery) # Simple logic: score replaces mastery
            new_weak = updates.get("weak_topics", [])
            # Combine weak topics uniquely
            combined_weak = list(set(current_weak + new_weak))
            new_quizzes = current_quizzes + updates.get("quizzes_taken", 0)

            await db.execute("""
                INSERT OR REPLACE INTO progress (user_id, mastery_score, weak_topics, quizzes_taken, last_updated)
                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
            """, (user_id, new_mastery, json.dumps(combined_weak), new_quizzes))
            
            await db.commit()
            
            return {
                "mastery_score": new_mastery,
                "weak_topics": combined_weak,
                "quizzes_taken": new_quizzes
            }

    async def get_progress(self, user_id: str):
        async with aiosqlite.connect(self.db_path) as db:
            async with db.execute("SELECT mastery_score, weak_topics, quizzes_taken FROM progress WHERE user_id = ?", (user_id,)) as cursor:
                row = await cursor.fetchone()
                if row:
                    return {
                        "mastery_score": row[0],
                        "weak_topics": json.loads(row[1]) if row[1] else [],
                        "quizzes_taken": row[2]
                    }
                return {"mastery_score": 0, "weak_topics": [], "quizzes_taken": 0}
