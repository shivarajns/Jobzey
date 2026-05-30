import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
                headers : {
                    Authorization: `Bearer ${token}`
                }
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

    
    return(
        <>
            <h1>{job.title}</h1>
            <p>{job.Description}</p>            
        </>
    )
}

export default Applyjob;