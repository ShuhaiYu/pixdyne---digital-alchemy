'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getAllServices } from '@/lib/data/services';
import ShinyText from '@/components/ShinyText';
import CountUp from '@/components/CountUp';
import SpotlightCard from '@/components/SpotlightCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 自定义 hook 检测是否为移动端
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const services = getAllServices();
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    // 移动端不使用水平滚动动画
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const list = listRef.current;
      if (!section || !container || !list) return;

      // 计算水平滚动距离
      const scrollWidth = list.scrollWidth - container.offsetWidth;

      // pin section，水平滚动服务列表（带 snap 吸附效果）
      const numServices = services.length;

      gsap.to(list, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollWidth}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          // Snap 吸附配置：滚动停止时自动吸附到最近的卡片
          snap: {
            snapTo: 1 / (numServices - 1),  // 将进度分成 n 等份
            duration: { min: 0.2, max: 0.5 },  // 吸附动画时长
            ease: 'power2.inOut'  // 平滑缓入缓出
          },
          onEnter: () => gsap.set(section, { zIndex: 100 }),
          onLeave: () => gsap.set(section, { zIndex: 20 }),
          onEnterBack: () => gsap.set(section, { zIndex: 100 }),
          onLeaveBack: () => gsap.set(section, { zIndex: 20 }),
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`relative w-full bg-[#050505] text-white ${isMobile ? 'min-h-screen h-auto overflow-visible' : 'h-screen overflow-hidden'}`}
      style={{ zIndex: 20 }}
    >
      <div className={`w-full ${isMobile ? 'flex flex-col' : 'h-full flex flex-row'}`}>
        {/* 左侧 - 标题区域 */}
        <div className={`w-full ${isMobile ? 'p-6 pt-24 pb-8' : 'md:w-1/3 h-full pt-28 p-12'} border-b md:border-b-0 md:border-r border-white/20 flex flex-col justify-between flex-shrink-0`}>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic mb-4 md:mb-6">Capabilities</h2>
            <p className="font-sans text-sm text-gray-400 max-w-xs leading-relaxed">
              We bridge the gap between aesthetic excellence and technical robustness.
              Our toolkit is vast, our precision is absolute.
            </p>
          </div>
          <div className="hidden md:block text-xs font-mono text-yellow-500">
            /// SERVICE_INDEX_V1.0
          </div>
        </div>

        {/* 右侧 - 服务列表 */}
        <div
          ref={containerRef}
          className={`w-full ${isMobile ? 'flex-1' : 'md:w-2/3 h-full overflow-hidden'}`}
        >
          <div
            ref={listRef}
            className={`${isMobile ? 'flex flex-col' : 'flex flex-row h-full'}`}
          >
            {services.map((service, index) => (
              <SpotlightCard
                key={service.id}
                spotlightColor="rgba(234, 179, 8, 0.15)"
                className={`service-item group flex-shrink-0 flex flex-col justify-center p-6 sm:p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/20 hover:bg-white/5 transition-colors cursor-pointer ${isMobile ? 'w-full min-h-[70vh]' : 'h-full'}`}
                style={isMobile ? undefined : { width: 'calc(66.67vw)' }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="absolute inset-0 z-20"
                  aria-label={`View ${service.title} service`}
                />
                {/* 背景网格装饰 */}
                <div className="absolute inset-0 opacity-100 pointer-events-none">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px'
                    }}
                  />
                </div>

                {/* 渐变光晕装饰 */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-yellow-500/10 transition-colors duration-700" />

                {/* 内容区域 */}
                <div className="relative z-10">
                  {/* 标题行 */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
                    <div className="flex items-baseline gap-3 sm:gap-6">
                      <span className="text-xs font-mono text-yellow-500">({service.number})</span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold uppercase tracking-tight">
                        <ShinyText
                          text={service.title}
                          speed={3}
                          color="#ffffff"
                          shineColor="#eab308"
                          className="group-hover:text-yellow-500 transition-colors"
                        />
                      </h3>
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-white/50 border border-white/20 px-2 sm:px-3 py-1 rounded group-hover:bg-yellow-500 group-hover:text-black group-hover:border-yellow-500 transition-all w-fit">
                      {service.price}
                    </span>
                  </div>

                  {/* 描述 */}
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-lg mb-6 sm:mb-8 ml-0 sm:ml-8 md:ml-12 group-hover:text-white transition-colors">
                    {service.description}
                  </p>

                  {/* 统计数据 */}
                  <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 ml-0 sm:ml-8 md:ml-12 mb-6 sm:mb-8">
                    <div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-baseline">
                        <CountUp to={service.stats.projects} duration={2} className="tabular-nums" />
                        <span className="text-yellow-500">+</span>
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Projects Delivered</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-baseline">
                        <CountUp to={service.stats.satisfaction} duration={2} className="tabular-nums" />
                        <span className="text-yellow-500">%</span>
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Client Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                        {service.stats.support}
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Support Available</div>
                    </div>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 ml-0 sm:ml-8 md:ml-12 mb-4">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-xs uppercase border border-white/20 px-2 sm:px-3 py-1 rounded-full hover:border-yellow-500/50 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <span className="text-xs font-mono text-yellow-500 ml-0 sm:ml-8 md:ml-12 opacity-0 group-hover:opacity-100 transition-opacity">
                    EXPLORE_SERVICE →
                  </span>
                </div>

                {/* 进度指示器 */}
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 flex items-center gap-2">
                  <span className="text-xs font-mono text-white/30">
                    {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                  </span>
                  <div className="w-16 h-[1px] bg-white/20">
                    <div
                      className="h-full bg-yellow-500"
                      style={{ width: `${((index + 1) / services.length) * 100}%` }}
                    />
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-xs font-mono text-white/30">
        <span>SCROLL</span>
        <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </section>
  );
};
