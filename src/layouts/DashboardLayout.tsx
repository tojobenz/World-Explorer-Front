import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { 
  User, 
  Settings, 
  Shield, 
  Bell,
  LogOut,
  Home
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  active?: boolean;
}

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const navItems: NavItem[] = [
    { label: 'Dashboard', icon: Home, path: '/dashboard', active: true },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
    { label: 'Security', icon: Shield, path: '/security' },
    { label: 'Notifications', icon: Bell, path: '/notifications' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-10 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-indigo-600">World Explorer</h1>
          <p className="text-sm text-gray-500 mt-1">Your journey awaits</p>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 mt-6 px-3">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${
                item.active
                  ? 'bg-indigo-50 text-indigo-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;