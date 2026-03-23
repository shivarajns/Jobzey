import { useState, useEffect } from "react";
import { sendEmailVerification, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import auth from "../Firebase/FirebaseConfig";
import "./VerifyEmail.css";

function VerifyEmail() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(function () {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(function () {
    if (resendCooldown <= 0) return;
    const timer = setInterval(function () {
      setResendCooldown(function (prev) {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return function () { clearInterval(timer); };
  }, [resendCooldown]);

  async function handleResend() {
    setMessage("");
    setError("");
    try {
      setLoading(true);
      await sendEmailVerification(currentUser);
      setMessage("Verification email sent! Check your inbox.");
      setResendCooldown(60);
    } catch (err) {
      if (err.code === "auth/too-many-requests") {
        setError("Too many requests. Please wait a few minutes and try again.");
      } else {
        setError("Could not resend. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckVerification() {
    setMessage("");
    setError("");
    try {
      setCheckingVerification(true);
      await currentUser.reload();
      if (currentUser.emailVerified) {
        navigate("/dashboard");
      } else {
        setError("Email not verified yet. Please check your inbox and click the link.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setCheckingVerification(false);
    }
  }

  async function handleBackToLogin() {
    await signOut(auth);
    localStorage.removeItem("token");
    navigate("/login");
  }

  function maskEmail(email) {
    if (!email) return "";
    const [user, domain] = email.split("@");
    const visible = user.slice(0, 3);
    const masked = "*".repeat(Math.max(user.length - 3, 3));
    return `${visible}${masked}@${domain}`;
  }

  return (
    <div className="verify-page">

      {/* Background */}
      <div className="verify-bg">
        <div className="verify-bg__orb verify-bg__orb--1"></div>
        <div className="verify-bg__orb verify-bg__orb--2"></div>
        <div className="verify-bg__grid"></div>
      </div>

      <div className="verify-layout">

        {/* Left — visual side */}
        <div className="verify-left">
          <div className="verify-left__inner">

            {/* Animated envelope */}
            <div className="verify-envelope-wrap">
              <div className="verify-envelope">
                <div className="verify-envelope__body">
                  <div className="verify-envelope__flap"></div>
                  <div className="verify-envelope__letter">
                    <div className="verify-envelope__line"></div>
                    <div className="verify-envelope__line verify-envelope__line--short"></div>
                    <div className="verify-envelope__line"></div>
                    <div className="verify-envelope__check">✓</div>
                  </div>
                </div>
              </div>
              <div className="verify-envelope__particles">
                <span className="verify-particle verify-particle--1">✦</span>
                <span className="verify-particle verify-particle--2">✦</span>
                <span className="verify-particle verify-particle--3">✦</span>
                <span className="verify-particle verify-particle--4">·</span>
                <span className="verify-particle verify-particle--5">·</span>
              </div>
            </div>

            {/* Steps */}
            <div className="verify-steps">
              <div className="verify-step verify-step--done">
                <div className="verify-step__icon">✓</div>
                <div className="verify-step__text">Account created</div>
              </div>
              <div className="verify-step__connector"></div>
              <div className="verify-step verify-step--active">
                <div className="verify-step__icon">✉</div>
                <div className="verify-step__text">Verify your email</div>
              </div>
              <div className="verify-step__connector"></div>
              <div className="verify-step verify-step--pending">
                <div className="verify-step__icon">🚀</div>
                <div className="verify-step__text">Start job search</div>
              </div>
            </div>

          </div>
        </div>

        {/* Right — action side */}
        <div className="verify-right">
          <div className="verify-form-wrap">

            {/* Header */}
            <div className="verify-header">
              <div className="verify-header__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <h1 className="verify-header__title">Check your inbox</h1>
              <p className="verify-header__subtitle">
                We sent a verification link to
              </p>
              <div className="verify-header__email">
                {maskEmail(currentUser?.email)}
              </div>
              <p className="verify-header__hint">
                Click the link in the email to activate your account.
                Check your spam folder if you don't see it.
              </p>
            </div>

            {/* Messages */}
            {message && (
              <div className="verify-success">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                {message}
              </div>
            )}

            {error && (
              <div className="verify-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="verify-actions">

              <button
                className="verify-btn verify-btn--primary"
                onClick={handleCheckVerification}
                disabled={checkingVerification}
              >
                {checkingVerification ? (
                  <span className="verify-btn__loading">
                    <span className="verify-spinner"></span>
                    Checking...
                  </span>
                ) : (
                  <span className="verify-btn__text">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    I've verified my email
                  </span>
                )}
              </button>

              <button
                className="verify-btn verify-btn--outline"
                onClick={handleResend}
                disabled={loading || resendCooldown > 0}
              >
                {loading ? (
                  <span className="verify-btn__loading">
                    <span className="verify-spinner verify-spinner--blue"></span>
                    Sending...
                  </span>
                ) : resendCooldown > 0 ? (
                  <span className="verify-btn__text">
                    Resend in {resendCooldown}s
                  </span>
                ) : (
                  <span className="verify-btn__text">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 4 1 10 7 10"/>
                      <path d="M3.51 15a9 9 0 1 0 .49-3.85"/>
                    </svg>
                    Resend verification email
                  </span>
                )}
              </button>

            </div>

            {/* Back to login */}
            <div className="verify-footer">
              <span>Wrong email?</span>
              <button className="verify-footer__btn" onClick={handleBackToLogin}>
                Back to login
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default VerifyEmail;