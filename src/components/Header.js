// Header.js

import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import DemoLogo from '../assets/demologo.png'

const Header = () => {
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src={DemoLogo}
            alt="IMDB Logo"
          />
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Movies</span>
        </Link>
        <Link to="/add" style={{ textDecoration: "none" }}>
          <span>Add Movie</span>
        </Link>
      </div>
    
    </div>
  );
};

export default Header;
