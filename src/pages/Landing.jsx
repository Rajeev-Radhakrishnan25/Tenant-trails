import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-page">
      <Navbar />
      <main className="hero">
        <div className="hero-content">
          <span className="hero-badge">🏠 Launching in Halifax, Nova Scotia</span>
          <h1 className="hero-title">
            Know what you're signing
            <br />
            before you sign it
          </h1>
          <p className="hero-subtitle">
            Real reviews from real tenants. Search apartments, read honest
            feedback, and make informed rental decisions with AI-powered
            insights.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>

        <div className="features-grid">
          <FeatureCard
            icon="📝"
            title="Honest Reviews"
            description="Read what past tenants really think about their building, landlord, and neighbourhood."
          />
          <FeatureCard
            icon="🤖"
            title="AI Summaries"
            description="Get instant AI-generated summaries that highlight the most important feedback."
          />
          <FeatureCard
            icon="🔍"
            title="Smart Search"
            description="Search by address, neighbourhood, or filter by rating to find your next home."
          />
        </div>
      </main>
    </div>
  );
}

export default Landing;
