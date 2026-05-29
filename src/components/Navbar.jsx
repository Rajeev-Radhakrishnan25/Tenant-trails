import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        TenantTrails
      </Link>
      <div className="navbar-links">
        <Link to="/login" className="navbar-link">
          Sign In
        </Link>
        <Link to="/signup" className="navbar-btn">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
