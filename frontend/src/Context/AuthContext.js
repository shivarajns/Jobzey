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
                let role = 'jobseeker';
                const storedRole = localStorage.getItem('userRole');
                
                if (storedRole) {
                    role = storedRole;
                } else if (user.photoURL) {
                    try {
                        const profileData = JSON.parse(user.photoURL);
                        if (profileData.role === 'recruiter') {
                            role = 'recruiter';
                        }
                    } catch (e) {
                        role = 'jobseeker';
                    }
                }
                
                setUserRole(role);
                
                localStorage.setItem('userRole', role);
                localStorage.setItem('userData', JSON.stringify({
                    email: user.email,
                    uid: user.uid,
                    role: role
                }));
            } else {
                
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
            getDashboardPath 
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