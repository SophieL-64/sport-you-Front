import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import Section from "./screens/Section";
import ShoppingCart from "./screens/ShoppingCart";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/section/:id" element={<Section />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </div>
  );
}

export default App;
