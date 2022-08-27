import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";
import "./Navbar.css";
import { FaShoppingBasket } from "react-icons/fa";

const Navbar = () => {
  const [sections, setSections] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/sections")
      .then((res) => setSections(res.data));
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
      number += product.quantity;
    }
    return number;
  }

  return (
    <nav className="navbar">
      <Logo />
      <ul className="navlist">
        <a href="/" className="navLink">
          <li className="navItem">Accueil</li>
        </a>
        {sections &&
          sections.map((section) => (
            <a href={`/section/${section.id}`} className="navLink">
              <li className="navItem">
                {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
              </li>
            </a>
          ))}
        <a href="/shopping-cart" className="navLink">
          <li className="navItem basketCart">
            <FaShoppingBasket className="basket" id="shopNow" />
            <p className="itemsCount">{getNumberProduct()}</p>
          </li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
