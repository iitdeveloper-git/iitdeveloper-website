'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Brand logos only — cardBg matched to each brand's palette
const clients = [
  {
    name: 'Legal Sujhav',
    logo: '/clients/legalsujhav.png',
    cardBg: '#0d0d0d',
    border: '1px solid rgba(255,255,255,0.12)',
  },
  {
    name: 'Herbal Kitchen',
    logo: '/clients/herbal-kitchen-nobg.png',
    cardBg: '#fff8f0',
    border: '1px solid rgba(180,80,30,0.15)',
    zoom: true,
  },
  {
    name: 'Ghar Ka Dabba',
    logo: '/clients/ghar-ka-dabba-nobg.png',
    cardBg: '#fff5e6',
    border: '1px solid rgba(160,80,0,0.15)',
  },
  {
    name: 'VanshVeda',
    logo: '/clients/vanshveda-nobg.png',
    cardBg: '#f0f7f0',
    border: '1px solid rgba(30,120,60,0.15)',
    zoom: true,
  },
  {
    name: 'Knowledge King',
    logo: '/clients/knowledgeKing-nobg.png',
    cardBg: '#fffdf5',
    border: '1px solid rgba(180,140,20,0.25)',
    zoom: true,
  },
];

export default function Clients() {
  return (
    <section className="py-16 bg-surface-dark/50 backdrop-blur-sm border-y border-white/[0.05] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text">
            Trusted By Industry Leaders
          </h2>
        </div>
      </div>

      {/* Single Row - Infinite Scroll */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 pr-8"
            animate={{
              x: [0, -3024],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {/* Triple the array for seamless loop — each logo on its brand-matched card */}
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={`client-${index}`}
                className="flex-shrink-0 h-36 px-3 flex items-center justify-center min-w-[230px]"
              >
                <div
                  className="w-full h-28 flex items-center justify-center rounded-xl px-5 py-3 shadow-md hover:scale-105 transition-transform duration-300"
                  style={{ background: client.cardBg, border: client.border }}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={200}
                    height={96}
                    className="object-contain"
                    style={{ maxHeight: '96px', width: 'auto', transform: client.zoom ? 'scale(1.15)' : 'scale(1)' }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-1">50+</div>
            <div className="text-sm text-muted-foreground/70">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-1">100+</div>
            <div className="text-sm text-muted-foreground/70">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-1">98%</div>
            <div className="text-sm text-muted-foreground/70">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-1">24/7</div>
            <div className="text-sm text-muted-foreground/70">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}
