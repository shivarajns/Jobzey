import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../Firebase/FirebaseConfig";
import { signOut } from "firebase/auth";
import "./JobSeekerDashboard.css";
import "./RecruiterDashboard.css";

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

      const response = await fetch("https://jobzey.onrender.com/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setUserData(data);
      localStorage.setItem("userId", data?.userId)
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

  function handlePostJob(){
    navigate("/recruiter/job/create")
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
    <div className="dashboard-page recruiter-dashboard-surface">
      {/* Background */}
      <div className="dashboard-bg">
        <div className="dashboard-bg__orb dashboard-bg__orb--1"></div>
        <div className="dashboard-bg__orb dashboard-bg__orb--2"></div>
        <div className="dashboard-bg__orb dashboard-bg__orb--3"></div>
        <div className="dashboard-bg__grid"></div>
      </div>

      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-hero">
            <div className="dashboard-profile-avatar">{getInitials(userData.email)}</div>
            <div className="dashboard-hero__content">
              <h1 className="dashboard-hero__name">{safe(userData.username)}</h1>
              <p className="dashboard-hero__role">{safe(userData.jobTitle || "Recruiter")}</p>
              <div className="dashboard-status-badge">
                <span className="dashboard-status-badge__dot"></span>
                Hiring Active
              </div>
            </div>
            <div className="dashboard-profile-actions">
              <button onClick={handlePostJob} className="dashboard-btn dashboard-btn--secondary">Create Job</button>
              <button onClick={handleEdit} className="dashboard-btn dashboard-btn--secondary">Edit Profile</button>
              <button onClick={handleLogout} className="dashboard-btn dashboard-btn--logout">Logout</button>
            </div>
          </div>

          <div className="dashboard-card dashboard-card--bio">
            <h2 className="dashboard-card__title">Company Overview</h2>
            <p className="dashboard-bio-text" style={{ whiteSpace: "pre-line" }}>{safe(userData.companyDescription)}</p>
          </div>

          <div className="profile-flow">
            <section className="profile-section profile-section--contact">
              <div className="profile-section__header">
                <div>
                  <h2 className="dashboard-card__title">Company Information</h2>
                  <p className="profile-section__subtitle">A premium overview of your hiring profile and company details.</p>
                </div>
              </div>

              <div className="profile-info-grid">
                <div className="profile-info-card">
                  <div className="profile-info-card__icon" style={{ background: "rgba(79, 142, 255, 0.12)", color: "#4f8eff" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h18" /><path d="M5 7v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7" /><path d="M8 7V4h8v3" /></svg>
                  </div>
                  <div className="profile-info-card__details">
                    <span className="profile-info-card__label">Company Name</span>
                    <span className="profile-info-card__value">{safe(userData.companyName)}</span>
                  </div>
                </div>

                <div className="profile-info-card">
                  <div className="profile-info-card__icon" style={{ background: "rgba(123, 94, 167, 0.14)", color: "#7b5ea7" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                  </div>
                  <div className="profile-info-card__details">
                    <span className="profile-info-card__label">Industry</span>
                    <span className="profile-info-card__value">{safe(userData.industry)}</span>
                  </div>
                </div>

                <div className="profile-info-card">
                  <div className="profile-info-card__icon" style={{ background: "rgba(34, 197, 94, 0.12)", color: "#22c55e" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  </div>
                  <div className="profile-info-card__details">
                    <span className="profile-info-card__label">Company Size</span>
                    <span className="profile-info-card__value">{formatCompanySize(userData.companySize)}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="profile-section profile-section--personal">
              <div className="profile-section__header">
                <div>
                  <h2 className="dashboard-card__title">Contact Information</h2>
                  <p className="profile-section__subtitle">Keep your hiring channels clear and accessible for applicants and partners.</p>
                </div>
              </div>

              <div className="profile-info-grid">
                <div className="profile-info-card">
                  <div className="profile-info-card__icon" style={{ background: "rgba(79, 142, 255, 0.12)", color: "#4f8eff" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="M22 6 12 13 2 6" /></svg>
                  </div>
                  <div className="profile-info-card__details">
                    <span className="profile-info-card__label">Email</span>
                    <span className="profile-info-card__value">{safe(userData.email)}</span>
                  </div>
                </div>

                <div className="profile-info-card">
                  <div className="profile-info-card__icon" style={{ background: "rgba(249, 115, 22, 0.13)", color: "#f97316" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div className="profile-info-card__details">
                    <span className="profile-info-card__label">Phone</span>
                    <span className="profile-info-card__value">{safe(userData.phone)}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="profile-section profile-section--skills">
              <div className="profile-section__header">
                <div>
                  <h2 className="dashboard-card__title">Professional Details</h2>
                  <p className="profile-section__subtitle">Your recruiter profile stays aligned with the same premium dashboard experience.</p>
                </div>
              </div>

              <div className="profile-info-grid">
                <div className="profile-info-card">
                  <div className="profile-info-card__icon" style={{ background: "rgba(79, 142, 255, 0.12)", color: "#4f8eff" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <div className="profile-info-card__details">
                    <span className="profile-info-card__label">Job Title</span>
                    <span className="profile-info-card__value">{safe(userData.jobTitle)}</span>
                  </div>
                </div>

                <div className="profile-info-card">
                  <div className="profile-info-card__icon" style={{ background: "rgba(34, 197, 94, 0.12)", color: "#22c55e" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                  </div>
                  <div className="profile-info-card__details">
                    <span className="profile-info-card__label">Experience</span>
                    <span className="profile-info-card__value">{safe(userData.experience)} years</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="profile-section profile-section--resume">
              <div className="profile-section__header">
                <div>
                  <h2 className="dashboard-card__title">Links & Resources</h2>
                  <p className="profile-section__subtitle">Keep your external hiring links and company presence polished and easy to access.</p>
                </div>
              </div>

              <div className="dashboard-links">
                {userData.companyWebsite && (
                  <a href={userData.companyWebsite} target="_blank" rel="noopener noreferrer" className="dashboard-link-btn">
                    <div className="dashboard-link-btn__content">
                      <span className="dashboard-link-btn__label">Company Website</span>
                      <span className="dashboard-link-btn__url">Visit Website</span>
                    </div>
                  </a>
                )}

                {userData.linkedInUrl && (
                  <a href={userData.linkedInUrl} target="_blank" rel="noopener noreferrer" className="dashboard-link-btn">
                    <div className="dashboard-link-btn__content">
                      <span className="dashboard-link-btn__label">LinkedIn</span>
                      <span className="dashboard-link-btn__url">View Profile</span>
                    </div>
                  </a>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RecruiterDashboard;