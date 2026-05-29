import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!email.trim()) {
      e.email = "Email is required";
    } else if (!email.includes("@")) {
      e.email = "Please enter a valid email";
    }
    if (!password) {
      e.password = "Password is required";
    } else if (password.length < 6) {
      e.password = "Password must be at least 6 characters";
    }
    return e;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    // Mock login — set user in context
    const name = email.split("@")[0];
    setUser({ name, email });
    navigate("/dashboard", { state: { message: "Welcome back!" } });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-logo">TenantTrails</h1>
        <p className="auth-subtitle">
          See what past tenants had to say, before you sign.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="alex@dal.ca"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="auth-submit">
            Sign In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-switch-link">
            Create one
          </Link>
        </p>

        <div className="auth-demo">
          Demo: <strong>alex@dal.ca</strong> / <strong>password123</strong>
        </div>
      </div>
    </div>
  );
}

export default Login;
