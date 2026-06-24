'use client';

import { useRef, useState, ReactNode, CSSProperties } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function SpotlightCard({ children, style, className }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = useState({ x: 50, y: 50, opacity: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOverlay({ x, y, opacity: 1 });
  }

  function handleMouseLeave() {
    setOverlay(prev => ({ ...prev, opacity: 0 }));
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        position: 'relative',
        background: '#1E1B18',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '16px',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${overlay.x}% ${overlay.y}%, rgba(200,150,42,0.10), transparent 60%)`,
          opacity: overlay.opacity,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
