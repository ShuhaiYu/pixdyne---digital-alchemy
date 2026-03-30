'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getAllTeamMembers } from '@/lib/data/team';
import ProfileCard from '@/components/ProfileCard';
import SpotlightCard from '@/components/SpotlightCard';
import AnimatedContent from '@/components/AnimatedContent';
import BlurText from '@/components/BlurText';
import Aurora from '@/components/Aurora';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const team = getAllTeamMembers();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    if (!section) return;

    if (isMobile) {
      // On mobile, use IntersectionObserver
      const header = section.querySelector('.team-header');
      if (!header) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.from(header, { y: 30, opacity: 0, duration: 0.8 });
            observer.unobserve(section);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
      return () => observer.disconnect();
    }

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
  }, [isMobile]);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col justify-center relative bg-brand-surface text-white overflow-x-hidden overflow-y-visible"
    >
      {/* Background Layer - Aurora (desktop only, heavy WebGL) */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 opacity-10">
          <Aurora
            colorStops={['#C8962A', '#9B6B3E', '#E8E4DD']}
            speed={0.3}
            amplitude={0.8}
            blend={0.4}
          />
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-10 px-4 pt-20 pb-12 sm:pt-16 sm:pb-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
        {/* Header */}
        <div className="team-header flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-8 md:mb-12 border-b border-white/10 pb-4 sm:pb-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="font-mono text-xs font-bold text-brand-yellow tracking-widest uppercase">Team</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif leading-tight mt-2">The Architects</h2>
          </div>
          <div className="hidden md:block text-right mt-4 md:mt-0">
            <p className="font-sans text-sm max-w-xs text-white/60">
              A distributed team of digital craftsmen, engineers, and strategists.
            </p>
          </div>
        </div>

        {/* Mobile: horizontal scroll / Desktop: grid layout */}
        {/* Mobile horizontal scroll */}
        <div className="lg:hidden overflow-x-auto overflow-y-visible scrollbar-hide pt-2 pb-6">
          <div className="flex gap-4 px-4 w-max">
            {/* Card 1 */}
            <div className="w-[240px] sm:w-[260px] flex-shrink-0 pb-4">
              <SpotlightCard
                className="rounded-3xl"
                spotlightColor="rgba(200, 150, 42, 0.12)"
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
                  behindGlowColor="rgba(200, 150, 42, 0.55)"
                  behindGlowSize="55%"
                  innerGradient="linear-gradient(145deg, rgba(96, 73, 110, 0.5) 0%, rgba(200, 150, 42, 0.15) 100%)"
                />
              </SpotlightCard>
            </div>
            {/* Card 2 */}
            <div className="w-[240px] sm:w-[260px] flex-shrink-0 pb-4">
              <SpotlightCard
                className="rounded-3xl"
                spotlightColor="rgba(155, 107, 62, 0.12)"
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
                  behindGlowColor="rgba(155, 107, 62, 0.5)"
                  behindGlowSize="55%"
                  innerGradient="linear-gradient(145deg, rgba(155, 107, 62, 0.3) 0%, rgba(200, 150, 42, 0.15) 100%)"
                />
              </SpotlightCard>
            </div>
          </div>
          {/* Scroll hint for mobile */}
          <div className="lg:hidden text-center mt-2">
            <span className="text-xs font-mono text-white/30">swipe →</span>
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-12 items-center max-w-7xl mx-auto">

          {/* Left Profile Card */}
          <AnimatedContent
            distance={60}
            direction="horizontal"
            reverse={true}
            duration={0.8}
          >
            <div className="w-full max-w-[320px] ml-auto">
              <SpotlightCard
                className="rounded-3xl"
                spotlightColor="rgba(200, 150, 42, 0.12)"
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
                  behindGlowColor="rgba(200, 150, 42, 0.55)"
                  behindGlowSize="55%"
                  innerGradient="linear-gradient(145deg, rgba(96, 73, 110, 0.5) 0%, rgba(200, 150, 42, 0.15) 100%)"
                />
              </SpotlightCard>
            </div>
          </AnimatedContent>

          {/* Center Bios */}
          <div className="flex flex-col justify-center gap-10 max-w-md px-8">
            <div className="text-center lg:text-left">
              <span className="font-serif text-xl mb-3 block text-brand-yellow">
                {team[0]?.name || ''}
              </span>
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
              <span className="font-serif text-xl mb-3 block text-brand-muted">
                {team[1]?.name || ''}
              </span>
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
          >
            <div className="w-full max-w-[320px] mr-auto">
              <SpotlightCard
                className="rounded-3xl"
                spotlightColor="rgba(155, 107, 62, 0.12)"
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
                  behindGlowColor="rgba(155, 107, 62, 0.5)"
                  behindGlowSize="55%"
                  innerGradient="linear-gradient(145deg, rgba(155, 107, 62, 0.3) 0%, rgba(200, 150, 42, 0.15) 100%)"
                />
              </SpotlightCard>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
};
