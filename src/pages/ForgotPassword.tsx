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
      errors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Format d\'email invalide';
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
        title="Vérifiez votre email"
        subtitle=""
        icon={<CheckCircle className="w-8 h-8 text-white" />}
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Nous avons envoyé un lien de réinitialisation du mot de passe à{' '}
            <span className="font-semibold text-gray-900">{formData.email}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Le lien expirera dans 24 heures. Si vous ne le recevez pas, vérifiez votre dossier spam.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full"
          >
            <Button
              icon={ArrowLeft}
              fullWidth
            >
              Retour à la connexion
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Réinitialiser votre mot de passe"
      subtitle="Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe"
      icon={<Mail className="w-8 h-8 text-white" />}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <InputField
          id="email"
          name="email"
          type="email"
          label="Adresse email"
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
          Envoyer le lien de réinitialisation
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

export default ForgotPassword;