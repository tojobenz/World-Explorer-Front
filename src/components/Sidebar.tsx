import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { Activity, Search, Star, Clock } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getActiveClass = (path: string) => {
    const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
    return isActive
      ? 'bg-indigo-50 text-indigo-600 font-medium'
      : 'text-gray-600 hover:bg-gray-50';
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-indigo-600">À découvrir</h1>
        <p className="text-sm text-gray-500 mt-1">Votre voyage vous attend</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3">
        <button
          onClick={() => navigate('/dashboard')}
          className={`w-full flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${getActiveClass('/dashboard')}`}
        >
          <Activity className="w-5 h-5 mr-3" />
          <span>Tableau de bord</span>
        </button>
        <button
          onClick={() => navigate('/explore')}
          className={`w-full flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${getActiveClass('/explore')}`}
        >
          <Search className="w-5 h-5 mr-3" />
          <span>Explorer</span>
        </button>
        <button
          onClick={() => navigate('/favorites')}
          className={`w-full flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${getActiveClass('/favorites')}`}
        >
          <Star className="w-5 h-5 mr-3" />
          <span>Favoris</span>
        </button>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Clock className="w-5 h-5 mr-3" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
