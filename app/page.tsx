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
    <div className="relative bg-black text-white selection:bg-yellow-500 selection:text-black">
      <StickySection id="home" zIndex={10} transitionType="parallax" className="bg-yellow-500 text-black">
        <HeroSection />
      </StickySection>

      <StickySection id="clients" zIndex={15} transitionType="curtain" className="bg-[#111] border-b border-white/10" fitContent={true}>
        <ClientLogosSection />
      </StickySection>

      {/* Services - 不使用 StickySection，完全由 GSAP 控制 */}
      <ServicesSection />

      <StickySection id="process" zIndex={30} transitionType="mask-diagonal" className="bg-white text-black" fitContent={true}>
        <ProcessSection />
      </StickySection>

      <StickySection id="work" zIndex={40} transitionType="curtain" className="bg-[#111]">
        <CaseStudySection />
      </StickySection>

      <StickySection id="team" zIndex={45} transitionType="curtain" className="bg-[#E5E5E5] text-black">
        <TeamSection />
      </StickySection>

      <StickySection id="insights" zIndex={48} transitionType="curtain" className="bg-white text-black">
        <BlogSection />
      </StickySection>

      <StickySection id="contact" zIndex={50} transitionType="pixel-glitch" className="bg-black" fitContent={true}>
        <ContactSection />
      </StickySection>

      {/* Scroll Position Indicator */}
      <div className="fixed bottom-6 left-6 z-[100] hidden md:block mix-blend-difference pointer-events-none">
        <div className="flex flex-col gap-1 text-[10px] font-mono text-white">
          <span>MODE: INTERACTIVE</span>
        </div>
      </div>
    </div>
  );
}
