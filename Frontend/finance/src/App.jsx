import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UploadFile from "./components/UploadFile";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Upload
        </Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UploadFile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
