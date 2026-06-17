'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export function ConfettiEffect() {
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    const duration = 3000;
    const end = Date.now() + duration;

    function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#C9A96E', '#D4AF37', '#A8C5D6', '#F5F0EB'],
        shapes: ['circle', 'square'],
        ticks: 60,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#C9A96E', '#D4AF37', '#A8C5D6', '#F5F0EB'],
        shapes: ['circle', 'square'],
        ticks: 60,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }

    frame();

    const burst = () => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#C9A96E', '#D4AF37', '#A8C5D6', '#F5F0EB'],
        shapes: ['circle', 'square'],
      });
    };

    const burstTimer = setTimeout(burst, 500);

    return () => clearTimeout(burstTimer);
  }, []);

  return null;
}
