import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = form;

    // ✅ Hardcoded users (for now)
    if (username === "manager" && password === "1234") {
      
      localStorage.setItem("user", JSON.stringify({ role: "MANAGER" }));

      navigate("/approvals");

    } else if (username === "employee" && password === "1234") {

      localStorage.setItem("user", JSON.stringify({ role: "EMPLOYEE" }));

      navigate("/LeaveApply");

    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        
        <h2>Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <p className="forgot-password">Forgot Password?</p>

        <button type="submit">Login</button>

        <p className="create-account">
          Don't have an account? <span>Create Account</span>
        </p>

      </form>
    </div>
  );
};

export default Login;