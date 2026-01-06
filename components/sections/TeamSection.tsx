'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getAllTeamMembers } from '@/lib/data/team';
import ProfileCard from '@/components/ProfileCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const team = getAllTeamMembers();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.team-member', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="h-full w-full flex flex-col p-8 pt-24 md:p-12 md:pt-28 bg-[#111] text-white">
      <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs text-yellow-500 tracking-widest">/// THE_COLLECTIVE</span>
          <h2 className="text-4xl md:text-6xl font-serif mt-2">The Architects</h2>
        </div>
        <div className="hidden md:block text-right">
          <p className="font-sans text-sm max-w-xs text-white/60">
            A distributed team of digital craftsmen, engineers, and strategists.
          </p>
        </div>
      </div>

      <div className="flex flex-nowrap justify-center gap-8 h-full pb-12 overflow-x-auto px-4">
        {team.map((member, i) => {
          const offsets = ['mt-0', 'mt-16', 'mt-8', 'mt-24'];
          return (
            <div
              key={i}
              className={`team-member w-[320px] min-w-[280px] flex-shrink-0 ${offsets[i % 4]} transition-transform hover:scale-[1.02]`}
            >
              <ProfileCard
                avatarUrl={member.img}
                name={member.name}
                title={member.role}
                showUserInfo={false}
                behindGlowEnabled={true}
                behindGlowColor="rgba(234, 179, 8, 0.5)"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
