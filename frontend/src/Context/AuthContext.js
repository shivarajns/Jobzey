import { onAuthStateChanged } from "firebase/auth";
import auth from "../Firebase/FirebaseConfig";
import { useContext, useEffect, useState } from "react";

const AuthContext = useContext

function authProvider({ children }) {
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
export default authProvider