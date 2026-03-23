import { Link } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1"></div>
        <div className="hero__orb hero__orb--2"></div>
        <div className="hero__orb hero__orb--3"></div>
        <div className="hero__grid"></div>
      </div>

      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot"></span>
          Now in public beta
        </div>

        <h1 className="hero__title">
          Find your dream job
          <span className="hero__title-accent"> faster</span>
          <br />than ever before
        </h1>

        <p className="hero__subtitle">
          Jobzey brings together job listings from every domain
          so you can search, apply, and track — all in one place.
        </p>

        <div className="hero__cta">
          <Link to="/signup" className="hero__cta-primary">
            Start for free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <a href="#how-it-works" className="hero__cta-secondary">
            See how it works
          </a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">50K+</span>
            <span className="hero__stat-label">Active users</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-number">200K+</span>
            <span className="hero__stat-label">Jobs listed</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-number">94%</span>
            <span className="hero__stat-label">Interview rate</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
