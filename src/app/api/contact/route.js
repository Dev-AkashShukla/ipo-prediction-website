// src/app/api/contact/route.js
import { NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || '2f120dc1-db63-4c1a-ac3f-1d85612a6678';
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// Simple rate limiting (in-memory)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

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

async function verifyRecaptcha(token) {
  if (!RECAPTCHA_SECRET_KEY) {
    return { success: true, score: 1 }; // Skip if not configured
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
    return {
      success: data.success,
      score: data.score || 0,
    };
  } catch (error) {
    console.error('reCAPTCHA error:', error);
    return { success: false, score: 0 };
  }
}

export async function POST(request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    // Rate limit check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'rate_limited', message: 'Too many requests. Try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, recaptchaToken } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'validation_error', message: 'All fields required' },
        { status: 400 }
      );
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'validation_error', message: 'Invalid email' },
        { status: 400 }
      );
    }

    // reCAPTCHA verification
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      
      if (!recaptchaResult.success || recaptchaResult.score < RECAPTCHA_SCORE_THRESHOLD) {
        return NextResponse.json(
          { success: false, error: 'spam_detected', message: 'Security check failed' },
          { status: 403 }
        );
      }
    }

    // Send via Web3Forms
    const emailResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name: name,
        email: email,
        subject: `[FINNOTIA] ${subject}`,
        message: message,
      }),
    });

    const emailResult = await emailResponse.json();

    if (emailResult.success) {
      return NextResponse.json({ success: true, message: 'Message sent!' });
    } else {
      return NextResponse.json(
        { success: false, error: 'email_failed', message: 'Failed to send' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'server_error', message: 'Server error' },
      { status: 500 }
    );
  }
}