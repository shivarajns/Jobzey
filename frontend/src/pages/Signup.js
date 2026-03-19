import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { useState, useNavigate, } from "react"
import auth from "../Firebase/FirebaseConfig"


function getErrorMessage(code){
    switch (code) {
        case "auth/email-already-in-use" : return "User from this Email is already Register, Try Another."
        case "auth/invalid-email" : return "Invalid Email."
        case "auth/week-password" : return "Your password is Week try with Strong Password."
        default : return "Something went wrong Please try again after some time."
    }
}

function signUp(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirm, setConfirm] = useState("");
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e)=> {
        e.preventDefault();
        setError("");

        if(password != confirm){
            setError("Password do not match");
        }
        if(password.length < 6){
            setError("Password is too week try with Strong password")
        }

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user)
            navigate("/verify-email")
        } catch (error) {
            setError(getErrorMessage(error.code))
        }
        finally{
            setLoading(false);
        }
    }

    return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create account</h2>
        <p className="auth-subtitle">Sign up with your email</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSignup}>
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
              placeholder="Min. 6 characters"
              value={password}
              onChange={function(e) { setPassword(e.target.value) }}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm password</label>
            <input
              type="password"
              placeholder="Repeat password"
              value={confirm}
              onChange={function(e) { setConfirm(e.target.value) }}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );

}

export default signUp