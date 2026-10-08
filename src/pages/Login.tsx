import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, clearError } from '../store/slices/authSlice';
import { LogIn, Mail, Lock } from 'lucide-react';
import Alert from '../components/Alert';
import Button from '../components/Button';
import InputField from '../components/InputField';
import AuthLayout from '../layouts/AuthLayout';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Memoized validation for performance
  const validate = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (!validate()) return;

    const result = await dispatch(login(formData));

    if (login.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your World Explorer account"
      icon={<LogIn className="w-8 h-8 text-white" />}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <InputField
          id="email"
          name="email"
          type="email"
          label="Email address"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          error={validationErrors.email}
          icon={Mail}
          autoComplete="email"
          required
        />

        <InputField
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={validationErrors.password}
          icon={Lock}
          autoComplete="current-password"
          required
        />

        {error && <Alert type="error" message={error} />}

        <div className="flex items-center justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>

        <Button
          type="submit"
          loading={loading}
          fullWidth
        >
          Sign in
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
            Create one now
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;