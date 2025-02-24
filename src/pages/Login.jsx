import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { APIUrl, handleError, handleSuccess } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }
    try {
      const response = await fetch(`${APIUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        localStorage.setItem("token", result.jwtToken);
        localStorage.setItem("loggedInUser", result.name);
        setTimeout(() => navigate("/"), 1000);
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
              backgroundColor: "#E1BEE7",}}>
            <h1>Login</h1>
            <h3 style={{ color: "#4A148C" }}>Login to Your Account</h3>
            <form onSubmit={handleLogin} style={{display: "flex",
              flexDirection: "column",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",}}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={loginInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password..."
                  value={loginInfo.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Login</button>
              <span>
                Don't have an account? <Link to="/signup">Signup</Link>
              </span>
            </form>
            <ToastContainer />
          </div>
          </div>
  );
}

export default Login;
