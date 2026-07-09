'use client';

import TechBackground from './TechBackground';

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <TechBackground />
    </div>
  );
}
