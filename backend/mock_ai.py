import random
import time

class MockAI:
    def __init__(self):
        self.concepts = [
            {"id": "photosynthesis", "label": "Photosynthesis", "mastery": 0.8},
            {"id": "cellular_respiration", "label": "Cellular Respiration", "mastery": 0.4},
            {"id": "mitosis", "label": "Mitosis", "mastery": 0.6},
            {"id": "dna_replication", "label": "DNA Replication", "mastery": 0.1},
            {"id": "protein_synthesis", "label": "Protein Synthesis", "mastery": 0.3}
        ]
        self.edges = [
            {"source": "photosynthesis", "target": "cellular_respiration"},
            {"source": "mitosis", "target": "dna_replication"},
            {"source": "dna_replication", "target": "protein_synthesis"}
        ]

    def transcribe(self, file_path: str):
        # Simulate processing time
        time.sleep(2)
        return "This is a simulated transcript from the uploaded file about biology fundamentals."

    def extract_notes(self, text: str):
        return {
            "title": "Introduction to Biology",
            "summary": "This document covers fundamental biological processes including energy production and cell division.",
            "topics": [
                {
                    "name": "Energy Cycle",
                    "details": "Focuses on photosynthesis and cellular respiration as complementary processes."
                },
                {
                    "name": "Cellular Reproduction",
                    "details": "Explains mitosis and meiosis, highlighting DNA replication phases."
                }
            ]
        }

    def generate_quiz(self, topic: str):
        return {
            "questions": [
                {
                    "id": 1,
                    "question": "What is the powerhouse of the cell?",
                    "options": ["Mitochondria", "Nucleus", "Ribosome", "Golgi Apparatus"],
                    "correct": "Mitochondria"
                },
                {
                    "id": 2,
                    "question": "Which process converts light energy into chemical energy?",
                    "options": ["Respiration", "Photosynthesis", "Fermentation", "Transpiration"],
                    "correct": "Photosynthesis"
                },
                {
                    "id": 3,
                    "question": "DNA replication occurs in which phase?",
                    "options": ["Prophase", "Metaphase", "S Phase", "G1 Phase"],
                    "correct": "S Phase"
                }

            ]
        }

    def get_garden_state(self):
        # Return state for the "Knowledge Garden"
        # Include current growth visual metrics
        return {
            "plants": [
                {"id": "p1", "type": "sunflower", "stage": 3, "health": "good", "concept": "photosynthesis"},
                {"id": "p2", "type": "fern", "stage": 1, "health": "needs_water", "concept": "dna_replication"},
                {"id": "p3", "type": "rose", "stage": 2, "health": "good", "concept": "mitosis"}
            ]
        }
