import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import imgOne  from "./images/basketball img.png";
import imgTwo from "./images/football 2 img.png";
import imgThree from "./images/football img.png";
import imgFour from "./images/running img.png";
import imgFive from "./images/sports img 2.png";
import imgSix from "./images/sports img.png";
import imgSeven from "./images/tennis img.png";

const products = [
  {
    _id: "1",
    name: "Nike basketball pro",
    price: 4999,
    description: "Shoes for basketball",
    image: imgOne,
  },
  {
    _id: "2",
    name: "Nike Basketball Lite",
    price: 2999,
    description: "Stylish shoes for basketball",
    image: imgTwo,
  },
  {
    _id: "3",
    name: "Football Nike Edge lite",
    price: 7499,
    description: "Running sneakers for men",
    image: imgThree,
  },
  {
    _id: "4",
    name: "Nike Golf Pre",
    price: 6499,
    description: "Nike sneakers for men",
    image: imgFour,
  },
  {
    _id: "5",
    name: "Sneakers lite",
    price: 3499,
    description: "Running sneakers for men",
    image: imgFive,
  },
  {
    _id: "6",
    name: "Runz Sneakers lite",
    price: 3599,
    description: "Running sneakers for men",
    image: imgSix,
  },
  {
    _id: "7",
    name: "Walks Lite",
    price: 3599,
    description: "Walking sneakers for men",
    image: imgSeven,
  },
];

const HomePage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container mt-4 flex-grow-1">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card rounded-2">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5>{product.name}</h5>
                  <p>₹{product.price}</p>
                  <Link to={`/product/${product._id}`} className="btn btn-primary rounded-5 pe-5 ps-5 fw-bold">
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
