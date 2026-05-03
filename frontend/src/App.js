import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import RecruiterSignup from "./pages/RecruiterSignup";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import JobseekerDashboard from "./pages/JobseekerDashboard";
import JobseekerEditProfile from "./pages/JobseekerEditProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecruiterEditProfile from "./pages/RecruiterEditProfile"
import Jobs from "./pages/Jobs";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/recruiter-signup" element={<RecruiterSignup />} />
          
          {/* JobSeeker Dashboard */}
          <Route
            path="/jobseeker/dashboard"
            element={
              <ProtectedRoute>
                <JobseekerDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Recruiter Dashboard */}
          <Route
            path="/recruiter/dashboard"
            element={
              <ProtectedRoute>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobseeker/edit-profile"
            element={
              <ProtectedRoute>
                <JobseekerEditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter/edit-profile"
            element={
              <ProtectedRoute>
                <RecruiterEditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs/>
              </ProtectedRoute>
            }
          />
        
          
          {/* Old dashboard route - redirect based on role */}
          <Route path="/dashboard" element={<Navigate to="/home" replace />} />
          
          
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
    </AuthProvider>
  );
}

export default App;