import React, { useState } from "react";
import Button from "./Button";
import menuItems from "./MenuItems";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../Redux/authSlice";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setActive(!active);
  };

  const handleLogout = () => {
    dispatch(logout());
    return navigate("/login")
  }

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">
        Bharat Agri
      </h1>
      <div className="menu-icon" onClick={handleClick}>
        <i className={active ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={active ? "nav-menu active" : "nav-menu"}>
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.url} className={item.cName}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      <Button onClick={handleLogout}>Logout</Button>
    </nav>
  );
};

export default Navbar;