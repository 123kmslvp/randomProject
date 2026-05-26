import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Kriti from "./pages/Kriti/Kriti";

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