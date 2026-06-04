import React from "react";
import "../pages/JobsSection.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function JobSection() {
    const [jobData, setJobData] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate('/jobs')

    useEffect(() => {
        fetchSuggestedSkill();
    }, [])

    // useEffect(() => {
    //     console.log(jobData)
    // }, [jobData])

    const fetchSuggestedSkill = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:8080/api/jobs/get/suggested", {
                method: "GET"
            })
            const data = await response.json()
            setJobData(data);
        } catch (error) {
            setError("Some thing went wrong")
            console.error(error)
        }
    }


    return (
        <>
            {jobData && jobData.length > 0 && (
                <div className="home-job-section" id="jobs">

                    {/* Header */}
                    <div className="job-header">
                        <h2>Suggested Jobs</h2>
                        <Link
                            className="view-more-btn"
                            to="/jobs"
                            style={{"textDecoration":"none"}}
                        >
                            View More →
                        </Link>
                    </div>

                    {/* Slider */}
                    <div className="job-slider">
                        {jobData.map((job) => (
                            <div className="job-card" key={job.id}>

                                <div className="job-top">
                                    <h3>{job.title}</h3>
                                    <span className="job-status">{job.status}</span>
                                </div>

                                <p className="job-desc">
                                    {job.description.substring(0, 90)}...
                                </p>

                                <div className="job-details">
                                    <span>💰 {job.minSalary / 100000} - {job.maxSalary / 100000} LPA</span>
                                    <span>🧑‍💻 {job.minExp} - {job.maxExp} yrs</span>
                                </div>

                                {/* <div className="job-footer">
                                    <button className="apply-btn" onClick={()=> console.log("clicked")}>
                                        Apply Now
                                    </button>
                                </div> */}

                            </div>
                        ))}
                    </div>

                </div>
            )}
        </>
    );
}

export default JobSection