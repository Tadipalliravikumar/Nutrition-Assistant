import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing-page">
      <div className="landing-card">
        <div className="landing-icon">🥗</div>
        <h1>Welcome to <span>Nutri-Assist</span></h1>
        <p>
          Your personalized nutrition planner. Get expert diet suggestions based on
          your age, height, weight, and goals, and start your health journey today.
        </p>

        <div className="landing-features">
          <div className="feat">
            <div className="feat-dot"></div>
            <span>Healthy Diets</span>
          </div>
          <div className="feat">
            <div className="feat-dot"></div>
            <span>Fitness Tracking</span>
          </div>
          <div className="feat">
            <div className="feat-dot"></div>
            <span>Meal Planning</span>
          </div>
        </div>

        <div className="landing-actions">
          <Link to="/login">
            <button className="btn-secondary">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn-primary">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
