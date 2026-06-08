import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../Firebase/FirebaseConfig";
import { signOut } from "firebase/auth";
import "./JobseekerDashboard.css";
import { toast } from "react-toastify";

function JobseekerDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [userSkill, setuserSkill] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(function () {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userData?.userId) {
      fetchUserSkill(userData.userId);
    }
    localStorage.setItem("userId", userData?.userId)
  }, [userData])

  // useEffect(() => {
  //   console.log(userSkill);
  // }, [userSkill])

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

  const fetchUserSkill = async (userId) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:8080/api/dashboard/skills/get?userId=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json();
      setuserSkill(data);

    }
    catch (e) {
      console.log(e);
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

  async function handleResumeUpload() {
    if (!resumeFile) {
      toast.warn("Select Resume to Upload")
      return;
    }

    try {
      setUploading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("userId", userData.userId);
      formData.append("file", resumeFile);

      const response = await fetch(
        "http://localhost:8080/upload/resume",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      await fetchUserProfile();

      setResumeFile(null);

      toast.success("Resume uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Resume upload failed")
    } finally {
      setUploading(false);
    }
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button onClick={function () { navigate("/login"); }} className="dashboard-btn dashboard-btn--primary">
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
      {/* <header className="dashboard-header">
        <div className="dashboard-header__container">
          <div className="dashboard-brand">
            <div className="dashboard-brand__icon">J</div>
            <span className="dashboard-brand__name">Jobzey</span>
          </div>

          <div className="dashboard-header__actions">
            <button onClick={handleEdit} className="dashboard-btn dashboard-btn--secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Profile
            </button>
            <button onClick={handleLogout} className="dashboard-btn dashboard-btn--logout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header> */}

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
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
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
            <div className="dashboard-profile-actions">
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

          {/* Bio Section */}
          {userData.bio && (
            <div className="dashboard-card dashboard-card--bio">
              <h2 className="dashboard-card__title">About</h2>
              <p className="dashboard-bio-text" style={{ "whiteSpace": "pre-line" }}>{userData.bio} </p>
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
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
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
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
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
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="dashboard-info-item__content">
                    <span className="dashboard-info-item__label">Gender</span>
                    <span className="dashboard-info-item__value" style={{ textTransform: "capitalize" }}>{userData.gender}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="dashboard-card">
              <h2 className="dashboard-card__title">Skills</h2>

              <div className="skill-containers">
                {Array.isArray(userSkill?.skills) && userSkill.skills.length > 0 ? (
                  userSkill.skills.map((skill) => (
                    <div key={skill.skillId}>
                      <h2 style={{ "fontSize": "20px" }}>{skill.skillName}</h2>
                      <p
                        className={`skill-level ${skill.skillLevel?.toLowerCase().includes("beginner")
                          ? "beginner"
                          : skill.skillLevel?.toLowerCase().includes("intermediate")
                            ? "intermediate"
                            : skill.skillLevel?.toLowerCase().includes("advanced")
                              ? "advanced"
                              : ""
                          }`}
                      >
                        {skill.skillLevel}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="skills-empty">
                    <p>No skills added yet</p>
                  </div>
                )}
              </div>
            </div>


            {/* Links & Resources */}
            {/* Resume & Portfolio */}
            <div className="dashboard-card dashboard-card--full">
              <h2 className="dashboard-card__title">Resume & Portfolio</h2>

              <div className="resume-section">

                <div className="resume-upload-card">
                  <div className="resume-upload-card__header">
                    <div>
                      <h3>Resume</h3>
                      <p>Upload your latest resume for recruiters.</p>
                    </div>
                  </div>

                  <div className="resume-upload-body">

                    {userData.resumeFileName ? (
                      <div className="resume-current-file">
                        <div>
                          <span className="resume-current-file__label">
                            Current Resume
                          </span>

                          <h4>{userData.resumeFileName}</h4>
                        </div>

                        <a
                          href={userData.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="resume-view-btn"
                        >
                          View Resume
                        </a>
                      </div>
                    ) : (
                      <p className="resume-empty">
                        No resume uploaded yet
                      </p>
                    )}

                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeFile(e.target.files[0])}
                      hidden
                    />

                    <label
                      htmlFor="resume-upload"
                      className="resume-upload-zone"
                    >
                      <span>
                        {resumeFile
                          ? resumeFile.name
                          : "Choose Resume"}
                      </span>
                    </label>

                    <button
                      className="dashboard-btn dashboard-btn--primary"
                      onClick={handleResumeUpload}
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Upload Resume"}
                    </button>
                  </div>
                </div>

                {userData.portfolioUrl && (
                  <div className="portfolio-card">
                    <h3>Portfolio</h3>

                    <p>
                      Showcase your projects and professional work.
                    </p>

                    <a
                      href={userData.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="portfolio-link"
                    >
                      Visit Portfolio →
                    </a>
                  </div>
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
