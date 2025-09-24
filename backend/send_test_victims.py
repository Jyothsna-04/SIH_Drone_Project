import requests

url = "http://127.0.0.1:5000/telemetry"

victims = [
    {"victim_id": "A1", "gps": {"lat": 12.971, "lon": 77.594}, "severity": "High", "needs": ["food","water"], "battery": 80},
    {"victim_id": "A2", "gps": {"lat": 12.972, "lon": 77.598}, "severity": "Medium", "needs": ["medicine"], "battery": 75},
    {"victim_id": "B1", "gps": {"lat": 12.973, "lon": 77.602}, "severity": "Low", "needs": ["shelter"], "battery": 70},
    {"victim_id": "B2", "gps": {"lat": 12.974, "lon": 77.606}, "severity": "High", "needs": ["food","medicine"], "battery": 85},
    {"victim_id": "C1", "gps": {"lat": 12.975, "lon": 77.610}, "severity": "Medium", "needs": ["water"], "battery": 78},
]

for v in victims:
    res = requests.post(url, json=v)
    print(f"Sent {v['victim_id']}: {res.json()}")
