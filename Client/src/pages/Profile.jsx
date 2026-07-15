import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import API from '../api';

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('naUser'));
  const [form, setForm] = useState({
    fullName: storedUser?.fullName || '',
    age: storedUser?.age || '',
    height: storedUser?.height || '',
    weight: storedUser?.weight || '',
    gender: storedUser?.gender || 'male',
    activityLevel: storedUser?.activityLevel || 'moderate'
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      const res = await API.put('/users/profile', form);
      const updated = { ...storedUser, ...res.data.user };
      localStorage.setItem('naUser', JSON.stringify(updated));
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed.');
    } finally {
      setLoading(false);
    }
  };

  const selectStyle = {
    padding: '12px 16px', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '10px',
    fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', background: 'rgba(15,23,42,0.9)', color: '#fff', width: '100%',
    transition: 'border 0.2s, box-shadow 0.2s'
  };

  const activityLabels = {
    sedentary: '🪑 Sedentary (little/no exercise)',
    light: '🚶 Light (1-3 days/week)',
    moderate: '🏃 Moderate (3-5 days/week)',
    active: '💪 Active (6-7 days/week)',
    very_active: '🔥 Very Active (hard exercise daily)'
  };

  return (
    <div>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 62px)', padding: '50px 20px' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', boxShadow: 'var(--shadow-lg)', padding: '44px' }}>

          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: '#fff', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              {storedUser?.fullName?.[0]?.toUpperCase() || '?'}
            </div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>
              My Profile
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>{storedUser?.email}</p>
          </div>

          {success && <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', fontSize: '0.875rem', fontWeight: '500' }}>{success}</div>}
          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input name="fullName" type="text" value={form.fullName} onChange={handleChange} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Age</label>
                <input name="age" type="number" placeholder="25" value={form.age} onChange={handleChange} min="5" max="100" />
              </div>
              <div className="form-group">
                <label>Height (cm)</label>
                <input name="height" type="number" placeholder="175" value={form.height} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <input name="weight" type="number" placeholder="70" value={form.weight} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} style={selectStyle}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Activity Level</label>
              <select name="activityLevel" value={form.activityLevel} onChange={handleChange} style={selectStyle}>
                {Object.entries(activityLabels).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
              {loading ? 'Saving...' : '✅ Save Changes'}
            </button>
          </form>

          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray)', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
              Account Info
            </p>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Role: <strong style={{ color: 'var(--primary-light)' }}>{storedUser?.role}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
