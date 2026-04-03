import { useNavigate } from "react-router-dom";
import "./App.css";
import Map from "./Map";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 align="left">Cafe Finder</h1>
      <h2 align="left">Find the best cafes in your area</h2>
      <br />
      <button className="whitefont blue-button"
      onClick={() => navigate("/kriti")}>
        Kriti
      </button>

      <br />

      <div className="map-container">
        <Map />
      </div>
      
    </div>
  );
}