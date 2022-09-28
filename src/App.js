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
import AdminSizes from "./admin/screens/AdminSizes";
import AdminSizesAll from "./admin/components/AdminSizesAll";
import AdminSizesAdd from "./admin/components/AdminSizesAdd";
import AdminColors from "./admin/screens/AdminColors";
import AdminColorsAll from "./admin/components/AdminColorsAll";
// import AdminColorsAdd from "./admin/components/AdminColorsAdd";
// import AdminColorsEdit from "./admin/components/AdminColorsEdit";
import AdminBrands from "./admin/screens/AdminBrands";
import AdminBrandsAll from "./admin/components/AdminBrandsAll";
// import AdminBrandsAdd from "./admin/components/AdminBrandsAdd";
// import AdminBrandsEdit from "./admin/components/AdminBrandsEdit";
import AdminSections from "./admin/screens/AdminSections";
import AdminSectionsAll from "./admin/components/AdminSectionsAll";
import AdminSectionsAdd from "./admin/components/AdminSectionsAdd";
// import AdminSectionsEdit from "./admin/components/AdminSectionsEdit";
import AdminTargets from "./admin/screens/AdminTargets";
import AdminTargetsAll from "./admin/components/AdminTargetsAll";
import AdminTargetsAdd from "./admin/components/AdminTargetsAdd";
// import AdminTargetsEdit from "./admin/components/AdminTargetsEdit";
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
          <Route path="/admin/sizes" element={<AdminSizes />} />
          <Route path="/admin/sizesAll" element={<AdminSizesAll />} />
          <Route path="/admin/sizesAdd" element={<AdminSizesAdd />} />
          {/* <Route path="/admin/sizesEdit/:id" element={<AdminSizesEdit />} /> */}
          <Route path="/admin/colors" element={<AdminColors />} />
          <Route path="/admin/colorsAll" element={<AdminColorsAll />} />
          {/* <Route path="/admin/colorsAdd" element={<AdminColorsAdd />} />
          <Route path="/admin/colorsEdit/:id" element={<AdminColorsEdit />} /> */}
          <Route path="/admin/brands" element={<AdminBrands />} />
          <Route path="/admin/brandsAll" element={<AdminBrandsAll />} />
          {/* <Route path="/admin/brandsAdd" element={<AdminBrandsAdd />} />
          <Route path="/admin/brandsEdit/:id" element={<AdminBrandsEdit />} /> */}
          <Route path="/admin/sections" element={<AdminSections />} />
          <Route path="/admin/sectionsAll" element={<AdminSectionsAll />} />
          <Route path="/admin/sectionsAdd" element={<AdminSectionsAdd />} />
          {/* <Route
            path="/admin/sectionsEdit/:id"
            element={<AdminSectionsEdit />}
          /> */}
          <Route path="/admin/targets" element={<AdminTargets />} />
          <Route path="/admin/targetsAll" element={<AdminTargetsAll />} />
          <Route path="/admin/targetsAdd" element={<AdminTargetsAdd />} />
          {/* <Route path="/admin/targetsEdit/:id" element={<AdminTargetsEdit />} /> */}
          <Route path="/admin/feedbacks" element={<AdminFeedbacks />} />
        </Routes>
      </div>
      <div></div>
    </>
  );
}

export default App;
