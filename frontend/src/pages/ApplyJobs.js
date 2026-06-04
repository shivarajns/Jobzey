import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ApplyJobs.css"
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

function Applyjob() {
    const { jobId } = useParams()
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobDetails()
    }, [jobId])

    // useEffect(() => {
    //     console.log(job)
    // }, [job])

    const fetchJobDetails = async () => {
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

        if (loading === true) {
            return (
                <h1>Loading job detail</h1>
            )
        }
    }

    const [userData, setUserData] = useState();
    const [userId, setUserId] = useState();
    const [resumeUrl, setResumeUrl] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        console.log(userData)
    }, [userData])

    const fetchUserProfile = async () => {

        try {
            const token = localStorage.getItem("token")
            if (!token) {
                navigate("/login")
                return;
            }


            const response = await fetch("http://localhost:8080/api/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            if (!response.ok) {
                setError("Response not ok")
                throw new Error("Failed to get User Details")
            }

            const data = await response.json();
            setUserData(data);
            setUserId(data.userId)
            setResumeUrl(data.resumeUrl)

            return data;
        } catch (error) {
            setError(error?.message)
        }
    }

    const ApplyButton = async () => {
        const profileData = await fetchUserProfile();

        if(!profileData){
            console.log("Profile cannot be fetched")
            return;
        }

        try {
            const token = localStorage.getItem("token")

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch("http://localhost:8080/api/job/apply", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        jobId: jobId,
                        jobseekerId: profileData.userId,
                        resumeURL: profileData.resumeUrl,
                        currentStatus: "APPLIED"
                    }
                )
            })

            const data = await response.json()
            console.log(data?.message)

            if(data?.message === "Applied Successfully"){
                toast.success(data?.message);
            } else {
                toast.warning(data?.message);
            }

        } catch (error) {
            console.error(error)
            toast.error("Something Went Wrong, Please Try Again Later.")
            setError("Something went wrong")
        }


    }

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
                    <p>{error}</p>
                    <button onClick={function () { navigate("/login"); }} className="dashboard-btn dashboard-btn--primary">
                        Back to Login
                    </button>
                </div>
            </div>
        );
    } // abcd


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

            <div className="applyjob-description-section" style={{"whiteSpace" : "pre-line"}}>
                <h2>Description</h2>
                <p>{job?.Description}</p>
            </div>

            <div className="applyjob-details">

                <div className="applyjob-item">
                    <span>Job Type</span>
                    <p>{job?.jobType?.replace("_", " ")}</p>
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

                    <p>{job?.expiresAt != null ? job?.expiresAt?.split("T", " ") : "Not Disclosed"}</p>
                    {/* <p>{job?.expiresAt?.split("T")[0]}</p> */}
                </div>

            </div>

            <div className="applyjob-action">
                <button className="applyjob-btn"
                    onClick={() => {
                        ApplyButton()
                    }}
                >Apply Now</button>
            </div>

        </div>
    );
}

export default Applyjob;