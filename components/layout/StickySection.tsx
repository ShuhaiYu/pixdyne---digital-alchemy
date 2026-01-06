'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { SectionProps } from '@/types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const StickySection: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  transitionType = 'curtain',
  zIndex,
  bgImage,
  fitContent = false,
  pinnable = false,
  peekBackground
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      if (transitionType === 'parallax') {
        gsap.fromTo(container,
          { filter: 'brightness(0.2) scale(0.9)' },
          {
            filter: 'brightness(1) scale(1)',
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            }
          }
        );
      }

      if (transitionType === 'mask-diagonal') {
        // 如果有 peekBackground，clipPath 应用在 innerRef 上
        const clipTarget = peekBackground ? innerRef.current : container;
        if (clipTarget) {
          gsap.fromTo(clipTarget,
            // 起始状态：右下角大面积截掉，露出更多 peekBackground
            { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 50%)' },
            {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: container,
                start: 'top 80%',  // 更早开始
                end: 'top 10%',    // 更晚结束，延长过渡时间
                scrub: 0.8,
              }
            }
          );
        }
      }

      if (transitionType === 'pixel-glitch') {
        gsap.fromTo(contentRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              end: 'top 20%',
              scrub: true
            }
          }
        );
      }
    }, containerRef);

    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [transitionType, pathname, peekBackground]);

  // 如果有 peekBackground，使用特殊布局
  if (peekBackground) {
    return (
      <section
        id={id}
        ref={containerRef}
        className={`${pinnable ? 'relative' : 'sticky top-0'} w-full overflow-hidden ${fitContent ? '' : 'min-h-screen'}`}
        style={{ zIndex }}
      >
        {/* peekBackground 在 clipPath 之外，当 mask-diagonal 展开时会露出 */}
        <div className="absolute inset-0 z-0">
          {peekBackground}
        </div>

        {/* 内部容器 - clipPath 应用在这里 */}
        <div
          ref={innerRef}
          className={`relative z-10 ${className}`}
        >
          {bgImage && (
            <div className="absolute inset-0 z-0">
              <img
                src={bgImage}
                alt={`${id} section background`}
                className="w-full h-full object-cover opacity-40 grayscale"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )}

          <div ref={contentRef} className="relative z-10 w-full">
            {children}
          </div>
        </div>
      </section>
    );
  }

  // 默认布局（无 peekBackground）
  return (
    <section
      id={id}
      ref={containerRef}
      className={`${pinnable ? 'relative' : 'sticky top-0'} w-full overflow-hidden flex flex-col ${fitContent ? 'h-auto min-h-0' : 'min-h-screen'} ${className}`}
      style={{ zIndex }}
    >
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt={`${id} section background`}
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div ref={contentRef} className="relative z-10 w-full h-full flex-grow flex flex-col">
        {children}
      </div>
    </section>
  );
};
