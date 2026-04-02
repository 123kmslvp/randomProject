import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Kriti from "./Kriti";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kriti" element={<Kriti />} />
      </Routes>
    </BrowserRouter>
  );
}