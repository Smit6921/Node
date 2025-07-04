import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";

import imgOne  from "./images/basketball img.png";
import imgTwo from "./images/football 2 img.png";
import imgThree from "./images/football img.png";
import imgFour from "./images/running img.png";
import imgFive from "./images/sports img 2.png";
import imgSix from "./images/sports img.png";
import imgSeven from "./images/tennis img.png";


const staticProducts = [
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

const ProductDetail = () => {
  const { id } = useParams();
  const product = staticProducts.find((p) => p._id === id);

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return toast.error("Please login first");

    const purchase = {
      userId,
      name: product.name,
      price: product.price,
      time: new Date().toISOString(),
    };

    const res = await fetch("http://localhost:8000/api/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(purchase),
    });

    const data = await res.json();
    if (res.ok) toast.success("Purchase Successfully!");
    else toast.error(data.message || "Failed to add to cart");
  };

  if (!product) return <p>Product not found</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} className="img-fluid mb-3" />
        <p>Price: ₹{product.price}</p>
        <p>{product.description}</p>
        <button onClick={handleAddToCart} className="btn btn-primary rounded-5 fw-bold pe-5 ps-5">Purchase</button>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;