'use client';

import { useState, useEffect, useCallback } from 'react';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/**
 * Custom hook for reCAPTCHA v3 integration
 * Handles script loading, token generation, and verification
 */
export function useRecaptcha() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Load reCAPTCHA script
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.log('⚠️ reCAPTCHA site key not configured');
      setIsLoaded(true);
      return;
    }

    if (window.grecaptcha) {
      window.grecaptcha.ready(() => setIsLoaded(true));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      window.grecaptcha.ready(() => {
        console.log('✅ reCAPTCHA loaded');
        setIsLoaded(true);
      });
    };
    
    script.onerror = () => {
      console.error('❌ Failed to load reCAPTCHA');
      setIsLoaded(true);
    };
    
    document.head.appendChild(script);
  }, []);

  /**
   * Verify user with reCAPTCHA
   * @param {string} action - The action name for reCAPTCHA analytics
   * @returns {Promise<{success: boolean, score?: number, error?: string}>}
   */
  const verify = useCallback(async (action = 'submit') => {
    if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) {
      return { success: true, score: 1 };
    }

    setIsVerifying(true);

    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      
      const response = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recaptchaToken: token }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Human verified, score:', result.score);
        return { success: true, score: result.score };
      } else {
        console.log('🤖 Bot detected');
        return { success: false, error: 'bot_detected' };
      }
    } catch (error) {
      console.error('❌ reCAPTCHA error:', error);
      return { success: true };
    } finally {
      setIsVerifying(false);
    }
  }, []);

  return {
    isLoaded,
    isVerifying,
    verify,
    siteKey: RECAPTCHA_SITE_KEY,
  };
}

export default useRecaptcha;