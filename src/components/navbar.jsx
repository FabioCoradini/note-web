import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/notes">
          My Notes
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
