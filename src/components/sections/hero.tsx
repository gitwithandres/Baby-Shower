'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/use-countdown';
import { EVENT } from '@/lib/constants';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-beige-100/30 via-transparent to-beige-50" />

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -right-40 w-[400px] h-[400px] bg-sky-100/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        className="relative z-10 text-center max-w-2xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm md:text-base text-beige-400 tracking-[0.2em] uppercase mb-6 font-medium"
        >
          Baby Shower
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif text-6xl md:text-7xl lg:text-8xl text-beige-500 mb-4"
        >
          {EVENT.babyName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-base md:text-lg text-beige-400/80 mb-2"
        >
          {EVENT.parent1}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-base md:text-lg text-beige-400/80 mb-6"
        >
          {EVENT.parent2}
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={mounted ? { width: '80px' } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="h-0.5 bg-gold-300 mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="text-base md:text-lg text-beige-500/90 leading-relaxed max-w-lg mx-auto mb-8 font-light italic"
        >
          &ldquo;{EVENT.welcomeMessage}&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg text-beige-400 font-medium"
        >
          {EVENT.date} &middot; {EVENT.time}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-beige-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
