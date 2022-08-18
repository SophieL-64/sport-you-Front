// import { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import "./Logo.css";

const Logo = () => {
  return (
    <a href="/">
      <img src={logo} alt="logo" className="logo" />
    </a>
  );
};

export default Logo;
