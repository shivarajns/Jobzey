import { useAuth } from "../Context/AuthContext";
import "./JobSeekerDashboard.css";

function JobSeekerDashboard() {
  const { currentUser, userData } = useAuth();

  // Get first letter of email for profile picture
  const getInitial = function() {
    if (currentUser && currentUser.email) {
      return currentUser.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        
        {/* Profile Card */}
        <div className="dashboard__profile">
          <div className="dashboard__avatar">
            {getInitial()}
          </div>
          <div className="dashboard__info">
            <h1 className="dashboard__welcome">
              Welcome to Jobzey, <span className="dashboard__name">Job Seeker</span>!
            </h1>
            <p className="dashboard__email">{currentUser?.email}</p>
          </div>
        </div>

        {/* Message */}
        <div className="dashboard__message">
          <h2>🎉 Your Dashboard is Coming Soon!</h2>
          <p>We're building an amazing experience for you. Stay tuned!</p>
        </div>

      </div>
    </div>
  );
}

export default JobSeekerDashboard;