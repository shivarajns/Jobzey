import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./JobseekerEditProfile.css";

function RecruiterEditProfile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        jobTitle: "",
        companyName: "",
        companyWebsite: "",
        companySize: "",
        industry: "",
        companyDescription: "",
        expYears: "",
        linkedInUrl: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        const token = localStorage.getItem("token");

        const res = await fetch("https://jobzey.onrender.com/api/dashboard", {
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        setFormData({
            username: data.username || "",
            email: data.email || "",
            phone: data.phone || "",
            jobTitle: data.jobTitle || "",
            companyName: data.companyName || "",
            companyWebsite: data.companyWebsite || "",
            companySize: data.companySize || "",
            industry: data.industry || "",
            companyDescription: data.companyDescription || "",
            expYears: data.experience || "",
            linkedInUrl: data.linkedInUrl || ""
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const payload = {
            ...formData
        };

        await fetch("https://jobzey.onrender.com/api/dashboard/edit/recruiter", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        navigate("/recruiter/dashboard");
    }

    return (
        <div className="edit-page">
            <div className="dashboard-bg">
                <div className="dashboard-bg__orb dashboard-bg__orb--1"></div>
                <div className="dashboard-bg__orb dashboard-bg__orb--2"></div>
                <div className="dashboard-bg__orb dashboard-bg__orb--3"></div>
                <div className="dashboard-bg__grid"></div>
            </div>

            <div className="edit-container">
                <h1>Edit Recruiter Profile</h1>

                <form onSubmit={handleSubmit}>

                    {/* Basic Info */}
                    <div className="edit-card">
                        <h2>Basic Info</h2>

                        <div className="grid-2">
                            <input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Your Name"
                            />
                            <input value={formData.email} readOnly />
                        </div>

                        <div className="grid-2">
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                            />
                            <input
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                placeholder="Job Title"
                            />
                        </div>
                    </div>

                    {/* Company Info */}
                    <div className="edit-card">
                        <h2>Company Info</h2>

                        <div className="grid-2">
                            <input
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Company Name"
                            />
                            <input
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                placeholder="Industry"
                            />
                        </div>

                        <div className="grid-2">
                            <select
                                name="companySize"
                                value={formData.companySize}
                                onChange={handleChange}
                            >
                                <option value="">Select Company Size</option>
                                <option value="SIZE_1_10">1 - 10 employees</option>
                                <option value="SIZE_11_50">11 - 50 employees</option>
                                <option value="SIZE_51_200">51 - 200 employees</option>
                                <option value="SIZE_201_500">201 - 500 employees</option>
                                <option value="SIZE_500_PLUS">500+ employees</option>
                            </select>
                            <select
                                name="expYears"
                                value={formData.expYears}
                                onChange={handleChange}
                            >
                                <option value="">Select Experience</option>
                                {[...Array(21).keys()].map((year) => (
                                    <option key={year} value={year}>
                                        {year} {year === 1 ? "year" : "years"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <textarea
                            name="companyDescription"
                            value={formData.companyDescription}
                            onChange={handleChange}
                            placeholder="Company Description"
                        />
                    </div>

                    {/* Links */}
                    <div className="edit-card">
                        <h2>Links</h2>

                        <div className="grid-2">
                            <input
                                name="companyWebsite"
                                value={formData.companyWebsite}
                                onChange={handleChange}
                                placeholder="Company Website"
                            />
                            <input
                                name="linkedInUrl"
                                value={formData.linkedInUrl}
                                onChange={handleChange}
                                placeholder="LinkedIn URL"
                            />
                        </div>
                    </div>

                    {/* Sticky Save */}
                    <div className="sticky-bar">
                        <button className="save-btn">Save Changes</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default RecruiterEditProfile;