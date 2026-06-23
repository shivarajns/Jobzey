import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./JobseekerEditProfile.css";

function JobseekerEditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    bio: "",
    dob: "",
    gender: "",
    location: "",
    portfolioUrl: "",
    resumeUrl: "",
    // currDesignation: "",
    // currCompany: "",
    // expYear: "",
    // interestedDomain: [],
    openToWork: "true",
    email: ""
  });

  // const [newDomain, setNewDomain] = useState("");

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
      phone: data.phone || "",
      bio: data.bio || "",
      dob: data.dob || "",
      gender: data.gender || "",
      location: data.location || "",
      portfolioUrl: data.portfolioUrl || "",
      resumeUrl: data.resumeUrl || "",
      // currDesignation: data.currentDesi || "",
      // currCompany: data.currentCompany || "",
      // expYear: data.expYears || "",
      // interestedDomain: data.interestedDomains
      //   ? data.interestedDomains.split(",")
      //   : [],
      openToWork: data.isOpenToWork || "false",
      email: data.email || ""
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // function addDomain() {
  //   const val = newDomain.trim();
  //   if (val && !formData.interestedDomain.includes(val)) {
  //     setFormData({
  //       ...formData,
  //       interestedDomain: [...formData.interestedDomain, val]
  //     });
  //     setNewDomain("");
  //   }
  // }

  // function removeDomain(d) {
  //   setFormData({
  //     ...formData,
  //     interestedDomain: formData.interestedDomain.filter(x => x !== d)
  //   });
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const payload = {
      ...formData,
      // interestedDomain: formData.interestedDomain.join(","),
      openToWork: formData.openToWork === "true"
    };

    await fetch("https://jobzey.onrender.com/api/dashboard/edit/jobseeker", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    navigate("/jobseeker/dashboard");
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
        <h1>Edit Profile</h1>

        <form onSubmit={handleSubmit}>

          {/* Personal */}
          <div className="edit-card">
            <h2>Personal Info</h2>

            <div className="grid-2">
              <input name="username" value={formData.username} onChange={handleChange} placeholder="Full Name" />
              <input value={formData.email} readOnly />
            </div>

            <div className="grid-2">
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            </div>

            <div className="grid-2">
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>

              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
            </div>

            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
          </div>

          {/* Professional */}
          {/* <div className="edit-card">
            <h2>Professional Info</h2>

            <div className="grid-2">
              <input name="currDesignation" value={formData.currDesignation} onChange={handleChange} placeholder="Designation" />
              <input name="currCompany" value={formData.currCompany} onChange={handleChange} placeholder="Company" />
            </div>

            <div className="grid-2">
              <select name="expYear" value={formData.expYear} onChange={handleChange}>
                <option value="">Experience</option>
                {[...Array(21).keys()].map(i => (
                  <option key={i} value={i}>{i} years</option>
                ))}
              </select>

              <select name="openToWork" value={formData.openToWork} onChange={handleChange}>
                <option value="true">Open to Work</option>
                <option value="false">Not Open</option>
              </select>
            </div> */}

            {/* Improved Tag Input */}
            {/* <div className="tag-container">
              <div className="tag-input-wrapper">
                {formData.interestedDomain.map((d, i) => (
                  <span key={i} className="tag">
                    {d}
                    <button type="button" onClick={() => removeDomain(d)}>×</button>
                  </span>
                ))}

                <input
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="Add domain..."
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDomain())}
                />
              </div>
            </div>
          </div> */}

          {/* Links */}
          <div className="edit-card">
            <h2>Links</h2>

            <div className="grid-2">
              <input name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} placeholder="Portfolio URL" />
              <input name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} placeholder="Resume URL" />
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

export default JobseekerEditProfile;