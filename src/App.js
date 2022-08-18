import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import Section from "./screens/Section";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/section/:id" element={<Section />} />
      </Routes>
    </>
  );
}

export default App;
