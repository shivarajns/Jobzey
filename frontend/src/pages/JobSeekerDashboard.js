import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../Firebase/FirebaseConfig";
import { signOut } from "firebase/auth";
import "./JobseekerDashboard.css";

function JobseekerDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(function() {
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
    navigate("/jobseeker/edit-profile");
  }

  function getInitials(email) {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  }

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
          <p>Loading your profile...</p>
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
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button onClick={function() { navigate("/login"); }} className="dashboard-btn dashboard-btn--primary">
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
            <button onClick={handleEdit} className="dashboard-btn dashboard-btn--secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit Profile
            </button>
            <button onClick={handleLogout} className="dashboard-btn dashboard-btn--logout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          
          {/* Hero Section */}
          <div className="dashboard-hero">
            <div className="dashboard-profile-avatar">
              {getInitials(userData.email)}
            </div>
            <div className="dashboard-hero__content">
              <h1 className="dashboard-hero__name">{userData.username}</h1>
              <p className="dashboard-hero__role">{userData.currentDesi}</p>
              <div className="dashboard-hero__meta">
                <span className="dashboard-hero__location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {userData.location}
                </span>
                {/* <span className="dashboard-hero__divider">•</span> */}
                {/* <span className="dashboard-hero__exp">{userData.expYears} years experience</span> */}
              </div>
              {userData.isOpenToWork === "true" && (
                <div className="dashboard-status-badge">
                  <span className="dashboard-status-badge__dot"></span>
                  Open to work
                </div>
              )}
            </div>
          </div>

          {/* Bio Section */}
          {userData.bio && (
            <div className="dashboard-card dashboard-card--bio">
              <h2 className="dashboard-card__title">About</h2>
              <p className="dashboard-bio-text">{userData.bio}</p>
            </div>
          )}

          {/* Grid Layout */}
          <div className="dashboard-grid">
            
            {/* Contact Information */}
            <div className="dashboard-card">
              <h2 className="dashboard-card__title">Contact Information</h2>
              <div className="dashboard-info-list">
                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__icon" style={{ background: "rgba(79, 142, 255, 0.1)", color: "#4f8eff" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">Email</span>
                    <span className="dashboard-info-item__value">{userData.email}</span>
                  </div>
                </div>

                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__icon" style={{ background: "rgba(34, 197, 94, 0.1)", color: "#22c55e" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">Phone</span>
                    <span className="dashboard-info-item__value">{userData.phone}</span>
                  </div>
                </div>

                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__icon" style={{ background: "rgba(249, 115, 22, 0.1)", color: "#f97316" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">Location</span>
                    <span className="dashboard-info-item__value">{userData.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="dashboard-card">
              <h2 className="dashboard-card__title">Personal Details</h2>
              <div className="dashboard-info-list">
                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__icon" style={{ background: "rgba(123, 94, 167, 0.1)", color: "#7b5ea7" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">Date of Birth</span>
                    <span className="dashboard-info-item__value">{new Date(userData.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>

                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__icon" style={{ background: "rgba(79, 142, 255, 0.1)", color: "#4f8eff" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">Gender</span>
                    <span className="dashboard-info-item__value" style={{ textTransform: "capitalize" }}>{userData.gender}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            {/* <div className="dashboard-card">
              <h2 className="dashboard-card__title">Professional Information</h2>
              <div className="dashboard-info-list">
                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__icon" style={{ background: "rgba(34, 197, 94, 0.1)", color: "#22c55e" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                  </div>
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">Current Company</span>
                    <span className="dashboard-info-item__value">{userData.currentCompany}</span>
                  </div>
                </div>

                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__icon" style={{ background: "rgba(249, 115, 22, 0.1)", color: "#f97316" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">Experience</span>
                    <span className="dashboard-info-item__value">{userData.expYears} years</span>
                  </div>
                </div>

                <div className="dashboard-info-item">
                  <div className="dashboard-info-item__icon" style={{ background: "rgba(123, 94, 167, 0.1)", color: "#7b5ea7" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                  </div>
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">Interested Domains</span>
                    <span className="dashboard-info-item__value">{userData.interestedDomains}</span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Links & Resources */}
            <div className="dashboard-card">
              <h2 className="dashboard-card__title">Links & Resources</h2>
              <div className="dashboard-links">
                {userData.portfolioUrl && (
                  <a 
                    href={userData.portfolioUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="dashboard-link-btn"
                  >
                    <div className="dashboard-link-btn__icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </div>
                    <div className="dashboard-link-btn__content">
                      <span className="dashboard-link-btn__label">Portfolio</span>
                      <span className="dashboard-link-btn__url">View my work</span>
                    </div>
                    <svg className="dashboard-link-btn__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"/>
                      <polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </a>
                )}

                {userData.resumeUrl && (
                  <a 
                    href={userData.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="dashboard-link-btn"
                  >
                    <div className="dashboard-link-btn__icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                    </div>
                    <div className="dashboard-link-btn__content">
                      <span className="dashboard-link-btn__label">Resume</span>
                      <span className="dashboard-link-btn__url">Download PDF</span>
                    </div>
                    <svg className="dashboard-link-btn__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"/>
                      <polyline points="7 7 17 7 17 17"/>
                    </svg>
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

export default JobseekerDashboard;
