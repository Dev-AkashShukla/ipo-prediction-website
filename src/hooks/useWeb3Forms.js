'use client';

import { useState, useCallback } from 'react';

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/**
 * Custom hook for Web3Forms submission
 * Handles form submission with automatic key injection
 */
export function useWeb3Forms() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  /**
   * Submit form data to Web3Forms
   * @param {Object} data - Form data object
   * @param {Object} options - Additional options
   * @param {string} options.subject - Email subject
   * @param {string} options.fromName - From name in email
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  const submit = useCallback(async (data, options = {}) => {
    if (!WEB3FORMS_KEY) {
      console.error('❌ WEB3FORMS_KEY not configured');
      setStatus('config_error');
      return { success: false, error: 'config_error' };
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      console.log('📧 Sending to Web3Forms...');
      
      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_KEY);
      
      // Add optional fields
      if (options.subject) formData.append('subject', options.subject);
      if (options.fromName) formData.append('from_name', options.fromName);
      
      // Add all data fields
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Web3Forms result:', result);

      if (result.success) {
        setStatus('success');
        return { success: true };
      } else {
        console.error('❌ Web3Forms error:', result);
        setStatus('error');
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('❌ Submission error:', error);
      setStatus('error');
      return { success: false, error: 'network_error' };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const resetStatus = useCallback(() => {
    setStatus(null);
  }, []);

  return {
    submit,
    isSubmitting,
    status,
    resetStatus,
    isConfigured: !!WEB3FORMS_KEY,
  };
}

export default useWeb3Forms;