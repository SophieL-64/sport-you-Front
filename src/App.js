import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import Section from "./screens/Section";
import ShoppingCart from "./screens/ShoppingCart";
import Form from "./screens/Form";
import Faq from "./screens/Faq";
import Opinions from "./screens/Opinions";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [totalItems, setTotalItems] = useState(0);
  const [opinions, setOpinions] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/formInputs/opinions").then((res) => {
      console.log(res.data) || setOpinions(res.data);
    });
  }, []);

  function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
      return [];
    } else {
      return JSON.parse(basket);
    }
  }

  function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
      setTotalItems((number += product.quantity));
    }
  }

  return (
    <div className="app">
      <Navbar
        totalItems={totalItems}
        setTotalItems={setTotalItems}
        getNumberProduct={getNumberProduct}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              totalItems={totalItems}
              setTotalItems={setTotalItems}
              getNumberProduct={getNumberProduct}
            />
          }
        />
        <Route
          path="/section/:id"
          element={
            <Section
              totalItems={totalItems}
              setTotalItems={setTotalItems}
              getNumberProduct={getNumberProduct}
            />
          }
        />
        <Route
          path="/shopping-cart"
          element={
            <ShoppingCart
              totalItems={totalItems}
              setTotalItems={setTotalItems}
              getNumberProduct={getNumberProduct}
            />
          }
        />
        <Route path="/faq" element={<Faq />} />
        <Route path="/form" element={<Form />} />
        <Route path="/opinions" element={<Opinions />} />
      </Routes>
      <Footer opinions={opinions} />
    </div>
  );
}

export default App;
