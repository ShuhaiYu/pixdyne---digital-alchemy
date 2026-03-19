'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const PixelTrail = dynamic(() => import('@/components/PixelTrail'), { ssr: false });

export default function PixelTrailWrapper() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isDesktop) return null;

  return (
    <PixelTrail
      gridSize={60}
      trailSize={0.05}
      maxAge={300}
      color="#eab308"
      gooeyFilter={{ id: 'goo-filter', strength: 3 }}
    />
  );
}
