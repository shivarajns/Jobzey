import React, { useEffect, useState } from "react";
import "../pages/JobsSection.css";
import { Link } from "react-router-dom";

function JobSection() {
    const [jobData, setJobData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSuggestedSkill();
    }, []);

    const fetchSuggestedSkill = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch("https://jobzey.onrender.com/api/jobs/get/suggested", {
                method: "GET",
            });
            const data = await response.json();
            setJobData(data);
        } catch (error) {
            setError("Something went wrong while loading suggested jobs.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const formatSalary = (value) => {
        if (!value && value !== 0) return "Salary on request";
        return `${(value / 100000).toFixed(1)} LPA`;
    };

    const formatJobType = (value) =>
        value ? value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "Full Time";

    const getInitials = (title = "Job") =>
        title
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

    return (
        <section className="home-job-section" id="jobs">
            <div className="job-glow job-glow--one" />
            <div className="job-glow job-glow--two" />

            <div className="job-header-row">
                <div className="job-header-copy">
                    <p className="job-eyebrow">Personalized recommendations</p>
                    <h2>Suggested Jobs</h2>
                    <p className="job-subtitle">
                        Hand-picked opportunities matched to your profile, experience, and preferred work style.
                    </p>
                </div>

                <Link className="view-more-btn" to="/jobs">
                    Explore all jobs <span aria-hidden="true">→</span>
                </Link>
            </div>

            {loading ? (
                <div className="job-grid" aria-label="Loading suggested jobs">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <article className="job-card job-card--skeleton" key={`skeleton-${index}`}>
                            <div className="job-card-skeleton-line job-card-skeleton-line--title" />
                            <div className="job-card-skeleton-line job-card-skeleton-line--text" />
                            <div className="job-card-skeleton-line job-card-skeleton-line--text short" />
                            <div className="job-card-skeleton-line job-card-skeleton-line--chip" />
                        </article>
                    ))}
                </div>
            ) : error ? (
                <div className="job-empty-state" role="status">
                    <h3>We could not load suggestions right now.</h3>
                    <p>{error}</p>
                </div>
            ) : jobData.length === 0 ? (
                <div className="job-empty-state" role="status">
                    <h3>No suggested jobs available yet.</h3>
                    <p>Check back soon for fresh opportunities tailored to your profile.</p>
                </div>
            ) : (
                <div className="job-grid">
                    {jobData.map((job, index) => {
                        const descriptionText = typeof job.description === "string" ? job.description : "";

                        return (
                        <article className="job-card" key={job.id || `${job.title}-${index}`} style={{ animationDelay: `${index * 80}ms` }}>
                            <div className="job-card__top">
                                <div className="job-avatar" aria-hidden="true">{getInitials(job.title)}</div>
                                <span className="job-status">{job.status || "Open"}</span>
                            </div>

                            <div className="job-card__body">
                                <p className="job-company">{job.companyName || "Talent Hub"}</p>
                                <h3>{job.title}</h3>
                                <p className="job-desc">{descriptionText.substring(0, 110)}{descriptionText.length > 110 ? "..." : ""}</p>
                            </div>

                            <div className="job-meta-grid">
                                <span className="job-meta-pill">📍 {job.location || "Remote"}</span>
                                <span className="job-meta-pill">💰 {formatSalary(job.minSalary)} - {formatSalary(job.maxSalary)}</span>
                                <span className="job-meta-pill">🧑‍💻 {job.minExp} - {job.maxExp} yrs</span>
                                <span className="job-meta-pill">🗂️ {formatJobType(job.jobType)}</span>
                            </div>

                            {job.skills && job.skills.length > 0 && (
                                <div className="job-chip-row">
                                    {job.skills.slice(0, 3).map((skill, chipIndex) => (
                                        <span className="job-chip" key={`${job.id || job.title}-skill-${chipIndex}`}>{skill}</span>
                                    ))}
                                </div>
                            )}

                            <div className="job-card__footer">
                                <Link className="job-link-btn" to="/jobs">
                                    View details
                                </Link>
                            </div>
                        </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default JobSection