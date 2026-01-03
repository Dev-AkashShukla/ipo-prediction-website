'use client';

/**
 * reCAPTCHA privacy notice component
 * Shows Google's required privacy/terms links
 */
export function RecaptchaNotice({ className = '' }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  if (!siteKey) return null;

  return (
    <p className={`text-[10px] text-gray-400 text-center ${className}`}>
      Protected by reCAPTCHA •{' '}
      <a 
        href="https://policies.google.com/privacy" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="underline hover:text-gray-600"
      >
        Privacy
      </a>{' '}
      •{' '}
      <a 
        href="https://policies.google.com/terms" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="underline hover:text-gray-600"
      >
        Terms
      </a>
    </p>
  );
}

export default RecaptchaNotice;