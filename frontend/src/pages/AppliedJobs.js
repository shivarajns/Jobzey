import { reauthenticateWithCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AppliedJobs.css"

function AppliedJobs() {

    const navigate = useNavigate();
    const [appliedJobs, setAppliedJobs] = useState([]);
    const userId = localStorage.getItem("userId");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(true);

    async function fetchAppliedJobs() {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/api/jobseeker/applied/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!response) {
                throw new Error(`HTTP Error: ${response.status}`);
                toast.error("Something went wrong")
                return;
            }
            const data = await response?.json();
            setAppliedJobs(data);
            setLoading(false);
        } catch (error) {
            setError(true)
            setMessage("Please Login Again")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAppliedJobs()
    }, [])

    useEffect(() => {
        console.log(appliedJobs)
    }, [appliedJobs])

    if (error) {
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
                    <p>{message}</p>
                    <button onClick={function () { navigate("/login"); }} className="dashboard-btn dashboard-btn--primary">
                        Back to Login
                    </button>
                </div>
            </div>
        );
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

    return (
        <div className="applied-jobs-page">
            <div className="applied-bg">
                <div className="applied-orb orb-1"></div>
                <div className="applied-orb orb-2"></div>
                <div className="applied-orb orb-3"></div>
            </div>

            <div className="applied-container">
                <div className="applied-header">
                    <h1>Applied Jobs</h1>
                    <p>Track and manage all your job applications.</p>
                </div>

                <div className="applied-stats">
                    <div className="stat-card">
                        <h2>{appliedJobs.length}</h2>
                        <span>Total Applications</span>
                    </div>

                    <div className="stat-card">
                        <h2>
                            {
                                appliedJobs.filter(
                                    (job) =>
                                        job.status?.toLowerCase() === "reviewing"
                                ).length
                            }
                        </h2>
                        <span>Under Review</span>
                    </div>

                    <div className="stat-card">
                        <h2>
                            {
                                appliedJobs.filter(
                                    (job) =>
                                        job.status?.toLowerCase() === "shortlisted"
                                ).length
                            }
                        </h2>
                        <span>Shortlisted</span>
                    </div>
                </div>

                {appliedJobs.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📄</div>

                        <h2>No Applications Yet</h2>

                        <p>
                            You haven't applied for any jobs yet.
                            Start exploring opportunities and build
                            your career.
                        </p>

                        <button
                            className="browse-btn"
                            onClick={() => navigate("/jobs")}
                        >
                            Browse Jobs
                        </button>
                    </div>
                ) : (
                    <div className="applied-jobs-grid">
                        {appliedJobs.map((job) => (
                            <div
                                className="applied-job-card"
                                key={job.id}
                            >
                                <div className="card-top">
                                    <div className="card-title-section">
                                        <h2>{job.jobTitle}</h2>

                                        <p className="job-id">
                                            Job ID: #{job.jobId}
                                        </p>
                                    </div>

                                    <span className="application-badge">
                                        Applied
                                    </span>
                                </div>

                                <div className="card-divider"></div>

                                <div className="card-bottom">
                                    <div className="date-section">
                                        <span className="label">
                                            Applied On
                                        </span>

                                        <p>
                                            {new Date(
                                                job.appliedAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <button
                                        className="view-job-btn"
                                        onClick={() =>
                                            navigate(`/apply/${job.jobId}`)
                                        }
                                    >
                                        View Job
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AppliedJobs