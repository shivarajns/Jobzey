import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import auth from "../Firebase/FirebaseConfig";
import "./Login.css";

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
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }

      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("token", idToken);
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">

      {/* Background */}
      <div className="login-bg">
        <div className="login-bg__orb login-bg__orb--1"></div>
        <div className="login-bg__orb login-bg__orb--2"></div>
        <div className="login-bg__orb login-bg__orb--3"></div>
        <div className="login-bg__grid"></div>
      </div>

      {/* Split layout */}
      <div className="login-layout">

        {/* Left panel — form side */}
        <div className="login-left">
          <div className="login-form-wrap">

            <Link to="/home" className="login-brand">
              <div className="login-brand__icon">J</div>
              <span className="login-brand__name">Jobzey</span>
            </Link>

            <div className="login-form__header">
              <h1 className="login-form__title">Welcome back</h1>
              <p className="login-form__subtitle">
                Log in to continue your job search journey.
              </p>
            </div>

            {error && (
              <div className="login-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form">

              {/* Email */}
              <div className={`login-field ${focused === "email" ? "login-field--focused" : ""} ${email ? "login-field--filled" : ""}`}>
                <label className="login-field__label">Email address</label>
                <div className="login-field__input-wrap">
                  <svg className="login-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={function(e) { setEmail(e.target.value); }}
                    onFocus={function() { setFocused("email"); }}
                    onBlur={function() { setFocused(""); }}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className={`login-field ${focused === "password" ? "login-field--focused" : ""} ${password ? "login-field--filled" : ""}`}>
                <div className="login-field__label-row">
                  <label className="login-field__label">Password</label>
                  {/* <a href="#" className="login-field__forgot">Forgot password?</a> */}
                </div>
                <div className="login-field__input-wrap">
                  <svg className="login-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={password}
                    onChange={function(e) { setPassword(e.target.value); }}
                    onFocus={function() { setFocused("password"); }}
                    onBlur={function() { setFocused(""); }}
                    required
                  />
                  <button
                    type="button"
                    className="login-field__toggle"
                    onClick={function() { setShowPassword(!showPassword); }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-submit" disabled={loading}>
                {loading ? (
                  <span className="login-submit__loading">
                    <span className="login-spinner"></span>
                    Logging in...
                  </span>
                ) : (
                  <span className="login-submit__text">
                    Log in
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                )}
              </button>

            </form>

            <p className="login-signup-link">
              Don't have an account?{" "}
              <Link to="/signup">Sign up for free</Link>
            </p>

          </div>
        </div>

        {/* Right panel — visual side */}
        <div className="login-right">
          <div className="login-right__inner">

            <div className="login-jobs">
              <div className="login-jobs__label">
                <span className="login-jobs__dot"></span>
                Live job listings
              </div>

              {[
                { role: "Senior React Developer", company: "Stripe", location: "Remote", tag: "Full-time", color: "#4f8eff" },
                { role: "Product Designer", company: "Notion", location: "San Francisco", tag: "Hybrid", color: "#7b5ea7" },
                { role: "Backend Engineer", company: "Vercel", location: "Remote", tag: "Full-time", color: "#22c55e" },
                { role: "Data Analyst", company: "Airbnb", location: "New York", tag: "On-site", color: "#f97316" },
              ].map(function(job, index) {
                return (
                  <div
                    className="login-job-card"
                    key={index}
                    style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                  >
                    <div className="login-job-card__left">
                      <div
                        className="login-job-card__logo"
                        style={{ background: `${job.color}22`, color: job.color, border: `1px solid ${job.color}33` }}
                      >
                        {job.company[0]}
                      </div>
                      <div>
                        <div className="login-job-card__role">{job.role}</div>
                        <div className="login-job-card__meta">
                          {job.company} · {job.location}
                        </div>
                      </div>
                    </div>
                    <div
                      className="login-job-card__tag"
                      style={{ color: job.color, background: `${job.color}15`, border: `1px solid ${job.color}25` }}
                    >
                      {job.tag}
                    </div>
                  </div>
                );
              })}

              <div className="login-jobs__footer">
                <span>200,000+ jobs available</span>
                <span className="login-jobs__arrow">→</span>
              </div>
            </div>

            <div className="login-right__quote">
              <p>"Jobzey made my job search so much easier. I had 3 offers within a month!"</p>
              <div className="login-right__quote-author">
                <div className="login-right__quote-avatar">R</div>
                <div>
                  <div className="login-right__quote-name">Rahul M.</div>
                  <div className="login-right__quote-role">Software Engineer at Meta</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;