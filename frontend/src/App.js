import React, { useEffect, useState } from "react";
import MapView from "./components/MapView";
import VictimCard from "./components/VictimCard";
import axios from "axios";

function App() {
  const [victims, setVictims] = useState([]);

  const fetchVictims = async () => {
    const res = await axios.get("http://127.0.0.1:5000/victims");
    setVictims(res.data);
  };

  useEffect(() => {
    fetchVictims();
    const interval = setInterval(fetchVictims, 3000); // refresh every 3s
    return () => clearInterval(interval);
  }, []);

  const assignDrone = async (victim_id) => {
    await axios.post("http://127.0.0.1:5000/assign_drone", {
      victim_id,
      drone_name: "Drone 1"
    });
    fetchVictims();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>SIH Drone Disaster Response System</h1>
      <MapView victims={victims} />
      <div>
        {victims.map((v) => (
          <VictimCard key={v.victim_id} victim={v} assignDrone={assignDrone} />
        ))}
      </div>
    </div>
  );
}

export default App;
