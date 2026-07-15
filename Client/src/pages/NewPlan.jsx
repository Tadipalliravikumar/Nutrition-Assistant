import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api';

function NewPlan() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('naUser'));
  const [form, setForm] = useState({
    age: user?.age || '',
    height: user?.height || '',
    weight: user?.weight || '',
    gender: user?.gender || 'male',
    activityLevel: user?.activityLevel || 'moderate'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post('/suggestions/create', {
        age: Number(form.age),
        height: Number(form.height),
        weight: Number(form.weight),
        gender: form.gender,
        activityLevel: form.activityLevel
      });
      navigate('/my-diet-plan');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate plan. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectStyle = {
    padding: '11px 14px', border: '1.5px solid #e0e0e0',
    borderRadius: '8px', fontFamily: 'inherit',
    fontSize: '0.9rem', outline: 'none', background: '#fff', width: '100%'
  };

  return (
    <div className="newplan-page">
      <Navbar />
      <div className="newplan-content">
        <div className="newplan-card">
          <h2>Get Your Personalized Diet Plan</h2>
          <p className="newplan-desc">
            Fill in your details below to receive science-backed recommendations
            tailored to your age, body stats, gender, and activity level.
          </p>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Age</label>
                <input id="plan-age" name="age" type="number" placeholder="e.g. 25"
                  value={form.age} onChange={handleChange} min="5" max="100" required />
              </div>
              <div className="form-group">
                <label>Height (cm)</label>
                <input id="plan-height" name="height" type="number" placeholder="e.g. 175"
                  value={form.height} onChange={handleChange} min="80" max="250" required />
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <input id="plan-weight" name="weight" type="number" placeholder="e.g. 70"
                  value={form.weight} onChange={handleChange} min="20" max="300" required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Gender</label>
                <select id="plan-gender" name="gender" value={form.gender} onChange={handleChange} style={selectStyle}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Activity Level</label>
                <select id="plan-activity" name="activityLevel" value={form.activityLevel} onChange={handleChange} style={selectStyle}>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="active">Active</option>
                  <option value="very_active">Very Active</option>
                </select>
              </div>
            </div>

            <button id="get-suggestions-btn" type="submit" className="btn-primary"
              style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
              {loading ? 'Generating...' : 'Get Diet Suggestions'}
            </button>
          </form>

          <p className="newplan-disclaimer">
            ⚠️ Make sure our information is accurate. Please consult a healthcare professional for medical advice.
          </p>
        </div>
      </div>

      <div className="newplan-footer">
        Need Help? Contact Us: <a href="mailto:NutriAssist@gmail.com">NutriAssist@gmail.com</a> | Tel: +1-234-567-8901
        <br />© 2024 Nutri-Assist. All Rights Reserved.
      </div>
    </div>
  );
}

export default NewPlan;
