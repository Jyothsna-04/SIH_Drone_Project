from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Store victims in memory
victims = {}

@app.route("/telemetry", methods=["POST"])
def add_victim():
    data = request.get_json()
    victim_id = data.get("victim_id")
    victims[victim_id] = data
    victims[victim_id]["assigned_drone"] = None
    return jsonify({"status": "success", "data_received": victims[victim_id]})

@app.route("/victims", methods=["GET"])
def get_victims():
    return jsonify(list(victims.values()))

@app.route("/assign_drone", methods=["POST"])
def assign_drone():
    data = request.get_json()
    victim_id = data.get("victim_id")
    drone_name = data.get("drone_name", "Drone 1")
    if victim_id in victims:
        victims[victim_id]["assigned_drone"] = drone_name
        return jsonify({"status": "success", "victim": victims[victim_id]})
    return jsonify({"status": "fail", "message": "Victim not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
