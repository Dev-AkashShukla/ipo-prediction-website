// src/app/api/contact/route.js
import { NextResponse } from 'next/server';

// ✅ Use server-side env variable (without NEXT_PUBLIC_ prefix for security)
const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// Rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
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

// ✅ Verify reCAPTCHA with GOOGLE
async function verifyRecaptcha(token) {
  if (!RECAPTCHA_SECRET_KEY || !token) {
    console.log('reCAPTCHA skipped - no secret key or token');
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
    const { name, email, subject, message, recaptchaToken } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'validation_error', message: 'All fields required' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'validation_error', message: 'Invalid email' },
        { status: 400 }
      );
    }

    // ✅ Step 1: Verify reCAPTCHA with GOOGLE (optional)
    if (recaptchaToken && RECAPTCHA_SECRET_KEY) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      
      if (!recaptchaResult.success || recaptchaResult.score < RECAPTCHA_SCORE_THRESHOLD) {
        return NextResponse.json(
          { success: false, error: 'spam_detected', message: 'Security check failed' },
          { status: 403 }
        );
      }
    }

    // ✅ Check if Web3Forms key exists
    if (!WEB3FORMS_ACCESS_KEY) {
      console.error('❌ WEB3FORMS_KEY not configured in environment variables');
      return NextResponse.json(
        { success: false, error: 'config_error', message: 'Email service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    console.log('📧 Sending to Web3Forms...');
    console.log('Access Key exists:', !!WEB3FORMS_ACCESS_KEY);
    console.log('Access Key length:', WEB3FORMS_ACCESS_KEY?.length);

    // ✅ Step 2: Send to Web3Forms
    const emailResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: name,
        email: email,
        subject: `[FINNOTIA Contact] ${subject}`,
        message: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        from_name: 'FINNOTIA Contact Form',
        replyto: email,
      }),
    });

    // ✅ Better error handling - log the actual response
    const responseText = await emailResponse.text();
    console.log('Web3Forms raw response:', responseText);
    console.log('Web3Forms status:', emailResponse.status);

    // Try to parse as JSON
    let emailResult;
    try {
      emailResult = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ Web3Forms returned non-JSON:', responseText.substring(0, 500));
      return NextResponse.json(
        { 
          success: false, 
          error: 'api_error', 
          message: 'Email service returned invalid response. Check server logs.',
          debug: process.env.NODE_ENV === 'development' ? responseText.substring(0, 200) : undefined
        },
        { status: 500 }
      );
    }

    console.log('Web3Forms parsed result:', emailResult);

    if (emailResult.success) {
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } else {
      console.error('❌ Web3Forms error:', emailResult);
      return NextResponse.json(
        { 
          success: false, 
          error: 'email_failed', 
          message: emailResult.message || 'Failed to send email' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'server_error', message: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}