import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="footer__inner">

        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-icon">J</div>
            <span className="footer__logo-text">Jobzey</span>
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

export default Footer;
