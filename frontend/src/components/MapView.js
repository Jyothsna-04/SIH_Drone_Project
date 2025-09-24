import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

// Marker icons based on severity or assigned
const getMarkerIcon = (victim) => {
  if (victim.assigned_drone) {
    return new L.Icon({
      ...L.Icon.Default.prototype.options,
      className: "marker-assigned"
    });
  }

  switch (victim.severity) {
    case "High":
      return new L.Icon({ ...L.Icon.Default.prototype.options, className: "marker-red" });
    case "Medium":
      return new L.Icon({ ...L.Icon.Default.prototype.options, className: "marker-orange" });
    case "Low":
      return new L.Icon({ ...L.Icon.Default.prototype.options, className: "marker-green" });
    default:
      return new L.Icon(L.Icon.Default.prototype.options);
  }
};

function MapView({ victims }) {
  const center = [12.9716, 77.5946];

  return (
    <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%", margin: "20px 0" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {victims.map((v) => (
        <Marker key={v.victim_id} position={[v.gps.lat, v.gps.lon]} icon={getMarkerIcon(v)}>
          <Popup>
            <b>{v.victim_id}</b> <br />
            Severity: {v.severity} <br />
            Needs: {v.needs.join(", ")} <br />
            Location: Lat {v.gps.lat}, Lon {v.gps.lon} <br />
            Assigned Drone: {v.assigned_drone || "None"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
