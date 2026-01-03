'use client';

import { Check, AlertCircle, AlertTriangle, Clock, Bot } from 'lucide-react';

const statusConfig = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: Check,
    defaultMessage: '✓ Submitted successfully!',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: AlertCircle,
    defaultMessage: '✗ Something went wrong. Please try again.',
  },
  config_error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: AlertCircle,
    defaultMessage: '✗ Service not configured. Please try later.',
  },
  validation_error: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: AlertTriangle,
    defaultMessage: '⚠ Please fill all required fields.',
  },
  email_error: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: AlertTriangle,
    defaultMessage: '⚠ Please enter a valid email address.',
  },
  spam: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-800',
    icon: Bot,
    defaultMessage: '🤖 Security check failed. Please try again.',
  },
  rate_limited: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-800',
    icon: Clock,
    defaultMessage: '⏱ Too many requests. Please wait and try again.',
  },
};

/**
 * Reusable form status message component
 * @param {Object} props
 * @param {string} props.status - Status type
 * @param {string} props.message - Custom message (optional)
 * @param {string} props.className - Additional classes
 */
export function FormStatusMessage({ status, message, className = '' }) {
  if (!status || !statusConfig[status]) return null;

  const config = statusConfig[status];
  const Icon = config.icon;
  const displayMessage = message || config.defaultMessage;

  return (
    <div className={`mb-4 p-3 ${config.bg} border ${config.border} rounded-lg ${className}`}>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 flex-shrink-0" />
        <p className={`text-xs sm:text-sm ${config.text} font-semibold`}>
          {displayMessage}
        </p>
      </div>
    </div>
  );
}

export default FormStatusMessage;