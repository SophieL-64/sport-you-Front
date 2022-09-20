import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./screens/Home";
import Section from "./screens/Section";
import ShoppingCart from "./screens/ShoppingCart";
import Form from "./screens/Form";
import Faq from "./screens/Faq";
import Opinions from "./screens/Opinions";
import AdminHome from "./admin/screens/AdminHome";
import AdminDashboard from "./admin/screens/AdminDashboard";
import AdminClothes from "./admin/screens/AdminClothes";
import AdminClothesAll from "./admin/components/AdminClothesAll";
import AdminClothesAdd from "./admin/components/AdminClothesAdd";
import AdminClothesEdit from "./admin/components/AdminClothesEdit";
import AdminFeedbacks from "./admin/screens/AdminFeedbacks";
import "./App.css";

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
    <>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                totalItems={totalItems}
                setTotalItems={setTotalItems}
                getNumberProduct={getNumberProduct}
                opinions={opinions}
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
                opinions={opinions}
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
                opinions={opinions}
              />
            }
          />
          <Route
            path="/faq"
            element={
              <Faq
                totalItems={totalItems}
                setTotalItems={setTotalItems}
                getNumberProduct={getNumberProduct}
                opinions={opinions}
              />
            }
          />
          <Route
            path="/form"
            element={
              <Form
                totalItems={totalItems}
                setTotalItems={setTotalItems}
                getNumberProduct={getNumberProduct}
                opinions={opinions}
              />
            }
          />
          <Route
            path="/opinions"
            element={
              <Opinions
                totalItems={totalItems}
                setTotalItems={setTotalItems}
                getNumberProduct={getNumberProduct}
              />
            }
          />
          {/* ROUTES ADMIN */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/clothes" element={<AdminClothes />} />
          <Route path="/admin/clothesAll" element={<AdminClothesAll />} />
          <Route path="/admin/clothesAdd" element={<AdminClothesAdd />} />
          <Route path="/admin/clothesEdit/:id" element={<AdminClothesEdit />} />
          <Route path="/admin/feedbacks" element={<AdminFeedbacks />} />
        </Routes>
      </div>
      <div></div>
    </>
  );
}

export default App;
