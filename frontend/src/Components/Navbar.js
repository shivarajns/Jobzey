import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuth } from "../Context/AuthContext";
import auth from "../Firebase/FirebaseConfig";
import "./Navbar.css";

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

          <Link to="/home" className="navbar__logo">
            <div className="navbar__logo-icon">J</div>
            <span className="navbar__logo-text">Jobzey</span>
          </Link>

          <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
            <li>
              <Link to="/home" onClick={function () {
                setMenuOpen(false);
                setTimeout(function () {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              }}>Home</Link>
            </li>
            <li>
              <Link to="/home#features" onClick={function () {
                setMenuOpen(false);
                setTimeout(function () {
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}>Features</Link>
            </li>
            <li>
              <Link to="/home#how-it-works" onClick={function () {
                setMenuOpen(false);
                setTimeout(function () {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}>How it works</Link>
            </li>
            <li>
              <Link to="/home#about" onClick={function () {
                setMenuOpen(false);
                setTimeout(function () {
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}>About</Link>
            </li>
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

export default Navbar;
