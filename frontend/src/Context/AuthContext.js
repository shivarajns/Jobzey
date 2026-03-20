import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../Firebase/FirebaseConfig";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(function () {
        const unsubscribe = onAuthStateChanged(auth, function (user) {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

function useAuth(){
    return useContext(AuthContext)
}

export {useAuth}
export default AuthProvider