import { CaseStudyItem } from '@/types';

// Case studies are pending the owner-provided historical project list.
// See CLAUDE.md §6 (Content Constraints, rule 2) and §13 (Decisions Log).
// The homepage CaseStudySection and /work index render a "Coming soon"
// empty state while this list is empty. Do not add specific client names
// or projects without owner approval in the same session.
export const caseStudies: CaseStudyItem[] = [];

export function getAllCaseStudies(): CaseStudyItem[] {
  return caseStudies;
}

export function getFeaturedCaseStudies(limit: number = 8): CaseStudyItem[] {
  return caseStudies.slice(0, limit);
}

export function getCaseStudyBySlug(slug: string): CaseStudyItem | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
