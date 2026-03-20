import { sendEmailVerification, signOut } from "firebase/auth";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import auth from "../Firebase/FirebaseConfig";
import { useAuth } from "../Context/AuthContext";

function VerifyEmail() {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [checkingVerification, setCheckingVerification] = useState(false);

    const { currentUser } = useAuth();
    const navigation = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigation("/login");
        }
    }, [currentUser, navigation])

    const handleResend = async () => {
        setError("");
        setMessage("");

        try {
            setLoading(true)
            await sendEmailVerification(currentUser);
            setMessage("Verification email sent! Check your inbox.")
        } catch (error) {
            if (error === "auth/too-many-request") {
                setError("To many request try after some times");
            } else {
                setError("Unable to send verification mail, please try again later");
            }
        }
        finally {
            setLoading(false);
        }
    }

    const handleCheckingVerification = async () => {
        setError("");
        setMessage("");

        try {
            setCheckingVerification(true);
            await currentUser.reload();

            if(currentUser.emailVerified){
                navigation("/dashboard");
            }
            else{
                setError("Email is not verified, check your email and verify.")
            }
        } catch (error) {
            setError("Something went wrong please try again after some times")
        }
        finally{
            setCheckingVerification(false);
        }

    }

    const handleBackToLogin = async ()=> {
        await signOut(auth);
        localStorage.removeItem("token");
        navigation("/login")
    }

    return (
    <div className="auth-container">
      <div className="auth-card" style={{ textAlign: "center" }}>

        <div className="verify-icon">✉️</div>
        <h2>Check your email</h2>
        <p className="auth-subtitle">
          We sent a verification link to{" "}
          <strong>{currentUser?.email}</strong>.
          Click the link in the email to activate your account.
        </p>

        {message && <div className="auth-success">{message}</div>}
        {error && <div className="auth-error">{error}</div>}

        <button
          className="auth-btn"
          onClick={handleCheckingVerification}
          disabled={checkingVerification}
        >
          {checkingVerification ? "Checking..." : "I have verified my email"}
        </button>

        <button
          className="auth-btn-outline"
          onClick={handleResend}
          disabled={loading}
          style={{ marginTop: "10px" }}
        >
          {loading ? "Sending..." : "Resend verification email"}
        </button>

        <p className="auth-link" style={{ marginTop: "16px" }}>
          Wrong email?{" "}
          <span
            className="link-btn"
            onClick={handleBackToLogin}
            style={{"color" : "blue", "cursor" : "pointer"}}
          >
            Back to login
          </span>
        </p>

      </div>
    </div>
  );

}

export default VerifyEmail