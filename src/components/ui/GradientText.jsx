'use client';
// src/components/ui/GradientText.jsx
// ── Single blue gradient — no purple/pink ───────────────────────

/**
 * @param {'blue'|'light'} variant
 */
export default function GradientText({ variant = 'blue', className = '', children }) {
  const gradients = {
    blue:  'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
    light: 'linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%)',
  };

  return (
    <span
      className={`text-transparent bg-clip-text ${className}`}
      style={{ backgroundImage: gradients[variant] ?? gradients.blue }}
    >
      {children}
    </span>
  );
}