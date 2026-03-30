import { StickySection } from '@/components/layout/StickySection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ClientLogosSection } from '@/components/sections/ClientLogosSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CaseStudySection } from '@/components/sections/CaseStudySection';
import { TeamSection } from '@/components/sections/TeamSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <div className="relative bg-brand-black text-white selection:bg-brand-yellow selection:text-black">
      <StickySection id="home" zIndex={10} transitionType="parallax" className="bg-brand-yellow text-black" aria-label="Hero">
        <HeroSection />
      </StickySection>

      <StickySection id="clients" zIndex={15} transitionType="curtain" className="bg-brand-surface border-b border-white/10" fitContent={true} aria-label="Client logos">
        <ClientLogosSection />
      </StickySection>

      {/* Services - controlled by GSAP, not StickySection */}
      <ServicesSection />

      <StickySection
        id="process"
        zIndex={30}
        transitionType="mask-diagonal"
        className="bg-white text-black"
        fitContent={true}
        aria-label="Our process"
        peekBackground={
          <div className="absolute inset-0 bg-brand-black" />
        }
      >
        <ProcessSection />
      </StickySection>

      <StickySection id="work" zIndex={40} transitionType="curtain" className="bg-brand-black" aria-label="Selected works">
        <CaseStudySection />
      </StickySection>

      <StickySection id="team" zIndex={45} transitionType="curtain" className="bg-brand-light text-black" aria-label="Team">
        <TeamSection />
      </StickySection>

      <StickySection id="insights" zIndex={48} transitionType="curtain" className="bg-white text-black" aria-label="Blog and insights">
        <BlogSection />
      </StickySection>

      <StickySection id="contact" zIndex={50} transitionType="pixel-glitch" className="bg-brand-black" fitContent={true} aria-label="Contact">
        <ContactSection />
      </StickySection>

    </div>
  );
}
