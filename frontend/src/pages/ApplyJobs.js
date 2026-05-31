import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ApplyJobs.css"

function Applyjob(){
    const {jobId} = useParams()
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token")

    useEffect(()=> {
    fetchJobDetails()
    }, [jobId])

    useEffect(()=>{
        console.log(job)
    }, [job])

    const fetchJobDetails = async ()=> {
        try {
            const response = await fetch(`http://localhost:8080/api/jobs/${jobId}`, {
                method: "GET",
            })
            const data = await response.json();
            setJob(data);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

        if(loading === true){
            return(
                <h1>Loading job detail</h1>
            )
        }
    }

    
 return (
    <div className="applyjob-page">

        <div className="applyjob-header">
            <div>
                <h1 className="applyjob-title">{job?.title}</h1>
                <p className="applyjob-location">{job?.location}</p>
            </div>

            <div className={`applyjob-status ${job?.status?.toLowerCase()}`}>
                {job?.status}
            </div>
        </div>

        <div className="applyjob-description-section">
            <h2>Description</h2>
            <p>{job?.Description}</p>
        </div>

        <div className="applyjob-details">

            <div className="applyjob-item">
                <span>Job Type</span>
                <p>{job?.jobType.replace("_", " ")}</p>
            </div>

            <div className="applyjob-item">
                <span>Experience</span>
                <p>{job?.experienceMin} - {job?.experienceMax} Years</p>
            </div>

            <div className="applyjob-item">
                <span>Salary</span>
                <p>₹{job?.minSalary} - ₹{job?.maxSalary}</p>
            </div>

            <div className="applyjob-item">
                <span>Currency</span>
                <p>{job?.currency}</p>
            </div>

            <div className="applyjob-item">
                <span>Expires At</span>
                <p>{job?.expiresAt.split("T")[0]}</p>
            </div>

        </div>

        <div className="applyjob-action">
            <button className="applyjob-btn"
            
            >Apply Now</button>
        </div>

    </div>
);
}

export default Applyjob;