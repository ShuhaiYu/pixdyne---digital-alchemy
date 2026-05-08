import { TeamMember } from '@/types';

// Team identities are intentionally not published.
// See CLAUDE.md §6 (Content Constraints, rule 1) and AGENTS.md §2.1.
// The homepage section formerly populated from this list has been
// repurposed as "How we work" — see components/sections/TeamSection.tsx.
// Leave as an empty array. Do not add personal names, photos, or bios
// without explicit owner approval.
export const team: TeamMember[] = [];

export function getAllTeamMembers(): TeamMember[] {
  return team;
}
