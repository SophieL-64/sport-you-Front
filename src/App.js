import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./screens/Home";
import Section from "./screens/Section";
import ShoppingCart from "./screens/ShoppingCart";
import Form from "./screens/Form";
import Faq from "./screens/Faq";
import Opinions from "./screens/Opinions";
import Login from "./admin/authentification/Login";
import Register from "./admin/authentification/Register";
import Logout from "./admin/authentification/Logout";
import AdminAdmins from "./admin/screens/AdminAdmins";
import AdminAdminsAll from "./admin/components/AdminAdminsAll";
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
import AdminColorsAdd from "./admin/components/AdminColorsAdd";
import AdminColorsEdit from "./admin/components/AdminColorsEdit";
import AdminBrands from "./admin/screens/AdminBrands";
import AdminBrandsAll from "./admin/components/AdminBrandsAll";
import AdminBrandsAdd from "./admin/components/AdminBrandsAdd";
import AdminBrandsEdit from "./admin/components/AdminBrandsEdit";
import AdminSections from "./admin/screens/AdminSections";
import AdminSectionsAll from "./admin/components/AdminSectionsAll";
import AdminSectionsAdd from "./admin/components/AdminSectionsAdd";
import AdminSectionsEdit from "./admin/components/AdminSectionsEdit";
import AdminTargets from "./admin/screens/AdminTargets";
import AdminTargetsAll from "./admin/components/AdminTargetsAll";
import AdminTargetsAdd from "./admin/components/AdminTargetsAdd";
import AdminTargetsEdit from "./admin/components/AdminTargetsEdit";
import AdminFeedbacks from "./admin/screens/AdminFeedbacks";
import AdminRoutes from "./admin/components/AdminRoutes";
import "./App.css";
import AdminProvider from "./contexts/AdminProvider";

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
        <AdminProvider>
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
            <Route path="/login" element={<Login />} />
            {/* ROUTES PROTEGEES */}
            <Route path="/admin" element={<AdminRoutes />}>
              <Route path="logout" element={<Logout />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="register" element={<Register />} />
              <Route path="admins" element={<AdminAdmins />} />
              <Route path="adminAll" element={<AdminAdminsAll />} />
              <Route path="clothes" element={<AdminClothes />} />
              <Route path="clothesAll" element={<AdminClothesAll />} />
              <Route path="clothesAdd" element={<AdminClothesAdd />} />
              <Route path="clothesEdit/:id" element={<AdminClothesEdit />} />
              <Route path="sizes" element={<AdminSizes />} />
              <Route path="sizesAll" element={<AdminSizesAll />} />
              <Route path="sizesAdd" element={<AdminSizesAdd />} />
              <Route path="colors" element={<AdminColors />} />
              <Route path="colorsAll" element={<AdminColorsAll />} />
              <Route path="colorsAdd" element={<AdminColorsAdd />} />
              <Route path="colorsEdit/:id" element={<AdminColorsEdit />} />
              <Route path="brands" element={<AdminBrands />} />
              <Route path="brandsAll" element={<AdminBrandsAll />} />
              <Route path="brandsAdd" element={<AdminBrandsAdd />} />
              <Route path="brandsEdit/:id" element={<AdminBrandsEdit />} />
              <Route path="sections" element={<AdminSections />} />
              <Route path="sectionsAll" element={<AdminSectionsAll />} />
              <Route path="sectionsAdd" element={<AdminSectionsAdd />} />
              <Route path="sectionsEdit/:id" element={<AdminSectionsEdit />} />
              <Route path="targets" element={<AdminTargets />} />
              <Route path="targetsAll" element={<AdminTargetsAll />} />
              <Route path="targetsAdd" element={<AdminTargetsAdd />} />
              <Route path="targetsEdit/:id" element={<AdminTargetsEdit />} />
              <Route path="feedbacks" element={<AdminFeedbacks />} />
            </Route>
          </Routes>
        </AdminProvider>
      </div>
    </>
  );
}

export default App;
