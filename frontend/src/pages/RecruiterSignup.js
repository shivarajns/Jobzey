import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import auth from "../Firebase/FirebaseConfig";
import "./RecruiterSignup.css";
import { registerRecruiter } from "../Service/AuthApi";

function getErrorMessage(code) {
  switch (code) {
    case "auth/email-already-in-use": return "This email is already registered.";
    case "auth/invalid-email": return "Invalid email address.";
    case "auth/weak-password": return "Password is too weak.";
    default: return "Something went wrong. Please try again.";
  }
}

function RecruiterSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const navigate = useNavigate();

  function getStrength(pwd) {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  }

  const strength = getStrength(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very strong"][strength];
  const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#4f8eff"][strength];

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Please enter your email address.");
    if (!password.trim()) return setError("Please enter a password.");
    if (password !== confirm) return setError("Passwords do not match.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    try {
      setLoading(true);
      localStorage.setItem("userRole", "recruiter");

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        photoURL: JSON.stringify({ role: "recruiter" }),
      });

      const user = userCredential.user;
      await registerRecruiter(user.uid, user.email);

      localStorage.setItem("userData", JSON.stringify({
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        role: "recruiter",
      }));

      await sendEmailVerification(userCredential.user);
      navigate("/verify-email");
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rec-page">
      <div className="rec-bg">
        <div className="rec-bg__orb rec-bg__orb--1"></div>
        <div className="rec-bg__orb rec-bg__orb--2"></div>
        <div className="rec-bg__grid"></div>
      </div>

      <div className="rec-layout">
        <div className="rec-left">
          <div className="rec-left__inner">
            <Link to="/home" className="rec-brand">
              <div className="rec-brand__icon">J</div>
              <span className="rec-brand__name">Jobzey</span>
            </Link>

            <div className="rec-left__badge">
              <span className="rec-left__badge-icon">🏢</span>
              Recruiter portal
            </div>

            <h2 className="rec-left__title">
              Hire the best talent <span className="rec-left__title-accent">faster</span>
            </h2>

            <p className="rec-left__subtitle">
              Post jobs, review applications, and connect with top candidates across every domain — all from one place.
            </p>

            <div className="rec-perks">
              {[
                { icon: "📋", text: "Post unlimited job listings" },
                { icon: "👥", text: "Access thousands of candidates" },
                { icon: "⚡", text: "Review applications instantly" },
                { icon: "📊", text: "Track hiring pipeline" },
              ].map(function(perk, i) {
                return (
                  <div className="rec-perk" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="rec-perk__icon">{perk.icon}</span>
                    <span className="rec-perk__text">{perk.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="rec-left__companies">
              <span className="rec-left__companies-label">Trusted by teams at</span>
              <div className="rec-left__company-tags">
                {["Startups", "SMEs", "Enterprises", "Agencies"].map(function(tag, i) {
                  return <span className="rec-left__company-tag" key={i}>{tag}</span>;
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="rec-right">
          <div className="rec-form-wrap">
            <div className="rec-form__header">
              <h1 className="rec-form__title">Create your account</h1>
              <p className="rec-form__subtitle">Start hiring top talent on Jobzey today.</p>
            </div>

            {error && (
              <div className="rec-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="rec-form">
              <div className={`rec-field ${focused === "email" ? "rec-field--focused" : ""} ${email ? "rec-field--filled" : ""}`}>
                <label className="rec-field__label">Work email</label>
                <div className="rec-field__wrap">
                  <svg className="rec-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={function(e) { setEmail(e.target.value); }}
                    onFocus={function() { setFocused("email"); }}
                    onBlur={function() { setFocused(""); }}
                    required
                  />
                </div>
              </div>

              <div className={`rec-field ${focused === "password" ? "rec-field--focused" : ""} ${password ? "rec-field--filled" : ""}`}>
                <label className="rec-field__label">Password</label>
                <div className="rec-field__wrap">
                  <svg className="rec-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={function(e) { setPassword(e.target.value); }}
                    onFocus={function() { setFocused("password"); }}
                    onBlur={function() { setFocused(""); }}
                    required
                  />
                  <button type="button" className="rec-field__toggle" onClick={function() { setShowPassword(!showPassword); }}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="rec-strength" style={{ visibility: password ? "visible" : "hidden" }}>
                  <div className="rec-strength__bars">
                    {[1,2,3,4,5].map(function(i) {
                      return (
                        <div key={i} className="rec-strength__bar" style={{ background: i <= strength ? strengthColor : "rgba(255,255,255,0.08)" }} />
                      );
                    })}
                  </div>
                  <span className="rec-strength__label" style={{ color: strengthColor }}>{strengthLabel}</span>
                </div>
              </div>

              <div className={`rec-field ${focused === "confirm" ? "rec-field--focused" : ""} ${confirm ? "rec-field--filled" : ""}`}>
                <label className="rec-field__label">Confirm password</label>
                <div className="rec-field__wrap">
                  <svg className="rec-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat password"
                    value={confirm}
                    onChange={function(e) { setConfirm(e.target.value); }}
                    onFocus={function() { setFocused("confirm"); }}
                    onBlur={function() { setFocused(""); }}
                    required
                  />
                  <button type="button" className="rec-field__toggle" onClick={function() { setShowConfirm(!showConfirm); }}>
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                  {confirm && (
                    <span className="rec-field__match" style={{ color: confirm === password ? "#22c55e" : "#ef4444" }}>
                      {confirm === password ? "✓" : "✗"}
                    </span>
                  )}
                </div>
              </div>

              <button type="submit" className="rec-submit" disabled={loading}>
                {loading ? (
                  <span className="rec-submit__loading">
                    <span className="rec-spinner"></span>
                    Creating account...
                  </span>
                ) : (
                  <span className="rec-submit__text">
                    Create account
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                )}
              </button>
            </form>

            <p className="rec-login-link">
              Already have an account? <Link to="/login">Log in</Link>
            </p>

            <p className="rec-jobseeker-link">
              Looking for a job instead? <Link to="/signup">Sign up as job seeker</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterSignup;
