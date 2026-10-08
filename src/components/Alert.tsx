import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type AlertType = 'error' | 'success' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const alertConfig = {
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
    },
  };

  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div className={`rounded-lg ${config.bgColor} border ${config.borderColor} p-4 relative`}>
      <div className="flex items-center">
        <Icon className={`w-4 h-4 mr-2 ${config.textColor}`} />
        <p className={`text-sm ${config.textColor}`}>{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-auto ${config.textColor} hover:opacity-70 transition-opacity`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;