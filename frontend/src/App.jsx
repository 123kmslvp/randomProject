import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const getMessage = async () => {
    const res = await fetch("http://localhost:3000/api");
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>My Website</h1>
      <button onClick={getMessage}>Get Message</button>
      <p>{message}</p>
    </div>
  );
}

export default App;