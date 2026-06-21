import React, { useEffect, useMemo, useState } from "react";
import "./ViewPostedJobs.css";

import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaClock,
    FaEye,
    FaUsers,
    FaTimes,
    FaExclamationTriangle,
} from "react-icons/fa";

import { toast } from "react-toastify";

const ViewPostedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [pageError, setPageError] = useState("");

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            setLoading(true);
            setPageError("");

            if (!userId) {
                throw new Error("User ID not found. Please login again.");
            }

            const token = localStorage.getItem("token");

            const postedJobsResponse = await fetch(
                `http://localhost:8080/api/recruiter/get/posted/jobs/${userId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!postedJobsResponse.ok) {
                throw new Error("Unable to fetch posted jobs.");
            }

            const postedJobs = await postedJobsResponse.json();

            if (!Array.isArray(postedJobs)) {
                throw new Error("Invalid jobs response.");
            }

            if (postedJobs.length === 0) {
                setJobs([]);
                return;
            }

            const jobRequests = postedJobs.map(async (item) => {
                try {
                    const response = await fetch(
                        `http://localhost:8080/api/jobs/${item.jobId}`,
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`Failed to load job ${item.jobId}`);
                    }

                    const data = await response.json();

                    return {
                        jobId: item.jobId,
                        ...data,
                    };
                } catch (error) {
                    console.error(error);
                    return null;
                }
            });

            const results = await Promise.allSettled(jobRequests);

            const validJobs = results
                .filter(
                    (result) =>
                        result.status === "fulfilled" && result.value !== null
                )
                .map((result) => result.value);

            setJobs(validJobs);

            if (validJobs.length !== postedJobs.length) {
                toast.warning(
                    "Some jobs could not be loaded."
                );
            }
        } catch (error) {
            console.error(error);

            setPageError(error.message);

            toast.error(
                error.message || "Failed to load jobs."
            );
        } finally {
            setLoading(false);
        }
    };

    const totalJobs = jobs.length;

    const activeJobs = useMemo(() => {
        return jobs.filter(
            (job) => job.status === "ACTIVE"
        ).length;
    }, [jobs]);

    const expiringSoon = useMemo(() => {
        return jobs.filter((job) => {
            if (!job.expiresAt) return false;

            const today = new Date();
            const expiry = new Date(job.expiresAt);

            const diff =
                (expiry - today) /
                (1000 * 60 * 60 * 24);

            return diff <= 7 && diff >= 0;
        }).length;
    }, [jobs]);

    const formatSalary = (salary) => {
        if (!salary) return "N/A";

        return new Intl.NumberFormat("en-IN").format(
            salary
        );
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "ACTIVE":
                return "active";

            case "CLOSED":
                return "closed";

            case "EXPIRED":
                return "expired";

            default:
                return "";
        }
    };

    if (loading) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-loading">
                    <div className="dashboard-spinner"></div>
                    <p>Loading posted jobs...</p>
                </div>
            </div>
        );
    }

    if (pageError) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-error">
                    <FaExclamationTriangle size={60} />

                    <h2>Unable to Load Jobs</h2>

                    <p>{pageError}</p>

                    <button
                        className="dashboard-btn dashboard-btn--primary"
                        onClick={loadJobs}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-main">
                <div className="dashboard-container">
                    {/* HEADER */}

                    <div className="posted-jobs-header">
                        <h1 className="posted-jobs-title">
                            Posted Jobs
                        </h1>

                        <p className="posted-jobs-subtitle">
                            Manage and track all jobs posted
                            by your company.
                        </p>
                    </div>

                    {/* STATS */}

                    <div className="jobs-stats">
                        <div className="jobs-stat-card">
                            <div className="jobs-stat-card__label">
                                Total Jobs
                            </div>

                            <div className="jobs-stat-card__value">
                                {totalJobs}
                            </div>
                        </div>

                        <div className="jobs-stat-card">
                            <div className="jobs-stat-card__label">
                                Active Jobs
                            </div>

                            <div className="jobs-stat-card__value">
                                {activeJobs}
                            </div>
                        </div>

                        <div className="jobs-stat-card">
                            <div className="jobs-stat-card__label">
                                Expiring Soon
                            </div>

                            <div className="jobs-stat-card__value">
                                {expiringSoon}
                            </div>
                        </div>
                    </div>

                    {/* EMPTY STATE */}

                    {jobs.length === 0 ? (
                        <div className="dashboard-card">
                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "40px 20px",
                                }}
                            >
                                <FaBriefcase
                                    size={50}
                                    style={{
                                        opacity: 0.4,
                                        marginBottom: "16px",
                                    }}
                                />

                                <h2
                                    style={{
                                        color: "var(--text)",
                                        marginBottom: "10px",
                                    }}
                                >
                                    No Jobs Posted Yet
                                </h2>

                                <p
                                    style={{
                                        color: "var(--text2)",
                                    }}
                                >
                                    Your posted jobs will appear
                                    here.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="jobs-grid">
                            {jobs.map((job, index) => (
                                <div
                                    key={job.jobId}
                                    className="job-card"
                                    style={{
                                        animationDelay: `${index * 0.08}s`,
                                    }}
                                >
                                    <div className="job-card__top">
                                        <div>
                                            <h3 className="job-card__title">
                                                {job.title}
                                            </h3>

                                            <div
                                                className={`job-status-badge ${getStatusClass(
                                                    job.status
                                                )}`}
                                            >
                                                {job.status}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="job-card__meta">
                                        <div className="job-chip">
                                            <FaMapMarkerAlt />
                                            {job.location}
                                        </div>

                                        <div className="job-chip">
                                            <FaClock />
                                            {job.jobType}
                                        </div>
                                    </div>

                                    <div className="job-card__salary">
                                        <FaMoneyBillWave />

                                        {job.currency}{" "}
                                        {formatSalary(
                                            job.minSalary
                                        )}{" "}
                                        -{" "}
                                        {formatSalary(
                                            job.maxSalary
                                        )}
                                    </div>

                                    <div className="job-card__experience">
                                        Experience:{" "}
                                        {job.experienceMin} -{" "}
                                        {job.experienceMax} Years
                                    </div>

                                    <p className="job-card__description">
                                        {job.Description}
                                    </p>

                                    <div className="job-card__footer">
                                        <button
                                            className="dashboard-btn dashboard-btn--primary"
                                            onClick={() =>
                                                setSelectedJob(job)
                                            }
                                        >
                                            <FaEye />
                                            View Details
                                        </button>

                                        <button
                                            className="dashboard-btn dashboard-btn--secondary"
                                            onClick={() =>
                                                toast.info(
                                                    "Applications page coming soon."
                                                )
                                            }
                                        >
                                            <FaUsers />
                                            Applications
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL */}

            {selectedJob && (
                <div
                    className="job-modal-overlay"
                    onClick={() =>
                        setSelectedJob(null)
                    }
                >
                    <div
                        className="job-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        <div className="job-modal__header">
                            <h2>{selectedJob.title}</h2>

                            <button
                                className="job-modal__close"
                                onClick={() =>
                                    setSelectedJob(null)
                                }
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="job-detail-grid">
                            <div className="job-detail-item">
                                <span>Location</span>
                                <strong>
                                    {selectedJob.location}
                                </strong>
                            </div>

                            <div className="job-detail-item">
                                <span>Job Type</span>
                                <strong>
                                    {selectedJob.jobType}
                                </strong>
                            </div>

                            <div className="job-detail-item">
                                <span>Experience</span>
                                <strong>
                                    {selectedJob.experienceMin} -{" "}
                                    {selectedJob.experienceMax} Years
                                </strong>
                            </div>

                            <div className="job-detail-item">
                                <span>Status</span>
                                <strong>
                                    {selectedJob.status}
                                </strong>
                            </div>

                            <div className="job-detail-item">
                                <span>Salary</span>
                                <strong>
                                    {selectedJob.currency}{" "}
                                    {formatSalary(
                                        selectedJob.minSalary
                                    )}{" "}
                                    -{" "}
                                    {formatSalary(
                                        selectedJob.maxSalary
                                    )}
                                </strong>
                            </div>

                            <div className="job-detail-item">
                                <span>Expires On</span>
                                <strong>
                                    {formatDate(
                                        selectedJob.expiresAt
                                    )}
                                </strong>
                            </div>

                            <div className="job-detail-item">
                                <span>Created On</span>
                                <strong>
                                    {formatDate(
                                        selectedJob.createdAt
                                    )}
                                </strong>
                            </div>

                            <div className="job-detail-item">
                                <span>Category ID</span>
                                <strong>
                                    {selectedJob.categoryId}
                                </strong>
                            </div>
                        </div>

                        <div className="job-description-section">
                            <h3>Job Description</h3>

                            <p>
                                {
                                    selectedJob.Description
                                }
                            </p>
                        </div>

                        <div className="job-modal-actions">
                            <button
                                className="dashboard-btn dashboard-btn--secondary"
                                onClick={() =>
                                    toast.info(
                                        "Applications page coming soon."
                                    )
                                }
                            >
                                <FaUsers />
                                View Applications
                            </button>

                            <button
                                className="dashboard-btn dashboard-btn--primary"
                                onClick={() =>
                                    setSelectedJob(null)
                                }
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewPostedJobs;