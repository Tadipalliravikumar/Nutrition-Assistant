import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import NewPlan from './pages/NewPlan';
import MyDietPlan from './pages/MyDietPlan';
import AdminView from './pages/AdminView';
import Profile from './pages/Profile';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('naUser'));
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('naUser'));
  return user && user.role === 'admin' ? children : <Navigate to="/home" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/new-plan" element={<PrivateRoute><NewPlan /></PrivateRoute>} />
        <Route path="/my-diet-plan" element={<PrivateRoute><MyDietPlan /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminView /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
