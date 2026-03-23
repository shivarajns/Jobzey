import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import auth from "../Firebase/FirebaseConfig";
import "./Signup.css";

function getErrorMessage(code) {
  switch (code) {
    case "auth/email-already-in-use": return "This email is already registered.";
    case "auth/invalid-email": return "Invalid email address.";
    case "auth/weak-password": return "Password is too weak.";
    default: return "Something went wrong. Please try again.";
  }
}

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      return setError("Passwords do not match.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      navigate("/verify-email");
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

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

  return (
    <div className="signup-page">

      {/* Background */}
      <div className="signup-bg">
        <div className="signup-bg__orb signup-bg__orb--1"></div>
        <div className="signup-bg__orb signup-bg__orb--2"></div>
        <div className="signup-bg__grid"></div>
      </div>

      {/* Split layout */}
      <div className="signup-layout">

        {/* Left panel — mirror/brand side */}
        <div className="signup-left">
          <div className="signup-left__inner">

            <Link to="/home" className="signup-brand">
              <div className="signup-brand__icon">J</div>
              <span className="signup-brand__name">Jobzey</span>
            </Link>

            <div className="signup-mirror">
              <div className="signup-mirror__card signup-mirror__card--back"></div>
              <div className="signup-mirror__card signup-mirror__card--mid"></div>
              <div className="signup-mirror__card signup-mirror__card--front">
                <div className="mirror-card__header">
                  <div className="mirror-card__avatar">👩‍💻</div>
                  <div>
                    <div className="mirror-card__name">Sarah K.</div>
                    <div className="mirror-card__role">Frontend Developer</div>
                  </div>
                  <div className="mirror-card__badge">Hired ✓</div>
                </div>
                <div className="mirror-card__stats">
                  <div className="mirror-card__stat">
                    <span className="mirror-card__stat-num">12</span>
                    <span className="mirror-card__stat-label">Applied</span>
                  </div>
                  <div className="mirror-card__stat">
                    <span className="mirror-card__stat-num">5</span>
                    <span className="mirror-card__stat-label">Interviews</span>
                  </div>
                  <div className="mirror-card__stat">
                    <span className="mirror-card__stat-num">2</span>
                    <span className="mirror-card__stat-label">Offers</span>
                  </div>
                </div>
                <div className="mirror-card__bar-label">Application success rate</div>
                <div className="mirror-card__bar">
                  <div className="mirror-card__bar-fill"></div>
                </div>
              </div>
            </div>

            <div className="signup-left__quote">
              <p>"Found my dream job in 3 weeks using Jobzey. The process was incredibly smooth."</p>
              <span>— Sarah K., hired at Google</span>
            </div>

            <div className="signup-left__dots">
              <div className="signup-left__dot signup-left__dot--active"></div>
              <div className="signup-left__dot"></div>
              <div className="signup-left__dot"></div>
            </div>

          </div>
        </div>

        {/* Right panel — form side */}
        <div className="signup-right">
          <div className="signup-form-wrap">

            <div className="signup-form__header">
              <h1 className="signup-form__title">Create your account</h1>
              <p className="signup-form__subtitle">
                Start your job search journey today. Free forever.
              </p>
            </div>

            {error && (
              <div className="signup-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="signup-form">

              {/* Email */}
              <div className={`signup-field ${focused === "email" ? "signup-field--focused" : ""} ${email ? "signup-field--filled" : ""}`}>
                <label className="signup-field__label">Email address</label>
                <div className="signup-field__input-wrap">
                  <svg className="signup-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={function (e) { setEmail(e.target.value); }}
                    onFocus={function () { setFocused("email"); }}
                    onBlur={function () { setFocused(""); }}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className={`signup-field ${focused === "password" ? "signup-field--focused" : ""} ${password ? "signup-field--filled" : ""}`}>
                <label className="signup-field__label">Password</label>
                <div className="signup-field__input-wrap">
                  <svg className="signup-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={function (e) { setPassword(e.target.value); }}
                    onFocus={function () { setFocused("password"); }}
                    onBlur={function () { setFocused(""); }}
                    required
                  />
                  <button
                    type="button"
                    className="signup-field__toggle"
                    onClick={function () { setShowPassword(!showPassword); }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Password strength */}
                {password && (
                  <div className="signup-strength">
                    <div className="signup-strength__bars">
                      {[1, 2, 3, 4, 5].map(function (i) {
                        return (
                          <div
                            key={i}
                            className="signup-strength__bar"
                            style={{ background: i <= strength ? strengthColor : "rgba(255,255,255,0.08)" }}
                          ></div>
                        );
                      })}
                    </div>
                    <span className="signup-strength__label" style={{ color: strengthColor }}>
                      {strengthLabel}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div className={`signup-field ${focused === "confirm" ? "signup-field--focused" : ""} ${confirm ? "signup-field--filled" : ""}`}>
                <label className="signup-field__label">Confirm password</label>
                <div className="signup-field__input-wrap">
                  <svg className="signup-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat password"
                    value={confirm}
                    onChange={function (e) { setConfirm(e.target.value); }}
                    onFocus={function () { setFocused("confirm"); }}
                    onBlur={function () { setFocused(""); }}
                    required
                  />
                  <button
                    type="button"
                    className="signup-field__toggle"
                    onClick={function () { setShowConfirm(!showConfirm); }}
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                  {confirm && (
                    <span className="signup-field__match">
                      {confirm === password ? "✓" : "✗"}
                    </span>
                  )}
                </div>
              </div>

              <button type="submit" className="signup-submit" disabled={loading}>
                {loading ? (
                  <span className="signup-submit__loading">
                    <span className="signup-spinner"></span>
                    Creating account...
                  </span>
                ) : (
                  <span className="signup-submit__text">
                    Create account
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </button>

            </form>

            <p className="signup-login-link">
              Already have an account?{" "}
              <Link to="/login">Log in</Link>
            </p>

            <p className="signup-login-link" style={{ marginTop: "0.5rem" }}>
              Are you a recruiter?{" "}
              <Link to="/recruiter-signup">Register your company</Link>
            </p>

            <p className="signup-terms">
              By signing up, you agree to our{" "}
              <a href="#about">Terms of Service</a> and{" "}
              <a href="#about">Privacy Policy</a>.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;