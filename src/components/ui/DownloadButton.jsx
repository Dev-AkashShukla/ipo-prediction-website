'use client';
import { Download } from 'lucide-react';
import { PLAY_STORE_URL, GRADIENTS } from '../../lib/constants';

/**
 * Reusable Download Button Component
 * 
 * @param {string} variant - 'primary' | 'secondary' | 'white'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} className - Additional classes
 * @param {boolean} showIcon - Show download icon
 * @param {string} text - Button text
 */
export default function DownloadButton({ 
  variant = 'primary', 
  size = 'md',
  className = '',
  showIcon = true,
  text = 'Download from PlayStore'
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95';
  
  const variants = {
    primary: `bg-gradient-to-r ${GRADIENTS.primary} text-white`,
    secondary: 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#2E5CB8] hover:text-[#2E5CB8]',
    white: 'bg-white text-[#2E5CB8] hover:shadow-xl hover:bg-gray-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <span>{text}</span>
      {showIcon && (
        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
      )}
    </a>
  );
}

/**
 * Simple text link to Play Store
 */
export function DownloadLink({ className = '', children = 'Download App' }) {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-[#2E5CB8] hover:text-[#4A90E2] font-semibold transition-colors duration-300 ${className}`}
    >
      {children}
    </a>
  );
}