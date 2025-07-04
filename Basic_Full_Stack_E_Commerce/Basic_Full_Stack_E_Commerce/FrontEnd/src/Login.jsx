import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Both fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("userId", data.userId); 
        toast.success("Login successful!");
        window.location.href = "/home";
      } else {
        toast.error(data.message || "Invalid email or password");
      }
    } catch (err) {
      toast.error("Server Error. Please Try Again.");
    }
  };

  return (
    <div className="register-bg d-flex align-items-center justify-content-center vh-100">
      <form onSubmit={handleSubmit} className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%", borderRadius: "20px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <input type="email" 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          placeholder="Enter Registred Email" 
          className="form-control mb-3" 
        />

        <input type="password" 
          name="password" 
          value={form.password} 
          onChange={handleChange} 
          placeholder="Enter Registred Password" 
          className="form-control mb-3" 
        />
        
        <button className="btn btn-primary w-100 rounded-5 fw-bold mt-3">SIGN IN</button>
        <button type="button" className="btn btn-primary w-100 rounded-5 fw-bold mt-4" onClick={() => navigate("/")}>CREATE AN ACCOUNT </button>
      </form>
    </div>  
  );
};

export default LoginForm;
