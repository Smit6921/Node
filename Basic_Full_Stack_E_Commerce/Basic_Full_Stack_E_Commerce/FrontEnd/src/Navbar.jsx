import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

const Navbar = () => (
  <nav className="navbar navbar-expand-lg bg-primary fw-bold">
    <div className="container">
      
      <Link className="navbar-brand" to="/home">Shopify</Link>

      
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto fs-5">
          <li className="nav-item">
            <Link className="nav-link" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home">About Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home">Contact Us</Link>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto fs-5">
          <li className="nav-item">
            <Link className="nav-link" to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
