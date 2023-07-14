import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage.jsx";
import MintOptions from "./pages/mintOptions.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/option" element={<MintOptions />} />
      </Routes>
    </Router>
  );
}

export default App;
