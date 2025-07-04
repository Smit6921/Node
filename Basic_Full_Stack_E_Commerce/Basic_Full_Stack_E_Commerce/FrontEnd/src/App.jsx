import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./Registration";
import LoginForm from "./Login";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import HomePage from "./Home";
import ProductDetail from "./ProductDetails";
import ProfilePage from "./ProfilePage";


function App() {
  return (
    <Router>
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000}       
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
