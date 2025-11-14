import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddSkill from "./pages/AddSkill";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddSkill />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
