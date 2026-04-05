import { useAuth } from "../Context/AuthContext";
import "./RecruiterDashboard.css";

function RecruiterDashboard() {
  const { currentUser, userData } = useAuth();

  // Get first letter of email for profile picture
  const getInitial = function() {
    if (currentUser && currentUser.email) {
      return currentUser.email.charAt(0).toUpperCase();
    }
    return "R";
  };

  return (
    <div className="rec-dashboard">
      <div className="rec-dashboard__container">
        
        {/* Profile Card */}
        <div className="rec-dashboard__profile">
          <div className="rec-dashboard__avatar">
            {getInitial()}
          </div>
          <div className="rec-dashboard__info">
            <h1 className="rec-dashboard__welcome">
              Welcome to Jobzey, <span className="rec-dashboard__name">Recruiter</span>!
            </h1>
            <p className="rec-dashboard__email">{currentUser?.email}</p>
          </div>
        </div>

        {/* Message */}
        <div className="rec-dashboard__message">
          <h2>🏢 Your Recruiter Dashboard is Coming Soon!</h2>
          <p>We're building powerful tools to help you find the best talent. Stay tuned!</p>
        </div>

      </div>
    </div>
  );
}

export default RecruiterDashboard;