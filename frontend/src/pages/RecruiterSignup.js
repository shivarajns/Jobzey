import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import auth from "../Firebase/FirebaseConfig";
import "./RecruiterSignup.css";

function getErrorMessage(code) {
  switch (code) {
    case "auth/email-already-in-use": return "This email is already registered.";
    case "auth/invalid-email": return "Invalid email address.";
    case "auth/weak-password": return "Password is too weak.";
    default: return "Something went wrong. Please try again.";
  }
}

function RecruiterSignup() {
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Step 2 fields
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");

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

  function handleNextStep(e) {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) return setError("Please enter your full name.");
    if (password !== confirm) return setError("Passwords do not match.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (!companyName.trim()) return setError("Please enter your company name.");
    if (!jobTitle.trim()) return setError("Please enter your job title.");
    if (!experience) return setError("Please select years of experience.");

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: fullName,
        photoURL: JSON.stringify({
          role: "recruiter",
          companyName,
          companyWebsite,
          phone,
          jobTitle,
          experience,
        }),
      });

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

      {/* Background */}
      <div className="rec-bg">
        <div className="rec-bg__orb rec-bg__orb--1"></div>
        <div className="rec-bg__orb rec-bg__orb--2"></div>
        <div className="rec-bg__grid"></div>
      </div>

      <div className="rec-layout">

        {/* Left panel */}
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
                  return (
                    <span className="rec-left__company-tag" key={i}>{tag}</span>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Right panel — form */}
        <div className="rec-right">
          <div className="rec-form-wrap">

            {/* Step indicator */}
            <div className="rec-steps">
              <div className={`rec-step ${step >= 1 ? "rec-step--active" : ""} ${step > 1 ? "rec-step--done" : ""}`}>
                <div className="rec-step__num">{step > 1 ? "✓" : "1"}</div>
                <span className="rec-step__label">Account</span>
              </div>
              <div className="rec-step__line"></div>
              <div className={`rec-step ${step >= 2 ? "rec-step--active" : ""}`}>
                <div className="rec-step__num">2</div>
                <span className="rec-step__label">Company</span>
              </div>
            </div>

            {/* Form header */}
            <div className="rec-form__header">
              <h1 className="rec-form__title">
                {step === 1 ? "Create your account" : "Company details"}
              </h1>
              <p className="rec-form__subtitle">
                {step === 1
                  ? "Start hiring top talent on Jobzey today."
                  : "Tell us about your company so candidates can find you."}
              </p>
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

            {/* ── Step 1 ── */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="rec-form">

                {/* Full name */}
                <div className={`rec-field ${focused === "name" ? "rec-field--focused" : ""} ${fullName ? "rec-field--filled" : ""}`}>
                  <label className="rec-field__label">Full name</label>
                  <div className="rec-field__wrap">
                    <svg className="rec-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={fullName}
                      onChange={function(e) { setFullName(e.target.value); }}
                      onFocus={function() { setFocused("name"); }}
                      onBlur={function() { setFocused(""); }}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
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

                {/* Password */}
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
                          <div key={i} className="rec-strength__bar"
                            style={{ background: i <= strength ? strengthColor : "rgba(255,255,255,0.08)" }}>
                          </div>
                        );
                      })}
                    </div>
                    <span className="rec-strength__label" style={{ color: strengthColor }}>{strengthLabel}</span>
                  </div>
                </div>

                {/* Confirm password */}
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

                <button type="submit" className="rec-submit">
                  <span className="rec-submit__text">
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </button>

              </form>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <form onSubmit={handleSignup} className="rec-form">

                {/* Company name */}
                <div className={`rec-field ${focused === "company" ? "rec-field--focused" : ""} ${companyName ? "rec-field--filled" : ""}`}>
                  <label className="rec-field__label">Company name</label>
                  <div className="rec-field__wrap">
                    <svg className="rec-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={companyName}
                      onChange={function(e) { setCompanyName(e.target.value); }}
                      onFocus={function() { setFocused("company"); }}
                      onBlur={function() { setFocused(""); }}
                      required
                    />
                  </div>
                </div>

                {/* Company website */}
                <div className={`rec-field ${focused === "website" ? "rec-field--focused" : ""} ${companyWebsite ? "rec-field--filled" : ""}`}>
                  <label className="rec-field__label">Company website <span className="rec-field__optional">(optional)</span></label>
                  <div className="rec-field__wrap">
                    <svg className="rec-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    <input
                      type="url"
                      placeholder="https://yourcompany.com"
                      value={companyWebsite}
                      onChange={function(e) { setCompanyWebsite(e.target.value); }}
                      onFocus={function() { setFocused("website"); }}
                      onBlur={function() { setFocused(""); }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className={`rec-field ${focused === "phone" ? "rec-field--focused" : ""} ${phone ? "rec-field--filled" : ""}`}>
                  <label className="rec-field__label">Phone number <span className="rec-field__optional">(optional)</span></label>
                  <div className="rec-field__wrap">
                    <svg className="rec-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={function(e) { setPhone(e.target.value); }}
                      onFocus={function() { setFocused("phone"); }}
                      onBlur={function() { setFocused(""); }}
                    />
                  </div>
                </div>

                {/* Job title */}
                <div className={`rec-field ${focused === "title" ? "rec-field--focused" : ""} ${jobTitle ? "rec-field--filled" : ""}`}>
                  <label className="rec-field__label">Your job title</label>
                  <div className="rec-field__wrap">
                    <svg className="rec-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="HR Manager / Talent Acquisition"
                      value={jobTitle}
                      onChange={function(e) { setJobTitle(e.target.value); }}
                      onFocus={function() { setFocused("title"); }}
                      onBlur={function() { setFocused(""); }}
                      required
                    />
                  </div>
                </div>

                {/* Years of experience */}
                <div className={`rec-field ${focused === "exp" ? "rec-field--focused" : ""} ${experience ? "rec-field--filled" : ""}`}>
                  <label className="rec-field__label">Years of experience in hiring</label>
                  <div className="rec-field__wrap">
                    <svg className="rec-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <select
                      value={experience}
                      onChange={function(e) { setExperience(e.target.value); }}
                      onFocus={function() { setFocused("exp"); }}
                      onBlur={function() { setFocused(""); }}
                      required
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">Less than 1 year</option>
                      <option value="1-3">1 – 3 years</option>
                      <option value="3-5">3 – 5 years</option>
                      <option value="5-10">5 – 10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>

                <div className="rec-form__buttons">
                  <button
                    type="button"
                    className="rec-btn-back"
                    onClick={function() { setStep(1); setError(""); }}
                  >
                    ← Back
                  </button>
                  <button type="submit" className="rec-submit rec-submit--flex" disabled={loading}>
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
                </div>

              </form>
            )}

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
