import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { isAuthenticated } from "./utils";
import Expenses from "./pages/Expenses"; 


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/expenses"
          element={isAuthenticated() ? <Expenses /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
