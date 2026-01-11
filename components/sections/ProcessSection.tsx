'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from '@/components/SplitText';
import AnimatedContent from '@/components/AnimatedContent';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 流程步骤数据
const processSteps = [
  { label: 'Discovery', time: 'Wk 01', desc: 'Research & Analysis' },
  { label: 'Architect', time: 'Wk 02', desc: 'System Design' },
  { label: 'Development', time: 'Wk 03-05', desc: 'Agile Iteration' },
  { label: 'Launch', time: 'Wk 06', desc: 'Deploy & Optimize' },
];

// 混沌变换 - 每个卡片的旋转和偏移
const chaosTransforms = [
  { rotate: -6, x: 15, y: -10 },
  { rotate: 4, x: -12, y: 12 },
  { rotate: -3, x: 8, y: -15 },
  { rotate: 5, x: -10, y: 8 },
];

// 随机装饰点位置
const decorativeElements = [
  { top: '10%', left: '5%', size: 4 },
  { top: '25%', left: '92%', size: 6 },
  { top: '60%', left: '8%', size: 3 },
  { top: '75%', left: '88%', size: 5 },
  { top: '40%', left: '50%', size: 2 },
  { top: '85%', left: '15%', size: 4 },
  { top: '15%', left: '70%', size: 3 },
  { top: '55%', left: '95%', size: 5 },
];

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const cards = cardsRef.current.filter(Boolean);
      const path = pathRef.current;
      const dots = dotsRef.current.filter(Boolean);

      if (!section || cards.length === 0) return;

      // 装饰点动画
      dots.forEach((dot, i) => {
        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 0.3,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            }
          }
        );
      });

      // 卡片入场动画 - 从随机方向飞入到"混沌"位置
      cards.forEach((card, i) => {
        const transform = chaosTransforms[i];
        const startX = (Math.random() - 0.5) * 200;
        const startY = 100 + Math.random() * 50;
        const startRotate = (Math.random() - 0.5) * 30;

        gsap.fromTo(card,
          {
            x: startX,
            y: startY,
            rotation: startRotate,
            opacity: 0,
            scale: 0.8
          },
          {
            x: transform.x,
            y: transform.y,
            rotation: transform.rotate,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              once: true,
            }
          }
        );
      });

      // SVG 路径描边动画
      if (path) {
        const pathLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          delay: 0.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            once: true,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full flex items-center justify-center p-4 sm:p-6 md:p-8 py-16 sm:py-20 md:py-24 relative overflow-hidden"
    >
      {/* 背景网格 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 装饰点 */}
      {decorativeElements.map((el, i) => (
        <div
          key={i}
          ref={(node) => { dotsRef.current[i] = node; }}
          className="absolute rounded-full bg-yellow-500"
          style={{
            top: el.top,
            left: el.left,
            width: el.size,
            height: el.size,
          }}
        />
      ))}

      {/* 装饰十字 */}
      <div className="absolute top-[20%] right-[10%] opacity-10 pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <line x1="30" y1="0" x2="30" y2="60" stroke="black" strokeWidth="1" />
          <line x1="0" y1="30" x2="60" y2="30" stroke="black" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute bottom-[15%] left-[5%] opacity-10 pointer-events-none rotate-45">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <line x1="20" y1="0" x2="20" y2="40" stroke="black" strokeWidth="1" />
          <line x1="0" y1="20" x2="40" y2="20" stroke="black" strokeWidth="1" />
        </svg>
      </div>

      {/* 主内容 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 w-full max-w-6xl my-8 sm:my-12 relative z-10">
        {/* 左侧 - 标题区 */}
        <div className="flex flex-col justify-center">
          <AnimatedContent distance={30} duration={0.6}>
            <span className="text-yellow-600 font-mono text-sm mb-4 block">/// THE_METHOD</span>
          </AnimatedContent>

          <div className="mb-6 sm:mb-8">
            <SplitText
              text="Calculated"
              tag="h2"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-black leading-none"
              textAlign="left"
              splitType="chars"
              delay={30}
              duration={0.8}
              from={{ opacity: 0, y: 50, rotation: -10 }}
              to={{ opacity: 1, y: 0, rotation: 0 }}
            />
            <SplitText
              text="Chaos."
              tag="h2"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-yellow-600 leading-none"
              textAlign="left"
              splitType="chars"
              delay={40}
              duration={0.8}
              from={{ opacity: 0, y: 50, rotation: 10 }}
              to={{ opacity: 1, y: 0, rotation: 0 }}
            />
          </div>

          <AnimatedContent distance={40} duration={0.8} delay={0.3}>
            <p className="text-black/70 font-sans text-lg leading-relaxed max-w-md">
              Our process isn&apos;t linear; it&apos;s exponential. We iterate rapidly, test rigorously, and deploy flawlessly.
              We treat every line of code as a structural component of your brand&apos;s digital skyscraper.
            </p>
          </AnimatedContent>

          {/* 流程指示器 */}
          <AnimatedContent distance={30} duration={0.6} delay={0.5}>
            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-black/40">
              <span>01</span>
              <div className="w-8 h-[1px] bg-black/20" />
              <span>02</span>
              <div className="w-8 h-[1px] bg-black/20" />
              <span>03</span>
              <div className="w-8 h-[1px] bg-black/20" />
              <span>04</span>
            </div>
          </AnimatedContent>
        </div>

        {/* 右侧 - 混沌卡片网格 */}
        <div className="relative h-[320px] sm:h-[380px] md:h-[450px] lg:h-[500px]">
          {/* SVG 连接线 */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={pathRef}
              d="M 80 100
                 Q 120 180, 200 150
                 Q 280 120, 320 200
                 Q 360 280, 280 320
                 Q 200 360, 120 380"
              fill="none"
              stroke="rgba(202, 138, 4, 0.3)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* 混沌卡片 */}
          {processSteps.map((step, i) => {
            // 卡片基础位置 (2x2 网格)
            const basePositions = [
              { top: '5%', left: '5%' },
              { top: '5%', left: '50%' },
              { top: '50%', left: '5%' },
              { top: '50%', left: '50%' },
            ];
            const pos = basePositions[i];

            return (
              <div
                key={i}
                ref={(node) => { cardsRef.current[i] = node; }}
                className="absolute w-[44%] sm:w-[43%] md:w-[42%] aspect-square bg-black text-white p-3 sm:p-4 md:p-6 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out group hover:z-20"
                style={{
                  top: pos.top,
                  left: pos.left,
                  transform: `rotate(${chaosTransforms[i].rotate}deg) translate(${chaosTransforms[i].x}px, ${chaosTransforms[i].y}px)`,
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    rotation: 0,
                    x: 0,
                    y: 0,
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    duration: 0.4,
                    ease: 'power2.out'
                  });
                }}
                onMouseLeave={(e) => {
                  const transform = chaosTransforms[i];
                  gsap.to(e.currentTarget, {
                    rotation: transform.rotate,
                    x: transform.x,
                    y: transform.y,
                    scale: 1,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    duration: 0.4,
                    ease: 'power2.out'
                  });
                }}
              >
                {/* 卡片内部装饰 */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 pointer-events-none" />

                {/* 编号 */}
                <div className="flex items-start justify-between">
                  <span className="text-[8px] sm:text-[10px] font-mono text-yellow-500 border border-yellow-500/30 px-1.5 sm:px-2 py-0.5">
                    {step.time}
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/10 group-hover:text-yellow-500/30 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* 内容 */}
                <div>
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold block mb-1 group-hover:text-yellow-500 transition-colors">
                    {step.label}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/50 font-mono">
                    {step.desc}
                  </span>
                </div>

                {/* Hover 指示器 */}
                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}

          {/* "ORDER" 标签 - 表达混乱中的秩序 */}
          <div className="absolute -bottom-4 right-0 text-[10px] font-mono text-black/30 tracking-widest">
            CHAOS → ORDER
          </div>
        </div>
      </div>

      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
    </div>
  );
};
