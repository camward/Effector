import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="app_menu">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/one"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        Project One
      </NavLink>
      <NavLink
        to="/two"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        Project Two
      </NavLink>
      <NavLink
        to="/three"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        Three
      </NavLink>
    </div>
  );
};

export default Header;
