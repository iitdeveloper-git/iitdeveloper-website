'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
  animated?: boolean;
}

export default function Logo({ className = '', showText = true, animated = false }: LogoProps) {
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const LogoContent = () => (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <defs>
        {/* Gradients - Royal Blue & Yellow Beige */}
        <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00539C" />
          <stop offset="100%" stopColor="#FFD662" />
        </linearGradient>
        
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00539C" />
          <stop offset="100%" stopColor="#FFD662" />
        </linearGradient>
      </defs>

      {/* Hexagonal Badge Shape */}
      <path
        d="M100 20 L150 50 L150 110 L100 140 L50 110 L50 50 Z"
        fill="url(#mainGrad)"
        opacity="0.15"
      />
      
      {/* Hexagon Border */}
      <path
        d="M100 25 L145 53 L145 107 L100 135 L55 107 L55 53 Z"
        stroke="url(#mainGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
      />

      {/* Bold "IIT" Monogram */}
      <g className="monogram">
        {/* I */}
        <rect x="70" y="60" width="10" height="50" rx="2" fill="url(#accentGrad)" />
        
        {/* I */}
        <rect x="90" y="60" width="10" height="50" rx="2" fill="url(#accentGrad)" />
        
        {/* T */}
        <rect x="105" y="60" width="25" height="10" rx="2" fill="url(#accentGrad)" />
        <rect x="112" y="68" width="11" height="42" rx="2" fill="url(#accentGrad)" />
      </g>

      {/* Corner Accents */}
      <circle cx="100" cy="25" r="3" fill="#00539C" />
      <circle cx="145" cy="53" r="2.5" fill="#00539C" />
      <circle cx="145" cy="107" r="2.5" fill="#FFD662" />
      <circle cx="100" cy="135" r="3" fill="#00539C" />
      <circle cx="55" cy="107" r="2.5" fill="#FFD662" />
      <circle cx="55" cy="53" r="2.5" fill="#00539C" />

      {/* Text */}
      {showText && (
        <text
          x="100"
          y="165"
          textAnchor="middle"
          fill="url(#mainGrad)"
          fontSize="13"
          fontWeight="600"
          letterSpacing="2"
          className="uppercase"
        >
          DEVELOPER
        </text>
      )}
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <LogoContent />
      </motion.div>
    );
  }

  return <LogoContent />;
}
