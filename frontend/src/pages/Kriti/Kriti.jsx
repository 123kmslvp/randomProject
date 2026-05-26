import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function Kriti() {

    const colors = ["#C85555", "#EAA624", "#cbd560ff", "#AADCF2", "#F7BCB0"];
    const [selectedColor, setSelectedColor] = useState("");
    const navigate = useNavigate();

  return (
    <div>

        <header className="top-header">
                  <button className="whitefont blue-button color-blue" onClick={() => navigate("/")}> Home </button>
            
        </header>

        <section className="flex-white card-full">
            <h1>Hello! This is Kriti</h1>
        </section>

        <div className="flex-white card-small">
            <h2>Recent Color Palette</h2>

            <div className="color-palette">
                {colors.map((color) => (
                    <button
                        key={color}
                        className="color-dot"
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                    />
                ))}
            </div>

            {selectedColor && (
                <h2>Hex Code: {selectedColor}</h2>
            )}
        </div>

        <div className="flex-white card-small">
            Practice Registeration Page
        </div>

    </div>
    );

}