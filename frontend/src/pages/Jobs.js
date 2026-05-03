import React from "react";
import "../pages/Jobs.css"
import { useState } from "react";

function Jobs(){

    const[numOfJobs, setNumOfJobs] = useState(10);


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

        </div>
    )
}

export default Jobs