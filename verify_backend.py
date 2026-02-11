import requests
import json

BASE_URL = "http://localhost:8000"
USER_ID = "test_user_v1"

def print_step(step):
    print(f"\n=== {step} ===")

def test_api():
    # 1. Check Root
    print_step("Checking Root")
    try:
        r = requests.get(f"{BASE_URL}/")
        print(f"Root: {r.json()}")
        assert r.status_code == 200
    except Exception as e:
        print(f"Failed to connect: {e}")
        return

    # 2. Upload File
    print_step("Uploading File")
    files = {'file': ('test.txt', 'Biology content mock')}
    data = {'user_id': USER_ID}
    r = requests.post(f"{BASE_URL}/api/upload", files=files, data=data)
    print(f"Upload: {r.json()}")
    assert r.status_code == 200
    session_id = r.json().get("session_id")

    # 3. Get Initial Garden
    print_step("Getting Initial Garden")
    r = requests.get(f"{BASE_URL}/api/garden/{USER_ID}")
    garden = r.json()
    print(f"Garden Stats: {garden.get('stats')}")
    initial_mastery = garden.get('stats', {}).get('mastery_score', 0)

    # 4. Submit Quiz
    print_step("Submitting Quiz")
    quiz_result = {
        "user_id": USER_ID,
        "score": 85,
        "total": 100,
        "weak_topics": ["Mitosis"]
    }
    r = requests.post(f"{BASE_URL}/api/quiz/submit", json=quiz_result)
    print(f"Quiz Submit: {r.json()}")
    assert r.status_code == 200

    # 5. Verify Persistence (Get Garden Again)
    print_step("Verifying Persistence")
    r = requests.get(f"{BASE_URL}/api/garden/{USER_ID}")
    garden = r.json()
    stats = garden.get('stats', {})
    print(f"Updated Garden Stats: {stats}")
    
    if stats.get('mastery_score') == 85:
        print("SUCCESS: Persistence verified! Mastery score updated.")
    else:
        print(f"FAILURE: Mastery score not updated. Expected 85, got {stats.get('mastery_score')}")

if __name__ == "__main__":
    test_api()
