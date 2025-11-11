import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'student': return '/student/dashboard';
      case 'company': return '/company/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/login';
    }
  };

  return (
    <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur border-b z-50">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-indigo-600 font-extrabold text-xl">
          <span className="i fa-solid fa-briefcase" />
          Grag<span className="text-amber-400">Gig</span>
        </Link>
        
        <ul className="hidden md:flex items-center gap-2">
          {[
            { to: "/", label: "Home" },
            { to: "/login", label: "Jobs" },
            { to: "/login", label: "Companies" },
            { to: "#about", label: "About", anchor: true },
            { to: "#services", label: "Services", anchor: true },
          ].map((l, i) => (
            <li key={i}>
              {l.anchor ? (
                <a href={l.to} className="nav-link">{l.label}</a>
              ) : (
                <Link to={l.to} className="nav-link">{l.label}</Link>
              )}
            </li>
          ))}
          
          {isAuthenticated ? (
            <>
              {user?.role === 'company' && (
                <li>
                  <Link to="/company/post-job" className="ml-2 btn btn-primary">Post Job</Link>
                </li>
              )}
              <li>
                <Link to={getDashboardLink()} className="ml-2 btn btn-secondary">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="ml-2 btn btn-outline">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="ml-2 btn btn-outline">Login</Link>
              </li>
              <li>
                <Link to="/register" className="ml-2 btn btn-primary">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}


