import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">TenantTrails</div>
      <div className="navbar-right">
        <span className="navbar-signin">Sign In</span>
        <button className="navbar-btn">Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;
