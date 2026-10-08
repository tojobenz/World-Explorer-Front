import React from 'react';

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  icon?: React.ElementType;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  autoComplete,
  required = false,
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={`block w-full ${Icon ? 'pl-10' : 'px-3'} pr-3 py-3 border ${
            error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
          } rounded-lg focus:outline-none focus:ring-2 transition-colors placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;