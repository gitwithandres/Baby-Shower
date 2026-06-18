'use client';

import { ScrollAnimation } from '@/components/effects/scroll-animation';
import { EVENT } from '@/lib/constants';
import { formatEventDate } from '@/lib/utils';

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-beige-100 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-beige-300 uppercase tracking-[0.1em] mb-0.5">
          {label}
        </p>
        <p className="text-sm md:text-base text-beige-500 font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}

export function EventInfoSection() {
  return (
    <section id="evento" className="py-16 md:py-20 px-4">
      <ScrollAnimation className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs text-beige-400 tracking-[0.2em] uppercase mb-2 font-medium">
            Información
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-beige-500">
            El Evento
          </h2>
          <div className="w-8 h-0.5 bg-gold-300 mx-auto mt-3" />
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 space-y-6 border border-beige-100">
          <InfoItem
            icon={
              <svg className="w-5 h-5 text-beige-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            label="Fecha"
            value={formatEventDate(EVENT.date)}
          />

          <div className="w-full h-px bg-beige-100" />

          <InfoItem
            icon={
              <svg className="w-5 h-5 text-beige-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            label="Hora"
            value={EVENT.time}
          />

          <div className="w-full h-px bg-beige-100" />

          <InfoItem
            icon={
              <svg className="w-5 h-5 text-beige-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            label="Dirección"
            value={`${EVENT.address}, ${EVENT.neighborhood}`}
          />

          <div className="w-full h-px bg-beige-100" />

          <InfoItem
            icon={
              <svg className="w-5 h-5 text-beige-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            label="Ciudad"
            value={EVENT.city}
          />
        </div>
      </ScrollAnimation>
    </section>
  );
}
