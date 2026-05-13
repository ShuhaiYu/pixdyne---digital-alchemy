import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const CONTACT_TO = 'info@pixdyne.com';
const CONTACT_FROM = 'Pixdyne Contact <support@mail.pixdyne.com>';
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmail(data: ContactFormData) {
  const subject = `New enquiry from ${data.name}`.slice(0, 200);

  const text = [
    `New contact form submission`,
    ``,
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    ``,
    `Message:`,
    data.message,
    ``,
    `--`,
    `Sent from pixdyne.com/contact`
  ].join('\n');

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0B0A08;background:#F5F2ED;border-radius:8px;">
      <h2 style="font-family:Georgia,serif;font-style:italic;font-size:22px;margin:0 0 16px;color:#0B0A08;">New enquiry from pixdyne.com</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;width:80px;color:#8A847B;">Name</td><td style="padding:6px 0;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#8A847B;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#C8962A;text-decoration:none;">${escapeHtml(data.email)}</a></td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #d9d4cb;margin:18px 0;" />
      <div style="font-size:12px;color:#8A847B;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Message</div>
      <div style="white-space:pre-wrap;font-size:15px;line-height:1.6;color:#0B0A08;">${escapeHtml(data.message)}</div>
      <p style="font-size:12px;color:#8A847B;margin-top:24px;">Reply directly to this email to respond to the sender.</p>
    </div>
  `;

  return { subject, text, html };
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(`contact:${ip}`, {
      windowMs: RATE_LIMIT_WINDOW_MS,
      max: RATE_LIMIT_MAX
    });

    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(limit.retryAfterSeconds),
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(limit.resetAt / 1000))
          }
        }
      );
    }

    const data = (await request.json()) as Partial<ContactFormData>;

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (data.name.length > 100 || data.email.length > 254 || data.message.length > 5000) {
      return NextResponse.json(
        { error: 'Field length exceeded' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    const payload: ContactFormData = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim()
    };

    const resend = new Resend(apiKey);
    const { subject, text, html } = buildEmail(payload);

    const { data: sent, error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      replyTo: payload.email,
      subject,
      text,
      html
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: sent?.id,
        message: 'Thank you for your message. We will get back to you soon!'
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
