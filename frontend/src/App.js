import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Home from  "./pages/Home.js"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail/>} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;