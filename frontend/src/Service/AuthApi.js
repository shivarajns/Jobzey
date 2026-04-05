import API from "./api";

async function registerJobseeker(firebaseUid, email, username, phone, fullName) {
    const response = await API.post("/api/auth/register/jobseeker", {
        firebaseUid,
        email,
    })

    return response.data;
}

async function registerRecruiter(firebaseUid,
    email,
    username,
    phone,
    fullName,
    jobTitle,
    companyName,
    companyWebsite,
    experienceYears
) {
    const response = await API.post("/api/auth/register/recruiter", {
        firebaseUid,
        email,
        username,
        phone: phone || "",
        fullName: fullName || "",
        jobTitle: jobTitle || "",
        companyName: companyName || "",
        companyWebsite: companyWebsite || "",
        experienceYears: experienceYears || "",
    });
    return response.data;
}

export {registerJobseeker, registerRecruiter}