'use client';
import { GRADIENTS } from '../../lib/constants';

/**
 * Reusable Gradient Text Component
 * 
 * @param {string} variant - 'primary' | 'secondary' | 'hero'
 * @param {string} className - Additional classes
 * @param {React.ReactNode} children - Text content
 */
export default function GradientText({ 
  variant = 'hero', 
  className = '',
  children 
}) {
  const gradientClasses = {
    primary: GRADIENTS.primary,
    secondary: GRADIENTS.secondary,
    hero: GRADIENTS.hero,
  };

  return (
    <span 
      className={`bg-gradient-to-r ${gradientClasses[variant]} bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}