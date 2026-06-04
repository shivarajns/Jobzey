import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import "./JobPost.css"

function JobPost() {

    const userId = localStorage.getItem("userId");

    const [form, setForm] = useState({
        userId: userId,
        title: "",
        description: "",
        minSalary: "",
        maxSalary: "",
        currencyType: "",
        jobType: "",
        minExp: "",
        maxExp: "",
        location: "",
        categoryId: "",
        "status": "ACTIVE"
    })
    const [jobCat, setJobCat] = useState([])

    // useEffect(()=>{
    //     console.log(form)
    // }, [form])

    function handleChange(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    async function fetchJobCategories() {

        try {
            const response = await fetch("http://localhost:8080/api/jobs/categories", {
                method: "GET"
            })

            const data = await response.json()
            setJobCat(data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchJobCategories();
    }, [])

    // useEffect(()=>{
    //     console.log(jobCat)
    // }, [jobCat])

    //On Submit Function
    const [message, setMessage] = useState("")
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const token = localStorage.getItem("token");
            const payload = {
                ...form
            }

            const response = await fetch("http://localhost:8080/recruiter/job/create", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            const message = await response.json();
            toast.success(message?.message);
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }

    useEffect(() => {
        console.log("Message: " + message)
    }, [message])

    return (
        <div className="job-post">
            <div className="job-post__container">
                <h1 className="job-post__title">Create a Job Oppurtunity</h1>

                <form className="job-post__form" onSubmit={handleSubmit}>
                    <input
                        className="job-post__input"
                        type="text"
                        placeholder="Enter Job Title"
                        onChange={handleChange}
                        name="title"
                        required
                    />

                    <textarea
                        className="job-post__textarea"
                        placeholder="Enter detail information about the company, Job Description...."
                        onChange={handleChange}
                        name="description"
                        required
                    ></textarea>

                    <div className="job-post__row">
                        <input
                            className="job-post__input"
                            type="number"
                            placeholder="Minimum Salary"
                            onChange={handleChange}
                            name="minSalary"
                        />

                        <input
                            className="job-post__input"
                            type="number"
                            placeholder="Maximun Salary"
                            onChange={handleChange}
                            name="maxSalary"
                        />
                    </div>

                    <input
                        className="job-post__input"
                        type="text"
                        placeholder="Currency Type (INR, $)"
                        onChange={handleChange}
                        name="currencyType"
                    />

                    <select
                        className="job-post__select"
                        name="jobType"
                        onChange={handleChange}
                        required
                    >
                        <option>Select Job Type</option>
                        <option value="FULL_TIME">Full time</option>
                        <option value="PART_TIME">Part time</option>
                        <option value="CONTRACT">Contract</option>
                        <option value="INTERNSHIP">Internship</option>
                        <option value="REMOTE">Remote</option>
                    </select>

                    <div className="job-post__row">
                        <input
                            className="job-post__input"
                            type="number"
                            placeholder="Enter Minimum Year of Experience"
                            onChange={handleChange}
                            name="minExp"
                            required
                        />

                        <input
                            className="job-post__input"
                            type="number"
                            placeholder="Enter Maximum Year of Experience"
                            onChange={handleChange}
                            name="maxExp"
                            required
                        />
                    </div>

                    <input
                        className="job-post__input"
                        type="location"
                        placeholder="Enter Job Location"
                        onChange={handleChange}
                        name="location"
                        required
                    />

                    <select
                        className="job-post__select"
                        name="categoryId"
                        onChange={handleChange}
                        required
                    >
                        <option>Select Job Category</option>
                        {jobCat.map((job) => (
                            <option key={job?.id} value={job?.id}>
                                {job?.categoryName}
                            </option>
                        ))}
                    </select>

                    <select
                        className="job-post__select"
                        name="status"
                        onChange={handleChange}
                        required
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="DRAFT">Draft</option>
                        <option value="CLOSED">Closed</option>
                    </select>

                    <button className="job-post__button">Post Job</button>
                </form>
            </div>
        </div>
    );
}

export default JobPost