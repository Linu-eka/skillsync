import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddGoal from "./pages/AddGoal";
import GoalDetails from "./pages/GoalDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-goal" element={<AddGoal />} />
        <Route path="/goal/:id" element={<GoalDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
