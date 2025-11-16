import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddSkill from "./pages/AddSkill";
import Home from "./pages/Home";
import AddGoal from "./pages/AddGoal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-goal" element={<AddGoal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
