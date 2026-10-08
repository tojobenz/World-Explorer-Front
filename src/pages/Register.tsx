import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { register, clearError } from '../store/slices/authSlice';
import { UserPlus, Mail, Lock, User, Check } from 'lucide-react';
import { AuthLayout } from '../layouts';
import { InputField, Button, Alert } from '../components';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);

  // Memoized validation function for performance
  const validate = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = 'Password must contain at least one digit';
    } else if (!/[^a-zA-Z0-9]/.test(formData.password)) {
      errors.password = 'Password must contain at least one special character';
    }

    if (!formData.firstName) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.length > 50) {
      errors.firstName = 'First name must not exceed 50 characters';
    }

    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.length > 50) {
      errors.lastName = 'Last name must not exceed 50 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Calculate password strength
  const calculatePasswordStrength = useCallback((password: string) => {
    if (!password) {
      setPasswordStrength(null);
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) setPasswordStrength('weak');
    else if (strength <= 3) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (!validate()) return;

    const result = await dispatch(register(formData));

    if (register.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'weak': return 'Weak';
      case 'medium': return 'Medium';
      case 'strong': return 'Strong';
      default: return '';
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join World Explorer and start your journey"
      icon={<UserPlus className="w-8 h-8 text-white" />}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            id="firstName"
            name="firstName"
            type="text"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            error={validationErrors.firstName}
            icon={User}
            required
          />

          <InputField
            id="lastName"
            name="lastName"
            type="text"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            error={validationErrors.lastName}
            icon={User}
            required
          />
        </div>

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

        <div>
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
            autoComplete="new-password"
            required
          />
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Password strength</span>
                <span className={`text-xs font-medium ${
                  passwordStrength === 'weak' ? 'text-red-600' :
                  passwordStrength === 'medium' ? 'text-yellow-600' :
                  passwordStrength === 'strong' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                  style={{ width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : passwordStrength === 'strong' ? '100%' : '0%' }}
                />
              </div>
            </div>
          )}
          
          {/* Password Requirements */}
          <div className="mt-3 space-y-1.5">
            <p className="text-xs text-gray-500 font-medium">Password must contain:</p>
            <div className="grid grid-cols-2 gap-1.5">
              <div className={`flex items-center text-xs ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                8+ characters
              </div>
              <div className={`flex items-center text-xs ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                Uppercase
              </div>
              <div className={`flex items-center text-xs ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                Lowercase
              </div>
              <div className={`flex items-center text-xs ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                Number
              </div>
              <div className={`flex items-center text-xs ${/[^a-zA-Z0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                <Check className="w-3 h-3 mr-1" />
                Special char
              </div>
            </div>
          </div>
        </div>

        {error && <Alert type="error" message={error} />}

        <Button
          type="submit"
          loading={loading}
          fullWidth
        >
          Create account
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
            Sign in instead
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;