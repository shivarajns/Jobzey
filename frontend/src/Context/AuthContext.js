import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../Firebase/FirebaseConfig";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(function () {
        const unsubscribe = onAuthStateChanged(auth, function (user) {
            setCurrentUser(user);
            
            if (user) {
                // Get role from localStorage (stored during signup/login)
                const storedRole = localStorage.getItem('userRole');
                const storedUserData = localStorage.getItem('userData');
                
                if (storedRole) {
                    setUserRole(storedRole);
                }
                
                if (storedUserData) {
                    try {
                        setUserData(JSON.parse(storedUserData));
                    } catch (e) {
                        console.error("Error parsing user data:", e);
                    }
                }
            } else {
                // User logged out - clear everything
                setUserRole(null);
                setUserData(null);
                localStorage.removeItem('userRole');
                localStorage.removeItem('userData');
            }
            
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Function to get dashboard path based on role
    const getDashboardPath = function() {
        if (!userRole) {
            return '/login';
        }
        
        if (userRole === 'jobseeker') {
            return '/jobseeker/dashboard';
        } else if (userRole === 'recruiter') {
            return '/recruiter/dashboard';
        }
        
        return '/home';
    };

    return (
        <AuthContext.Provider value={{ 
            currentUser, 
            userRole, 
            userData, 
            loading,
            getDashboardPath  // ✅ Now available!
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

function useAuth(){
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { useAuth };
export default AuthProvider;