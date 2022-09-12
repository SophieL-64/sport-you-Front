import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";
import "./Navbar.css";
import { FaShoppingBasket } from "react-icons/fa";

const Navbar = (props) => {
  const { totalItems, getNumberProduct } = props;
  const [sections, setSections] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/sections")
      .then((res) => setSections(res.data));
  }, []);

  useEffect(() => {
    getNumberProduct();
  });

  return (
    <nav className="navbar">
      <Logo />
      <ul className="navlist">
        <a href="/" className="navLink">
          <li className="navItem">Accueil</li>
        </a>
        {sections &&
          sections.map((section) => (
            <a
              href={`/section/${section.id}`}
              className="navLink"
              key={section.id}
            >
              <li className="navItem">
                {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
              </li>
            </a>
          ))}
        <a href="/shopping-cart" className="navLink">
          <li className="navItem basketCart">
            <FaShoppingBasket className="basket" id="shopNow" />
            <p className={totalItems === 0 ? "inactif" : "itemsCount"}>
              {totalItems}
            </p>
          </li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
