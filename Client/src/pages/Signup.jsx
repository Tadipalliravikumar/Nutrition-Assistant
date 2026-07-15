import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', email: '', password: '',
    age: '', weight: '', height: '',
    gender: 'male', activityLevel: 'moderate'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/users/register', form);
      localStorage.setItem('naUser', JSON.stringify({ ...res.data.user, token: res.data.token }));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '500px' }}>
        <h2>Create Your Account</h2>
        <p className="auth-subtitle">Please fill in your details to get started</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input id="signup-name" name="fullName" type="text" placeholder="John Doe"
              value={form.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input id="signup-email" name="email" type="email" placeholder="you@example.com"
              value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input id="signup-password" name="password" type="password" placeholder="••••••••"
              value={form.password} onChange={handleChange} required />
          </div>

          {/* Profile fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Age</label>
              <input id="signup-age" name="age" type="number" placeholder="25"
                value={form.age} onChange={handleChange} min="5" max="100" />
            </div>
            <div className="form-group">
              <label>Height (cm)</label>
              <input id="signup-height" name="height" type="number" placeholder="175"
                value={form.height} onChange={handleChange} min="80" max="250" />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input id="signup-weight" name="weight" type="number" placeholder="70"
                value={form.weight} onChange={handleChange} min="20" max="300" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Gender</label>
              <select id="signup-gender" name="gender" value={form.gender} onChange={handleChange}
                style={{ padding: '11px 14px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', background: '#fff' }}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Activity Level</label>
              <select id="signup-activity" name="activityLevel" value={form.activityLevel} onChange={handleChange}
                style={{ padding: '11px 14px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', background: '#fff' }}>
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="very_active">Very Active</option>
              </select>
            </div>
          </div>

          <button id="signup-submit" type="submit" className="btn-primary"
            style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
