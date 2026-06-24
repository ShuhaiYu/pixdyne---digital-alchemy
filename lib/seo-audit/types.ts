export interface CheckResult {
  name: string;
  detail: string;
  status: 'ok' | 'warn' | 'error';
}

export interface PageTableData {
  title: string;
  cols: string[];
  rows: string[][];
}

export interface DimensionData {
  num: string;
  group: 'SEO' | 'GEO';
  title: string;
  score: number;
  color: string;
  impact: string;
  issues: number;
  summary: string;
  checks: CheckResult[];
  pages?: PageTableData;
}

export interface LockedCard {
  num: string;
  group: 'SEO' | 'GEO';
  title: string;
  sub: string;
  scoreText: string;
  lines: string[];
  lockLabel: string;
  critical: boolean;
}

export interface AuditData {
  domain: string;
  pagesCrawled: number;
  pagesWithIssues: number;
  seoScore: number;
  geoScore: number;
  dimensions: Record<string, DimensionData>;
  fixPriority: FixItem[];
}

export interface FixItem {
  rank: number;
  issue: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'High' | 'Medium' | 'Low';
  howToFix: string;
}

export type Screen = 'landing' | 'scanning' | 'report' | 'dim';
export type FilterType = 'all' | 'seo' | 'geo' | 'critical';

// Live scan stream events (NDJSON) emitted by /api/audit?stream=1
export type ScanEvent =
  | { type: 'phase'; key: string; label: string; detail: string }
  | { type: 'progress'; pages: number; issues: number; total: number }
  | { type: 'done'; data: AuditData }
  | { type: 'error'; error: string };
