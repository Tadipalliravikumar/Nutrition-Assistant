import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('naUser'));

  const handleLogout = () => {
    localStorage.removeItem('naUser');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-brand">
        Nutri<span>-Assist</span>
      </Link>
      <ul className="navbar-links">
        <li><Link to="/home" className={isActive('/home')}>Home</Link></li>
        <li><Link to="/new-plan" className={isActive('/new-plan')}>New Plan</Link></li>
        <li><Link to="/my-diet-plan" className={isActive('/my-diet-plan')}>My Diet Plan</Link></li>
        <li><Link to="/profile" className={isActive('/profile')}>Profile</Link></li>
        {user?.role === 'admin' && (
          <li><Link to="/admin" className={isActive('/admin')}>Admin</Link></li>
        )}
        {user && (
          <li>
            <span style={{ color: '#aaa', fontSize: '0.82rem', padding: '0 4px' }}>
              👋 {user.fullName?.split(' ')[0]}
            </span>
          </li>
        )}
        {user ? (
          <li>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
