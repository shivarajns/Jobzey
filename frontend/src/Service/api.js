import auth from "../Firebase/FirebaseConfig"
import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:8080",
})

API.interceptors.request.use(async function (config) {
    const user = auth.currentUser

    if (config.url && config.url.includes("/api/auth")) {
        return config;
    }
    
    if(user){
        const token = await user.getIdToken(true);
        config.headers.Authorization = `Bearer ${token}`
    } 
    
    return config
})

export default API