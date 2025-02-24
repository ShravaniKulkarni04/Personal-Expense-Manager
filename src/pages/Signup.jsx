import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { APIUrl, handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name, email, and password are required");
    }
    try {
      const response = await fetch(`${APIUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(result.message || result.error?.details[0].message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
      <div className="auth-page">
          <div className="container" style={{display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              backgroundColor: "#EDE7F6",}}>
            <h1>Signup</h1>
            <h3 style={{ color: "#4A148C" }}>Create an Account</h3>
            <form onSubmit={handleSignup} style={{display: "flex",
              flexDirection: "column",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",}}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name..."
                  value={signupInfo.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={signupInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password..."
                  value={signupInfo.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Signup</button>
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </form>
            <ToastContainer />
          </div>
          </div>
  );
}

export default Signup;
