import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppRoutes from './routes';
import { refreshToken } from './store/slices/authSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem('token');
      const refreshTokenValue = localStorage.getItem('refreshToken');

      if (!token || !refreshTokenValue) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp;
        const isExpired = !exp || Date.now() >= exp * 1000;

        if (isExpired) {
          dispatch(refreshToken(refreshTokenValue));
        }
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }
    };

    checkTokenValidity();
  }, [dispatch]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;