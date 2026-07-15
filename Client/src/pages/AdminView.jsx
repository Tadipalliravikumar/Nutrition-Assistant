import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function AdminView() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState('plans');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [planRes, userRes] = await Promise.all([
        API.get('/suggestions/all'),
        API.get('/users/all')
      ]);
      setPlans(planRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDeletePlan = async (id) => {
    if (!window.confirm('Delete this plan?')) return;
    try {
      await API.delete(`/suggestions/${id}`);
      setPlans(plans.filter(p => p._id !== id));
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.removeItem('naUser');
    navigate('/login');
  };

  const tabStyle = (active) => ({
    padding: '10px 22px', border: active ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
    cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem',
    background: active ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.05)',
    color: active ? '#fff' : 'var(--gray)',
    transition: 'all 0.2s', backdropFilter: 'blur(10px)'
  });

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h2>Admin Panel</h2>
          <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '4px' }}>
            Total Plans: {plans.length} &nbsp;|&nbsp; Total Users: {users.length}
          </p>
        </div>
        <button className="btn-primary" onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto 16px', display: 'flex', gap: '10px' }}>
        <button style={tabStyle(tab === 'plans')} onClick={() => setTab('plans')}>
          📋 User Suggestions
        </button>
        <button style={tabStyle(tab === 'users')} onClick={() => setTab('users')}>
          👥 All Users
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading all records...</div>
      ) : tab === 'plans' ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Age</th>
                <th>Ht (cm)</th>
                <th>Wt (kg)</th>
                <th>BMI</th>
                <th>Category</th>
                <th>Calories</th>
                <th>P/C/F (g)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {plans.length === 0 ? (
                <tr><td colSpan={10} style={{ textAlign: 'center', padding: '30px', color: '#888' }}>No records found</td></tr>
              ) : (
                plans.map((plan, i) => (
                  <tr key={plan._id}>
                    <td>{i + 1}</td>
                    <td>{plan.email}</td>
                    <td>{plan.age}</td>
                    <td>{plan.height}</td>
                    <td>{plan.weight}</td>
                    <td><strong>{plan.bmi}</strong></td>
                    <td>
                      <span style={{
                        background: plan.bmiCategory === 'Normal Weight' ? 'rgba(16,185,129,0.2)' :
                                    plan.bmiCategory === 'Underweight' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
                        color: plan.bmiCategory === 'Normal Weight' ? '#34d399' :
                               plan.bmiCategory === 'Underweight' ? '#fbbf24' : '#f87171',
                        border: plan.bmiCategory === 'Normal Weight' ? '1px solid rgba(16,185,129,0.3)' :
                                plan.bmiCategory === 'Underweight' ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(239,68,68,0.3)',
                        padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600'
                      }}>{plan.bmiCategory}</span>
                    </td>
                    <td>{plan.dailyCalories} kcal</td>
                    <td style={{ fontSize: '0.78rem' }}>
                      <span style={{ color: '#e74c3c' }}>{plan.protein}P</span> /&nbsp;
                      <span style={{ color: '#f39c12' }}>{plan.carbs}C</span> /&nbsp;
                      <span style={{ color: '#3498db' }}>{plan.fats}F</span>
                    </td>
                    <td>
                      <button className="action-del" onClick={() => handleDeletePlan(plan._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Activity</th>
                <th>Age</th>
                <th>Height (cm)</th>
                <th>Weight (kg)</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.gender || '—'}</td>
                  <td>{u.activityLevel?.replace('_', ' ') || '—'}</td>
                  <td>{u.age || '—'}</td>
                  <td>{u.height || '—'}</td>
                  <td>{u.weight || '—'}</td>
                  <td>
                    <span style={{
                      background: u.role === 'admin' ? 'rgba(139,92,246,0.25)' : 'rgba(255,255,255,0.08)',
                      color: u.role === 'admin' ? '#c084fc' : '#cbd5e1', 
                      border: u.role === 'admin' ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.15)',
                      padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600'
                    }}>{u.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminView;
