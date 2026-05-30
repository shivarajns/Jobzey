import React, { useEffect } from "react";
import "../pages/Jobs.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Jobs() {

    const [numOfJobs, setNumOfJobs] = useState(0);
    const [jobData, setJobData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        fetchJobData();
    }, [])

    useEffect(() => {
        console.log(jobData)
    }, [jobData])

    const fetchJobData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/jobs/get", {
                method: "GET",
            })
            const data = await response.json();
            setJobData(data);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }


        if (loading) {
            return (
                <div className="loading-screen">
                    <p>Loading Jobs</p>
                </div>
            )
        }
    }


    return (
        <div className="jobs-main-cont">

            {/* Search Bar */}
            <div className="jobs-search-bar-cnt">
                <input type="Text" placeholder="Search Using Title, Catageory, Location..."
                    className="job-search-bar"
                ></input>
                <button className="jobs-search-button">Search</button>
            </div>

            {/* <p 
                style={{"fontSize":"0.5rem",
                    "textAlign":"center",
                    "color":"gray",
                    "textDecoration":"underline"
                }}
            >"{numOfJobs} Search Result Appeared"</p> */}

            {/* Job Cards */}
            <div className="jobs-container">
                {jobData && jobData.map((job) => (
                    <div className="job-card-wide" key={job.id}>

                        <div className="job-left">
                            <div className="job-card-header">
                                <h2 className="job-title">{job.title}</h2>
                                <span className={`job-status ${job.status.toLowerCase()}`}>
                                    {job.status}
                                </span>
                            </div>

                            <p className="job-description">{job.description}</p>

                            <div className="job-details">
                                <span>💼 {job.jobType.replace("_", " ")}</span>
                                <span>📅 {job.minExp} - {job.maxExp} yrs</span>
                                {/* <span>📂 Category: {job.categoryId}</span> */}
                            </div>
                        </div>

                        <div className="job-right">
                            <div className="job-salary">
                                ₹ {job.minSalary.toLocaleString()} - ₹ {job.maxSalary.toLocaleString()}
                            </div>

                            <button className="apply-btn"
                                onClick={()=> navigate(`/apply/${job.id}`)}
                            >Apply Now</button>

                            <span className="posted-date">
                                {new Date(job.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Jobs