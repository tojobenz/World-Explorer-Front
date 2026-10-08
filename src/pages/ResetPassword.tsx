import React, { useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { resetPassword, clearError } from '../store/slices/authSlice';
import { Lock, ArrowLeft, CheckCircle, Check } from 'lucide-react';
import { AuthLayout } from '../layouts';
import { InputField, Button, Alert } from '../components';

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    email: '',
    token: searchParams.get('token') || '',
    newPassword: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);

  // Memoized validation for performance
  const validate = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }

    if (!formData.token) {
      errors.token = 'Le jeton est requis';
    }

    if (!formData.newPassword) {
      errors.newPassword = 'Le mot de passe est requis';
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      errors.newPassword = 'Le mot de passe doit contenir au moins une majuscule';
    } else if (!/[a-z]/.test(formData.newPassword)) {
      errors.newPassword = 'Le mot de passe doit contenir au moins une minuscule';
    } else if (!/[0-9]/.test(formData.newPassword)) {
      errors.newPassword = 'Le mot de passe doit contenir au moins un chiffre';
    } else if (!/[^a-zA-Z0-9]/.test(formData.newPassword)) {
      errors.newPassword = 'Le mot de passe doit contenir au moins un caractère spécial';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
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
    
    if (name === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (!validate()) return;

    const result = await dispatch(
      resetPassword({
        email: formData.email,
        token: formData.token,
        newPassword: formData.newPassword,
      })
    );

    if (resetPassword.fulfilled.match(result)) {
      setIsSuccess(true);
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
      case 'weak': return 'Faible';
      case 'medium': return 'Moyen';
      case 'strong': return 'Fort';
      default: return '';
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <AuthLayout
        title="Réinitialisation du mot de passe réussie"
        subtitle=""
        icon={<CheckCircle className="w-8 h-8 text-white" />}
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full"
          >
            <Button
              icon={ArrowLeft}
              fullWidth
            >
              Se connecter à votre compte
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Définir un nouveau mot de passe"
      subtitle="Entrez votre email et votre nouveau mot de passe pour réinitialiser votre compte"
      icon={<Lock className="w-8 h-8 text-white" />}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <InputField
          id="email"
          name="email"
          type="email"
          label="Adresse email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          error={validationErrors.email}
          icon={Lock}
          autoComplete="email"
          required
        />

        <InputField
          id="token"
          name="token"
          type="text"
          label="Jeton de réinitialisation"
          value={formData.token}
          onChange={handleChange}
          placeholder="Entrez votre jeton de réinitialisation"
          error={validationErrors.token}
          required
        />

        <div>
          <InputField
            id="newPassword"
            name="newPassword"
            type="password"
            label="Nouveau mot de passe"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="••••••••"
            error={validationErrors.newPassword}
            icon={Lock}
            autoComplete="new-password"
            required
          />
          
          {/* Password Strength Indicator */}
          {formData.newPassword && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Force du mot de passe</span>
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
        </div>

        <div>
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirmer le nouveau mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            error={validationErrors.confirmPassword}
            icon={Lock}
            autoComplete="new-password"
            required
          />
          
          {/* Password Match Indicator */}
          {formData.confirmPassword && (
            <div className={`mt-2 text-xs flex items-center ${
              formData.newPassword === formData.confirmPassword ? 'text-green-600' : 'text-red-600'
            }`}>
              {formData.newPassword === formData.confirmPassword ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Les mots de passe correspondent
                </>
              ) : (
                <>
                  Les mots de passe ne correspondent pas
                </>
              )}
            </div>
          )}
        </div>

        {error && <Alert type="error" message={error} />}

        <Button
          type="submit"
          loading={loading}
          fullWidth
        >
          Réinitialiser le mot de passe
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link 
          to="/login" 
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Retour à la connexion
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;