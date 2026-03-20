import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail/>} />
          <Route path="/dashboard" element={<h2 style={{padding:"2rem"}}>✅ Logged in! Dashboard</h2>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;