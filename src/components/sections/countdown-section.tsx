'use client';

import { useCountdown } from '@/hooks/use-countdown';
import { ScrollAnimation } from '@/components/effects/scroll-animation';
import { EVENT } from '@/lib/constants';

function CountdownItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-serif text-4xl md:text-5xl text-beige-500 tabular-nums">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm text-beige-300 uppercase tracking-[0.15em] mt-1">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  const countdown = useCountdown(`${EVENT.date}T16:00:00`);

  if (countdown.isExpired) return null;

  return (
    <section className="py-16 md:py-20 px-4">
      <ScrollAnimation className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs text-beige-400 tracking-[0.2em] uppercase mb-2 font-medium">
            Faltan
          </p>
          <div className="w-8 h-0.5 bg-gold-300 mx-auto" />
        </div>

        <div className="flex justify-center gap-8 md:gap-12">
          <CountdownItem value={countdown.days} label="Días" />
          <div className="w-px bg-beige-200 self-stretch" />
          <CountdownItem value={countdown.hours} label="Horas" />
          <div className="w-px bg-beige-200 self-stretch" />
          <CountdownItem value={countdown.minutes} label="Minutos" />
          <div className="w-px bg-beige-200 self-stretch" />
          <CountdownItem value={countdown.seconds} label="Segundos" />
        </div>
      </ScrollAnimation>
    </section>
  );
}
