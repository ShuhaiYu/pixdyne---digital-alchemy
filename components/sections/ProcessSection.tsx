import React from 'react';

export const ProcessSection: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center p-8 py-20 relative">
      <div className="absolute top-0 right-0 p-12 opacity-50 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="1" fill="none" className="animate-pulse" />
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="black" strokeWidth="1" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl my-12">
        <div className="flex flex-col justify-center">
          <span className="text-yellow-600 font-mono text-sm mb-4">/// THE_METHOD</span>
          <h2 className="text-5xl md:text-7xl font-serif text-black leading-none mb-8">
            Calculated <br /> <span className="italic text-yellow-600">Chaos.</span>
          </h2>
          <p className="text-black/70 font-sans text-lg leading-relaxed max-w-md">
            Our process isn&apos;t linear; it&apos;s exponential. We iterate rapidly, test rigorously, and deploy flawlessly.
            We treat every line of code as a structural component of your brand&apos;s digital skyscraper.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Discovery', time: 'Wk 01' },
            { label: 'Architect', time: 'Wk 02' },
            { label: 'Development', time: 'Wk 03-05' },
            { label: 'Launch', time: 'Wk 06' }
          ].map((step, i) => (
            <div key={i} className="bg-black text-white p-6 aspect-square flex flex-col justify-between hover:bg-yellow-500 hover:text-black transition-colors group">
              <span className="text-xs font-mono border-b border-white/20 pb-2 group-hover:border-black/20">{step.time}</span>
              <span className="text-2xl font-bold">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
