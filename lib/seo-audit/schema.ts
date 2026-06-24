// Zod request schemas for the Free SEO Audit API routes. Per the workspace
// coding-style rule, untrusted input at system boundaries is validated with
// Zod (schema-based) rather than hand-rolled regex / property checks.
//
// The report-pdf body comes straight from the browser and is rendered to a PDF
// server-side, so every collection and string is BOUNDED — an unbounded
// AuditData (huge dimensions map / checks arrays / strings) would let an
// attacker drive expensive renderToBuffer work as a DoS.

import { z } from 'zod';

const MAX_DIMENSIONS = 30;
const MAX_CHECKS = 40;
const MAX_FIXES = 40;
const MAX_ROWS = 60;

const checkSchema = z.object({
  name: z.string().max(300),
  detail: z.string().max(300),
  status: z.enum(['ok', 'warn', 'error']),
});

const pageTableSchema = z.object({
  title: z.string().max(200),
  cols: z.array(z.string().max(120)).max(12),
  rows: z.array(z.array(z.string().max(500)).max(12)).max(MAX_ROWS),
});

const dimensionSchema = z.object({
  num: z.string().max(10),
  group: z.enum(['SEO', 'GEO']),
  title: z.string().max(200),
  score: z.number(),
  color: z.string().max(40),
  impact: z.string().max(60),
  issues: z.number(),
  summary: z.string().max(1000),
  checks: z.array(checkSchema).max(MAX_CHECKS),
  pages: pageTableSchema.optional(),
});

const fixSchema = z.object({
  rank: z.number(),
  issue: z.string().max(300),
  impact: z.enum(['High', 'Medium', 'Low']),
  effort: z.enum(['High', 'Medium', 'Low']),
  howToFix: z.string().max(1000),
});

export const auditDataSchema = z.object({
  domain: z.string().max(255),
  pagesCrawled: z.number(),
  pagesWithIssues: z.number(),
  seoScore: z.number(),
  geoScore: z.number(),
  dimensions: z
    .record(z.string().max(60), dimensionSchema)
    .refine((d) => Object.keys(d).length <= MAX_DIMENSIONS, { message: 'too many dimensions' }),
  fixPriority: z.array(fixSchema).max(MAX_FIXES),
});

// GET /api/seo-audit?domain=…
export const auditQuerySchema = z.object({
  domain: z.string().trim().min(1).max(255),
});

// POST /api/seo-audit/report-pdf
export const reportPdfSchema = z.object({
  data: auditDataSchema,
  email: z.string().trim().email().max(254),
  name: z.string().trim().max(120).optional(),
});
