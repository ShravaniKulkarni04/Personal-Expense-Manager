import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", justifyContent: "center", padding: "10px 20px", backgroundColor: "#4A148C" }}>
        <div>
    <a href="/" style={{ color: "white", textDecoration: "none", fontSize: "18px", marginRight: "20px"}}>Home</a>
    <a href="/login" style={{ color: "white", textDecoration: "none", fontSize: "18px", marginRight: "20px" }}>Login</a>
    <a href="/signup" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>Signup</a>
        </div>
    </nav>
  );
}

export default Navbar;
