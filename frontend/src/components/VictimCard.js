function VictimCard({ victim, assignDrone }) {
  const colors = { High: "red", Medium: "orange", Low: "green" };

  return (
    <div style={{
      border: `2px solid ${colors[victim.severity]}`,
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px"
    }}>
      <h3>{victim.victim_id}</h3>
      <p><b>Severity:</b> <span style={{ color: colors[victim.severity] }}>{victim.severity}</span></p>
      <p><b>Needs:</b> {victim.needs.join(", ")}</p>
      <p><b>Location:</b> Lat {victim.gps.lat}, Lon {victim.gps.lon}</p>
      <p><b>Assigned Drone:</b> {victim.assigned_drone || "None"}</p>
      <button onClick={() => assignDrone(victim.victim_id)}>Assign Drone</button>
    </div>
  );
}

export default VictimCard;
