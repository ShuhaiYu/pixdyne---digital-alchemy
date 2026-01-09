import { TeamMember } from '@/types';

export const team: TeamMember[] = [
  {
    name: 'Felix Y.',
    role: 'Founder & Lead Arch',
    img: '/people/Felix_Yu.png',
    bio: 'Former Google engineer with 15 years of experience building scalable systems.',
    linkedin: 'https://linkedin.com/in/felixy'
  },
  {
    name: 'Edgar T.',
    role: 'Creative Director',
    img: '/people/Edgar_Tang.png',
    bio: 'Award-winning designer specializing in digital brand experiences.',
    linkedin: 'https://linkedin.com/in/edgart'
  }
];

export function getAllTeamMembers(): TeamMember[] {
  return team;
}
