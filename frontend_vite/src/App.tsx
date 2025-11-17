import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddGoal from "./pages/AddGoal";
import GoalDetails from "./pages/GoalDetails";
import EntriesView from "./pages/EntriesView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-goal" element={<AddGoal />} />
        <Route path="/goal/:id" element={<GoalDetails />} />
        <Route path="/step/:id/entries" element={<EntriesView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
