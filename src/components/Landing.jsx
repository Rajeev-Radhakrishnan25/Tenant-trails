import "./Landing.css";
import Navbar from "./Navbar";
import Button from "./Button";
import FeatureCard from "./FeatureCard";

function Landing() {
  return (
    <div className="landing">
      <Navbar />

      <section className="hero">
        <span className="badge">Launching in Halifax, Nova Scotia</span>

        <h1 className="hero-heading">
          Know what you're signing
          <br />
          before you sign it.
        </h1>

        <p className="hero-subtitle">
          Read honest reviews from past tenants. See AI-generated
          <br />
          summaries. Make informed decisions about where you live.
        </p>

        <div className="cta-row">
          <Button label="Create Free Account" onClick={() => alert("Create account clicked!")} />
          <Button label="Sign In" variant="outline" onClick={() => alert("Sign in clicked!")} />
        </div>

        <div className="features">
          <FeatureCard
            icon="⭐"
            title="Verified Reviews"
            description="Real ratings with photos and videos from past tenants."
          />
          <FeatureCard
            icon="🤖"
            title="AI Summaries"
            description="Key issues and sentiment extracted from every review."
          />
          <FeatureCard
            icon="💬"
            title="Ask Questions"
            description="Comment on reviews and get answers from past tenants."
          />
        </div>
      </section>
    </div>
  );
}

export default Landing;
