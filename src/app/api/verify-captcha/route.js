// src/app/api/verify-captcha/route.js
// This ONLY verifies reCAPTCHA with Google - does NOT call Web3Forms
import { NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// Rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 10;

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

export async function POST(request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'rate_limited', message: 'Too many requests' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { recaptchaToken } = body;

    // If no secret key configured, skip verification
    if (!RECAPTCHA_SECRET_KEY) {
      console.log('⚠️ RECAPTCHA_SECRET_KEY not set, skipping verification');
      return NextResponse.json({ success: true, score: 1, message: 'Verification skipped' });
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, error: 'no_token', message: 'No reCAPTCHA token provided' },
        { status: 400 }
      );
    }

    // Verify with Google
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      }),
    });

    const data = await response.json();
    console.log('✅ Google reCAPTCHA result:', { success: data.success, score: data.score });

    if (data.success && data.score >= RECAPTCHA_SCORE_THRESHOLD) {
      return NextResponse.json({ 
        success: true, 
        score: data.score, 
        message: 'Human verified' 
      });
    } else {
      console.log('🤖 Bot detected! Score:', data.score);
      return NextResponse.json(
        { success: false, score: data.score || 0, message: 'Bot detected' },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error('❌ Verify captcha error:', error);
    return NextResponse.json(
      { success: false, error: 'server_error', message: 'Verification failed' },
      { status: 500 }
    );
  }
}