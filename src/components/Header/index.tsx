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
        Effects
      </NavLink>
      <NavLink
        to="/two"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        Forms
      </NavLink>
      <NavLink
        to="/three"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        Effect Sequence
      </NavLink>
    </div>
  );
};

export default Header;
