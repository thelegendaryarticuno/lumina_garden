import json
import os
from datetime import datetime

DATA_PATH = "data"

class TextDB:
    def __init__(self):
        self.users_path = os.path.join(DATA_PATH, "users")
        self.concepts_path = os.path.join(DATA_PATH, "concepts")
        self.progress_path = os.path.join(DATA_PATH, "progress")
        self._ensure_dirs()

    def _ensure_dirs(self):
        os.makedirs(self.users_path, exist_ok=True)
        os.makedirs(self.concepts_path, exist_ok=True)
        os.makedirs(self.progress_path, exist_ok=True)

    def save_user(self, user_id: str, data: dict):
        path = os.path.join(self.users_path, f"{user_id}.txt")
        with open(path, "w") as f:
            json.dump(data, f, indent=2)
        return path

    def get_user(self, user_id: str):
        path = os.path.join(self.users_path, f"{user_id}.txt")
        if not os.path.exists(path):
            return None
        with open(path, "r") as f:
            return json.load(f)

    def save_concepts(self, session_id: str, concepts: dict):
        path = os.path.join(self.concepts_path, f"{session_id}.txt")
        with open(path, "w") as f:
            json.dump(concepts, f, indent=2)

    def get_concepts(self, session_id: str):
        path = os.path.join(self.concepts_path, f"{session_id}.txt")
        if not os.path.exists(path):
            return None
        with open(path, "r") as f:
            return json.load(f)

    def update_progress(self, user_id: str, updates: dict):
        path = os.path.join(self.progress_path, f"{user_id}.txt")
        current = {}
        if os.path.exists(path):
            with open(path, "r") as f:
                current = json.load(f)
        
        # Merge updates
        current.update(updates)
        current["last_updated"] = datetime.now().isoformat()
        
        with open(path, "w") as f:
            json.dump(current, f, indent=2)
        return current
