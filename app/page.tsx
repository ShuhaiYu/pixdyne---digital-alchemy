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

      <StickySection
        id="process"
        zIndex={30}
        transitionType="mask-diagonal"
        className="bg-white text-black"
        fitContent={true}
        peekBackground={
          <div className="absolute inset-0 bg-[#0a0a0a]">
            {/* 装饰性图案背景 */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 70% 60%, rgba(234, 179, 8, 0.15) 0%, transparent 50%),
                  linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '100% 100%, 60px 60px, 60px 60px'
              }}
            />
            {/* 大文字装饰 */}
            <div className="absolute bottom-20 right-20 text-[20vw] font-bold text-white/[0.02] leading-none select-none pointer-events-none">
              04
            </div>
            {/* 提示文字 */}
            <div className="absolute bottom-1/3 right-1/4 text-right">
              <span className="text-xs font-mono text-yellow-500/60 block mb-2">NEXT_SECTION</span>
              <span className="text-4xl md:text-6xl font-serif text-white/10">The Method</span>
            </div>
          </div>
        }
      >
        <ProcessSection />
      </StickySection>

      <StickySection id="work" zIndex={40} transitionType="curtain" className="bg-black">
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
