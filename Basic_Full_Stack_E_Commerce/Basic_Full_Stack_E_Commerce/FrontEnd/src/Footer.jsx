import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Footer = () => (
  <footer className="bg-dark text-white pt-4 pb-2 mt-5">
    <div className="container">
      <div className="row">

        
        <div className="col-md-4 mb-3">
          <h5>Shopify</h5>
          <p className="small">
            Your one-stop shop for amazing products. Fast delivery and great customer service!
          </p>
        </div>

        
        <div className="col-md-4 mb-3">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="/home" className="text-white text-decoration-none">Home</a></li>
            <li><a href="/home" className="text-white text-decoration-none">About Us</a></li>
            <li><a href="/home" className="text-white text-decoration-none">Contact Us</a></li>
            <li><a href="/profile" className="text-white text-decoration-none">Profile</a></li>
          </ul>
        </div>

       
        <div className="col-md-4 mb-3">
          <h5>Contact</h5>
          <p className="small mb-1">Email: smitupadhyay22@gmail.com</p>
          <p className="small mb-0">Phone: +91 92656 59120</p>
        </div>

      </div>

      
      <div className="text-center mt-3 border-top pt-3">
        <p className="mb-0 small">&copy; {new Date().getFullYear()} My Shop. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
