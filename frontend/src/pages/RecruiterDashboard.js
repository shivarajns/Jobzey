import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../Firebase/FirebaseConfig";
import { signOut } from "firebase/auth";
import "./JobseekerDashboard.css";

function RecruiterDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(function () {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:8080/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError("Failed to load profile. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userData");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  function handleEdit() {
    navigate("/recruiter/edit-profile");
  }

  function getInitials(email) {
    if (!email) return "R";
    return email.charAt(0).toUpperCase();
  }

  function formatCompanySize(size) {
    switch (size) {
      case "SIZE_1_10": return "1 - 10 employees";
      case "SIZE_11_50": return "11 - 50 employees";
      case "SIZE_51_200": return "51 - 200 employees";
      case "SIZE_201_500": return "201 - 500 employees";
      case "SIZE_500_PLUS": return "500+ employees";
      default: return "Not provided";
    }
  }

  const safe = (val) => val || "Not provided";

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-bg">
          <div className="dashboard-bg__orb dashboard-bg__orb--1"></div>
          <div className="dashboard-bg__orb dashboard-bg__orb--2"></div>
          <div className="dashboard-bg__orb dashboard-bg__orb--3"></div>
          <div className="dashboard-bg__grid"></div>
        </div>
        <div className="dashboard-loading">
          <div className="dashboard-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-bg">
          <div className="dashboard-bg__orb dashboard-bg__orb--1"></div>
          <div className="dashboard-bg__orb dashboard-bg__orb--2"></div>
          <div className="dashboard-bg__orb dashboard-bg__orb--3"></div>
          <div className="dashboard-bg__grid"></div>
        </div>
        <div className="dashboard-error">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="dashboard-btn dashboard-btn--primary"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Background */}
      <div className="dashboard-bg">
        <div className="dashboard-bg__orb dashboard-bg__orb--1"></div>
        <div className="dashboard-bg__orb dashboard-bg__orb--2"></div>
        <div className="dashboard-bg__orb dashboard-bg__orb--3"></div>
        <div className="dashboard-bg__grid"></div>
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header__container">
          <div className="dashboard-brand">
            <div className="dashboard-brand__icon">J</div>
            <span className="dashboard-brand__name">Jobzey</span>
          </div>

          <div className="dashboard-header__actions">
            <button
              onClick={handleEdit}
              className="dashboard-btn dashboard-btn--secondary"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="dashboard-btn dashboard-btn--logout"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="dashboard-main">
        <div className="dashboard-container">

          {/* Hero */}
          <div className="dashboard-hero">
            <div className="dashboard-profile-avatar">
              {getInitials(userData.email)}
            </div>

            <div className="dashboard-hero__content">
              <h1 className="dashboard-hero__name">
                {safe(userData.username)}
              </h1>

              <p className="dashboard-hero__role">
                {safe(userData.jobTitle || "Recruiter")}
              </p>

              <div className="dashboard-status-badge">
                <span className="dashboard-status-badge__dot"></span>
                Hiring Active
              </div>
            </div>
          </div>

          {/* Company Overview */}
          <div className="dashboard-card dashboard-card--bio">
            <h2 className="dashboard-card__title">Company Overview</h2>
            <p className="dashboard-bio-text">
              {safe(userData.companyDescription)}
            </p>
          </div>

          {/* Grid */}
          <div className="dashboard-grid">

            {/* Company Info */}
            <div className="dashboard-card">
              <h2 className="dashboard-card__title">Company Information</h2>

              <div className="dashboard-info-list">
                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">
                      Company Name
                    </span>
                    <span className="dashboard-info-item__value">
                      {safe(userData.companyName)}
                    </span>
                  </div>
                </div>

                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">
                      Industry
                    </span>
                    <span className="dashboard-info-item__value">
                      {safe(userData.industry)}
                    </span>
                  </div>
                </div>

                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">
                      Company Size
                    </span>
                    <span className="dashboard-info-item__value">
                      {formatCompanySize(userData.companySize)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="dashboard-card">
              <h2 className="dashboard-card__title">Contact Information</h2>

              <div className="dashboard-info-list">
                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">Email</span>
                    <span className="dashboard-info-item__value">
                      {safe(userData.email)}
                    </span>
                  </div>
                </div>

                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">Phone</span>
                    <span className="dashboard-info-item__value">
                      {safe(userData.phone)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional */}
            <div className="dashboard-card">
              <h2 className="dashboard-card__title">Professional Details</h2>

              <div className="dashboard-info-list">
                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">
                      Job Title
                    </span>
                    <span className="dashboard-info-item__value">
                      {safe(userData.jobTitle)}
                    </span>
                  </div>
                </div>

                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">
                      Experience
                    </span>
                    <span className="dashboard-info-item__value">
                      {safe(userData.experience)} years
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="dashboard-card">
              <h2 className="dashboard-card__title">Links & Resources</h2>

              <div className="dashboard-links">

                {userData.companyWebsite && (
                  <a
                    href={userData.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dashboard-link-btn"
                  >
                    <div className="dashboard-link-btn__content">
                      <span className="dashboard-link-btn__label">
                        Company Website
                      </span>
                      <span className="dashboard-link-btn__url">
                        Visit Website
                      </span>
                    </div>
                  </a>
                )}

                {userData.linkedInUrl && (
                  <a
                    href={userData.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dashboard-link-btn"
                  >
                    <div className="dashboard-link-btn__content">
                      <span className="dashboard-link-btn__label">
                        LinkedIn
                      </span>
                      <span className="dashboard-link-btn__url">
                        View Profile
                      </span>
                    </div>
                  </a>
                )}

              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default RecruiterDashboard;