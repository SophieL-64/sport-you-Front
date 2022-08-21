import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";
import "./Navbar.css";

const Navbar = () => {
  const [sections, setSections] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/sections")
      .then((res) => setSections(res.data));
  }, []);

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
      </ul>
    </nav>
  );
};

export default Navbar;
