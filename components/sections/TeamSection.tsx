'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getAllTeamMembers } from '@/lib/data/team';
import ProfileCard from '@/components/ProfileCard';
import SpotlightCard from '@/components/SpotlightCard';
import AnimatedContent from '@/components/AnimatedContent';
import ShinyText from '@/components/ShinyText';
import BlurText from '@/components/BlurText';
import Aurora from '@/components/Aurora';
import Noise from '@/components/Noise';

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
      gsap.from('.team-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col justify-center relative overflow-hidden bg-[#111] text-white"
    >
      {/* Background Layer - Aurora */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Aurora
          colorStops={['#eab308', '#a855f7', '#0ea5e9']}
          speed={0.4}
          amplitude={1.2}
          blend={0.6}
        />
      </div>

      {/* Background Layer - Noise */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Noise patternAlpha={8} patternRefreshInterval={3} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 px-4 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
        {/* Header */}
        <div className="team-header flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 border-b border-white/10 pb-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="font-mono text-xs text-yellow-500 tracking-widest">/// THE_COLLECTIVE</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif mt-2">The Architects</h2>
          </div>
          <div className="hidden md:block text-right mt-4 md:mt-0">
            <p className="font-sans text-sm max-w-xs text-white/60">
              A distributed team of digital craftsmen, engineers, and strategists.
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center max-w-7xl mx-auto">

          {/* Left Profile Card */}
          <AnimatedContent
            distance={60}
            direction="horizontal"
            reverse={true}
            duration={0.8}
            className="order-1 lg:order-1"
          >
            <div className="w-full max-w-[320px] mx-auto lg:mx-0 lg:ml-auto">
              <SpotlightCard
                className="rounded-3xl"
                spotlightColor="rgba(234, 179, 8, 0.12)"
              >
                <ProfileCard
                  avatarUrl={team[0]?.img}
                  name={team[0]?.name}
                  title={team[0]?.role}
                  showUserInfo={true}
                  handle={team[0]?.name?.toLowerCase().replace(/[\s.]+/g, '')}
                  status="Available"
                  contactText="Connect"
                  onContactClick={() => window.open(team[0]?.linkedin, '_blank')}
                  enableTilt={true}
                  behindGlowEnabled={true}
                  behindGlowColor="rgba(234, 179, 8, 0.55)"
                  behindGlowSize="55%"
                  innerGradient="linear-gradient(145deg, rgba(96, 73, 110, 0.5) 0%, rgba(234, 179, 8, 0.15) 100%)"
                />
              </SpotlightCard>
            </div>
          </AnimatedContent>

          {/* Center Bios */}
          <div className="flex flex-col justify-center gap-10 max-w-md px-4 lg:px-8 order-3 lg:order-2">
            <div className="text-center lg:text-left">
              <ShinyText
                text={team[0]?.name || ''}
                className="font-serif text-xl mb-3 block"
                color="#eab308"
                shineColor="#fef08a"
                speed={2.5}
              />
              <BlurText
                text={team[0]?.bio || ''}
                className="text-white/70 text-sm leading-relaxed"
                delay={50}
                animateBy="words"
                direction="top"
              />
            </div>

            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto lg:mx-0" />

            <div className="text-center lg:text-left">
              <ShinyText
                text={team[1]?.name || ''}
                className="font-serif text-xl mb-3 block"
                color="#a855f7"
                shineColor="#e9d5ff"
                speed={2.5}
              />
              <BlurText
                text={team[1]?.bio || ''}
                className="text-white/70 text-sm leading-relaxed"
                delay={100}
                animateBy="words"
                direction="top"
              />
            </div>
          </div>

          {/* Right Profile Card */}
          <AnimatedContent
            distance={60}
            direction="horizontal"
            duration={0.8}
            delay={0.15}
            className="order-2 lg:order-3"
          >
            <div className="w-full max-w-[320px] mx-auto lg:mx-0 lg:mr-auto">
              <SpotlightCard
                className="rounded-3xl"
                spotlightColor="rgba(168, 85, 247, 0.12)"
              >
                <ProfileCard
                  avatarUrl={team[1]?.img}
                  name={team[1]?.name}
                  title={team[1]?.role}
                  showUserInfo={true}
                  handle={team[1]?.name?.toLowerCase().replace(/[\s.]+/g, '')}
                  status="Available"
                  contactText="Connect"
                  onContactClick={() => window.open(team[1]?.linkedin, '_blank')}
                  enableTilt={true}
                  behindGlowEnabled={true}
                  behindGlowColor="rgba(168, 85, 247, 0.5)"
                  behindGlowSize="55%"
                  innerGradient="linear-gradient(145deg, rgba(168, 85, 247, 0.3) 0%, rgba(34, 211, 238, 0.15) 100%)"
                />
              </SpotlightCard>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
};
