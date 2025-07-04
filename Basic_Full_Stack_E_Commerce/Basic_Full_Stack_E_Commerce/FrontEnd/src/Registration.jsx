import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "" 
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registered successfully!");
        navigate("/login"); 
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="register-bg d-flex align-items-center justify-content-center vh-100">

      <form className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%", borderRadius: "20px" }} onSubmit={handleSubmit} >
        <h2 className="text-center mb-4">Registeration</h2>

        <input 
          className="form-control mb-3" 
          type="text" 
          placeholder="Enter Your Name" 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
        />

        <input 
          className="form-control mb-3" 
          type="email" 
          placeholder="Enter Your Email" 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
        />

        <input 
          className="form-control mb-3" 
          type="password" 
          placeholder="Enter Your Password" 
          name="password" 
          value={form.password} 
          onChange={handleChange} 
        />
        
        <button type="submit" className="btn btn-primary w-100 rounded-5 fw-bold mt-3">SIGN UP</button>

        <button type="button" className="btn btn-primary w-100 rounded-5 fw-bold mt-4" onClick={() => navigate("/login")}>ALREADY HAVE AN ACCOUNT </button>

        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
