import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api';

function MyDietPlan() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const res = await API.get('/suggestions/my');
      setPlans(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlans(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this diet plan?')) return;
    try {
      await API.delete(`/suggestions/${id}`);
      setPlans(plans.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const MacroBar = ({ label, value, max, color }) => (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '0.78rem', color: '#bbb' }}>{label}</span>
        <span style={{ fontSize: '0.78rem', color: '#fff', fontWeight: '600' }}>{value}g</span>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '4px', height: '6px' }}>
        <div style={{
          background: color, height: '6px', borderRadius: '4px',
          width: `${Math.min((value / max) * 100, 100)}%`,
          transition: 'width 0.6s ease'
        }} />
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="dietplan-page">
        <h2 className="dietplan-title">Diet Suggestions</h2>

        {loading ? (
          <div className="loading-spinner">Loading your diet plans...</div>
        ) : plans.length === 0 ? (
          <div className="no-plans">
            <h3>No diet plans yet</h3>
            <p>Create your first personalized nutrition plan.</p>
            <Link to="/new-plan">
              <button className="btn-primary" style={{ marginTop: '16px' }}>Create New Plan</button>
            </Link>
          </div>
        ) : (
          plans.map((plan) => (
            <div className="dietplan-card" key={plan._id}>
              <div className="dietplan-stats">
                <span className="stat-badge">Age: {plan.age}</span>
                <span className="stat-badge">Height: {plan.height} cm</span>
                <span className="stat-badge">Weight: {plan.weight} kg</span>
                <span className="stat-badge" style={{ background: '#c0392b', color: '#fff' }}>
                  BMI: {plan.bmi}
                </span>
                <span className="stat-badge" style={{ background: '#1a1a1a', color: '#fff' }}>
                  {plan.bmiCategory}
                </span>
                <span className="stat-badge">{plan.gender} · {plan.activityLevel?.replace('_', ' ')}</span>
              </div>

              <div className="dietplan-body">
                <ul className="dietplan-info-list">
                  <li>📧 <span>{plan.email}</span></li>
                  <li>🔥 <span>Daily Calories: {plan.dailyCalories} kcal</span></li>
                  <li>📅 <span>Plan Start: {new Date(plan.startDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span></li>
                  <li>⏳ <span>Plan End: {new Date(plan.endDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span></li>
                </ul>

                {/* Macro breakdown bars */}
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: '#aaa', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                    📊 Daily Macronutrients
                  </h4>
                  <MacroBar label="Protein" value={plan.protein} max={250} color="#e74c3c" />
                  <MacroBar label="Carbohydrates" value={plan.carbs} max={400} color="#f39c12" />
                  <MacroBar label="Fats" value={plan.fats} max={150} color="#3498db" />
                </div>

                <div className="suggestion-box">
                  <h4>💡 Recommendation</h4>
                  <p>{plan.suggestion}</p>
                </div>
                {plan.mealPlans && plan.mealPlans.length > 0 && (
                  <div style={{ marginTop: '24px', marginBottom: '16px' }}>
                    <h4 style={{ color: '#aaa', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                      🍽️ 3 Daily Meal Plan Options
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {plan.mealPlans.map((mp, index) => (
                        <div key={index} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '14px', overflow: 'hidden' }}>
                          <div style={{ background: 'rgba(139,92,246,0.15)', padding: '12px 18px', borderBottom: '1px solid rgba(139,92,246,0.2)', fontWeight: '700', color: 'var(--primary-light)' }}>
                            {mp.planName || `Option ${index + 1}`}
                          </div>
                          <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                            {['breakfast', 'lunch', 'evening', 'dinner'].map(meal => (
                              <div key={meal}>
                                <h5 style={{ textTransform: 'capitalize', color: '#fff', marginBottom: '6px', fontSize: '0.85rem', opacity: 0.8 }}>{meal}</h5>
                                <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.6' }}>{mp[meal]}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button className="delete-btn" onClick={() => handleDelete(plan._id)}>
                  🗑 Delete Plan
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyDietPlan;
