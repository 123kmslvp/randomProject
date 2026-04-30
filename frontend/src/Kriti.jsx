import { useState } from "react";

export default function Kriti() {

    const colors = ["#C85555", "#EAA624", "#cbd560ff", "#AADCF2", "#F7BCB0"];
    const [selectedColor, setSelectedColor] = useState("");

  return (
  <div>  
    <h1 className="white-outline">Hello! This is Kriti</h1>

    <div className="flex-white" >
        <h2>Recent Color Palette</h2>

        <div className="color-palette">
            {colors.map((color, index) => (
                <button 
                key = {color}
                className="color-dot" 
                style={{backgroundColor: color} }
                onClick={() => setSelectedColor(color)}
                ></button>
            ))}
        </div>

    {selectedColor && (
        <h2> Hex Code: {selectedColor}</h2>
    )}
    </div>  



    </div> );


}