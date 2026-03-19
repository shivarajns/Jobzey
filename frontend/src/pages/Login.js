import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../Firebase/FirebaseConfig";
import { Link } from "react-router-dom";


function getErrorMessage(code) {
    switch (code) {
    case "auth/user-not-found": return "No account found with this email.";
    case "auth/wrong-password": return "Incorrect password.";
    case "auth/invalid-credential": return "Invalid email or password.";
    case "auth/too-many-requests": return "Too many attempts. Try again later.";
    default: return "Something went wrong. Please try again.";
  }
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e)=> {
        e.preventDefault();
        setError("");

        try {
            setLoading(false);

            const UserCrediential = await signInWithEmailAndPassword(auth, email, password)
            if(!UserCrediential.user.emailVerified){
                setError("Please verify your email to Login")
                return;
            }

            const idToken = UserCrediential.user.getIdToken();
            localStorage.setItem("token", idToken)
            navigate("/dashboard")


        } catch (error) {
            setError(getErrorMessage(error.code))
        }
        finally {
            setLoading(false);
        }
    }

     return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="auth-subtitle">Log in to your account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={function(e) { setEmail(e.target.value) }}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={function(e) { setPassword(e.target.value) }}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login