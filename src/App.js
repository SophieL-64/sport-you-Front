import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import Section from "./screens/Section";
import ShoppingCart from "./screens/ShoppingCart";
import Form from "./screens/Form";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [totalItems, setTotalItems] = useState(0);

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
        <Route path="/form" element={<Form />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
