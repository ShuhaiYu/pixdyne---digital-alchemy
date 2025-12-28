import { TeamMember } from '@/types';

export const team: TeamMember[] = [
  {
    name: 'Alex V.',
    role: 'Founder & Lead Arch',
    img: 'https://picsum.photos/400/500?random=20',
    bio: 'Former Google engineer with 15 years of experience building scalable systems.',
    linkedin: 'https://linkedin.com/in/alexv'
  },
  {
    name: 'Sarah J.',
    role: 'Creative Director',
    img: 'https://picsum.photos/400/500?random=21',
    bio: 'Award-winning designer specializing in digital brand experiences.',
    linkedin: 'https://linkedin.com/in/sarahj'
  },
  {
    name: 'David K.',
    role: 'Senior Developer',
    img: 'https://picsum.photos/400/500?random=22',
    bio: 'Full-stack developer passionate about performance optimization.',
    linkedin: 'https://linkedin.com/in/davidk'
  },
  {
    name: 'Elena R.',
    role: 'SEO Specialist',
    img: 'https://picsum.photos/400/500?random=23',
    bio: 'Data-driven SEO expert with a track record of 10x organic growth.',
    linkedin: 'https://linkedin.com/in/elenar'
  }
];

export function getAllTeamMembers(): TeamMember[] {
  return team;
}
