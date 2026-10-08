import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { forgotPassword, clearError } from '../store/slices/authSlice';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { AuthLayout } from '../layouts';
import { InputField, Button, Alert } from '../components';

const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Memoized validation for performance
  const validate = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (!validate()) return;

    const result = await dispatch(forgotPassword(formData));

    if (forgotPassword.fulfilled.match(result)) {
      setIsSubmitted(true);
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle=""
        icon={<CheckCircle className="w-8 h-8 text-white" />}
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to{' '}
            <span className="font-semibold text-gray-900">{formData.email}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            The link will expire in 24 hours. If you don't receive it, check your spam folder.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full"
          >
            <Button
              icon={ArrowLeft}
              fullWidth
            >
              Back to sign in
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a link to reset your password"
      icon={<Mail className="w-8 h-8 text-white" />}
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

        {error && <Alert type="error" message={error} />}

        <Button
          type="submit"
          loading={loading}
          fullWidth
        >
          Send reset link
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link 
          to="/login" 
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;