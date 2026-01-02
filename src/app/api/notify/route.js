// src/app/api/notify/route.js
import { NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// Rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(time => time > now - RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return true;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return false;
}

// ✅ Verify reCAPTCHA with GOOGLE (not Web3Forms)
async function verifyRecaptcha(token) {
  if (!RECAPTCHA_SECRET_KEY || !token) {
    console.log('reCAPTCHA skipped');
    return { success: true, score: 1 };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    console.log('Google reCAPTCHA result:', { success: data.success, score: data.score });
    
    return { success: data.success, score: data.score || 0 };
  } catch (error) {
    console.error('reCAPTCHA error:', error);
    return { success: false, score: 0 };
  }
}

export async function POST(request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'rate_limited', message: 'Too many requests.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, recaptchaToken } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'validation_error', message: 'Email required' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'validation_error', message: 'Invalid email' },
        { status: 400 }
      );
    }

    // ✅ Step 1: Verify reCAPTCHA with GOOGLE
    if (recaptchaToken && RECAPTCHA_SECRET_KEY) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      
      if (!recaptchaResult.success || recaptchaResult.score < RECAPTCHA_SCORE_THRESHOLD) {
        return NextResponse.json(
          { success: false, error: 'spam_detected', message: 'Security check failed' },
          { status: 403 }
        );
      }
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      return NextResponse.json(
        { success: false, error: 'config_error', message: 'Email not configured' },
        { status: 500 }
      );
    }

    // ✅ Step 2: Send to Web3Forms WITHOUT reCAPTCHA token!
    const emailResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: '🔔 New App Launch Notification - FINNOTIA',
        email: email,
        message: `New notification request!\n\nEmail: ${email}\nTime: ${new Date().toISOString()}`,
        // ❌ NO g-recaptcha-response here! That's a Pro feature!
      }),
    });

    const contentType = emailResponse.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Web3Forms returned non-JSON');
      return NextResponse.json(
        { success: false, error: 'api_error', message: 'Email service error' },
        { status: 500 }
      );
    }

    const emailResult = await emailResponse.json();
    console.log('Web3Forms result:', emailResult);

    if (emailResult.success) {
      return NextResponse.json({ success: true, message: 'You are on the list!' });
    } else {
      return NextResponse.json(
        { success: false, error: 'email_failed', message: emailResult.message || 'Failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Notify API error:', error);
    return NextResponse.json(
      { success: false, error: 'server_error', message: 'Server error' },
      { status: 500 }
    );
  }
}