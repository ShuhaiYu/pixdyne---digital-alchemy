import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { Resend } from 'resend';
import { ReportDocument } from '@/lib/seo-audit/ReportPdf';
import { reportPdfSchema } from '@/lib/seo-audit/schema';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { checkBotId } from 'botid/server';
import { BUSINESS } from '@/lib/data/business';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Cheap relative to a crawl (gated behind already having a report), so a
// slightly looser cap than /api/seo-audit. In-memory per warm instance.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

// Lead notification recipient + sender. Recipient is the canonical business
// email (§14.1 single source of truth — never hardcode). The sender uses the
// same Resend-bound infra subdomain as the contact form.
const LEAD_TO = BUSINESS.email;
const LEAD_FROM = `${BUSINESS.name} Audit <support@mail.pixdyne.com>`;

interface Lead {
  email: string;
  name?: string;
  domain: string;
  seoScore: number;
  geoScore: number;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Email the captured lead to info@pixdyne.com via Resend (reuses the contact
// form's RESEND_API_KEY). Reply-To is the lead so the team can respond
// directly. Wrapped so a mail failure never blocks the PDF download.
async function emailLead(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[seo-audit lead] RESEND_API_KEY not configured — lead not emailed');
    return;
  }
  try {
    const resend = new Resend(apiKey);
    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0B0A08;background:#F5F2ED;border-radius:8px;">
        <h2 style="font-family:Georgia,serif;font-style:italic;font-size:22px;margin:0 0 16px;color:#0B0A08;">New SEO &amp; GEO audit lead</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;width:90px;color:#8A847B;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(lead.email)}" style="color:#C8962A;text-decoration:none;">${escapeHtml(lead.email)}</a></td></tr>
          <tr><td style="padding:6px 0;color:#8A847B;">Domain</td><td style="padding:6px 0;">${escapeHtml(lead.domain)}</td></tr>
          <tr><td style="padding:6px 0;color:#8A847B;">SEO score</td><td style="padding:6px 0;">${lead.seoScore} / 100</td></tr>
          <tr><td style="padding:6px 0;color:#8A847B;">GEO score</td><td style="padding:6px 0;">${lead.geoScore} / 100</td></tr>
        </table>
        <p style="font-size:12px;color:#8A847B;margin-top:24px;">Captured from the free audit tool at pixdyne.com/free-seo-audit. Reply to this email to reach the lead.</p>
      </div>
    `;
    const text = [
      'New SEO & GEO audit lead',
      '',
      `Email:  ${lead.email}`,
      `Domain: ${lead.domain}`,
      `SEO:    ${lead.seoScore} / 100`,
      `GEO:    ${lead.geoScore} / 100`,
      '',
      '--',
      'Captured from pixdyne.com/free-seo-audit',
    ].join('\n');

    const { error } = await resend.emails.send({
      from: LEAD_FROM,
      to: [LEAD_TO],
      replyTo: lead.email,
      subject: `New SEO audit lead: ${lead.domain}`.slice(0, 200),
      text,
      html,
    });
    if (error) console.error('[seo-audit lead] Resend error:', error);
  } catch (e) {
    console.error('[seo-audit lead] email failed:', e);
  }
}

// Optional CRM/webhook forward (Zapier, HubSpot, Slack). No-ops when
// LEAD_WEBHOOK_URL is unset; never blocks the PDF.
async function forwardLeadWebhook(lead: Lead): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 5000);
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'seo-geo-audit', ...lead, at: new Date().toISOString() }),
      signal: controller.signal,
    });
    clearTimeout(id);
  } catch (e) {
    console.error('[seo-audit lead] webhook failed:', e);
  }
}

export async function POST(req: NextRequest) {
  const bot = await checkBotId();
  if (bot.isBot) {
    return NextResponse.json({ error: 'Automated access is not allowed.' }, { status: 403 });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`seo-audit-pdf:${ip}`, { windowMs: RATE_LIMIT_WINDOW_MS, max: RATE_LIMIT_MAX });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(limit.retryAfterSeconds),
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(limit.resetAt / 1000)),
        },
      }
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 });
  }
  const parsed = reportPdfSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid report data', issues: parsed.error.flatten() }, { status: 400 });
  }
  const { data, email, name } = parsed.data;

  const lead: Lead = { email, name, domain: data.domain, seoScore: data.seoScore, geoScore: data.geoScore };
  // Lead capture runs but must never block or fail the PDF download.
  await Promise.allSettled([emailLead(lead), forwardLeadWebhook(lead)]);

  try {
    const buffer = await renderToBuffer(ReportDocument({ data }));
    const safeName = data.domain.replace(/[^a-z0-9.-]/gi, '_');
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="pixdyne-seo-geo-${safeName}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('PDF render error:', err);
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 });
  }
}
