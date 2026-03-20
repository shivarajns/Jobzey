import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuth } from "../Context/AuthContext";
import auth from "../Firebase/FirebaseConfig";
import "./Home.css";

function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(function () {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return function () {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function handleLogout() {
    await signOut(auth);
    localStorage.removeItem("token");
    navigate("/login");
  }

  function getInitials(email) {
    return email ? email[0].toUpperCase() : "U";
  }

  return (
    <>

      <div className="demo-banner">
        🚧 This is a portfolio/demo project — all data and numbers are for demonstration purposes only
      </div>
      
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">

          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-icon">J</div>
            <span className="navbar__logo-text">Jobzey</span>
          </Link>

          <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
            <li><a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          </ul>

          <div className="navbar__actions">
            {currentUser ? (
              <div className="navbar__user">
                <div className="navbar__avatar" title={currentUser.email}>
                  {getInitials(currentUser.email)}
                </div>
                <button className="navbar__logout" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            ) : (
              <div className="navbar__auth">
                <Link to="/login" className="navbar__login">Log in</Link>
                <Link to="/signup" className="navbar__signup">Get started</Link>
              </div>
            )}
          </div>

          <button
            className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </nav>
    </>
  );
}

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
          Jobzey uses AI to match you with the right opportunities,
          track your applications, and land interviews — all in one place.
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
            <span className="hero__stat-number">100+</span>
            <span className="hero__stat-label">Jobs listed</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-number">10+</span>
            <span className="hero__stat-label">Domains covered</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-number">Free</span>
            <span className="hero__stat-label">Always free to use</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: "🚀",
      title: "Quick & easy apply",
      description:
        "Apply to jobs in just a few clicks. No lengthy forms, no repetitive data entry — just find the role and hit apply.",
    },
    {
      icon: "🌐",
      title: "Jobs across every domain",
      description:
        "Whether you're in tech, finance, design, healthcare, or anything in between — Jobzey has opportunities for every field.",
    },
    {
      icon: "✨",
      title: "Simple & user friendly",
      description:
        "A clean, distraction-free experience built for job seekers. Find what you need fast without getting lost in complexity.",
    },
  ];

  return (
    <section className="features" id="features">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__label">Features</span>
          <h2 className="section__title">Everything you need to land the job</h2>
          <p className="section__subtitle">
            Jobzey brings together the tools job seekers actually need — in one clean, focused platform.
          </p>
        </div>

        <div className="features__grid">
          {features.map(function (feature, index) {
            return (
              <div className="feature-card" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-card__icon">{feature.icon}</div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.description}</p>
                <div className="feature-card__line"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Create your profile",
      description: "Sign up and build your profile in minutes. Add your skills, experience, and the kind of roles you're looking for.",
    },
    {
      number: "02",
      title: "Get matched instantly",
      description: "Our AI scans thousands of listings and surfaces the ones that actually fit your background and goals.",
    },
    {
      number: "03",
      title: "Apply and track",
      description: "Apply directly through Jobzey and track every application in real time — from submission to offer.",
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__label">How it works</span>
          <h2 className="section__title">Three steps to your next role</h2>
          <p className="section__subtitle">
            Getting started takes less than 5 minutes. No credit card required.
          </p>
        </div>

        <div className="steps">
          {steps.map(function (step, index) {
            return (
              <div className="step" key={index}>
                <div className="step__number">{step.number}</div>
                <div className="step__content">
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__desc">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="step__connector"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="navbar__logo-icon">J</div>
            <span className="navbar__logo-text">Jobzey</span>
          </div>
          <p className="footer__tagline">
            The smarter way to find your next job.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <Link to="/signup">Sign up</Link>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#about">Careers</a>
            <a href="#about">Contact</a>
          </div>
          <div className="footer__col">
            <h4>Legal</h4>
            <a href="#about">Privacy</a>
            <a href="#about">Terms</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 Jobzey. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="home">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}

export default Home;
