'use client';

import { ScrollAnimation } from '@/components/effects/scroll-animation';
import { Button } from '@/components/ui/button';
import { EVENT } from '@/lib/constants';
import { getGoogleMapsUrl } from '@/lib/utils';

export function LocationSection() {
  const fullAddress = `${EVENT.address}, ${EVENT.neighborhood}, ${EVENT.city}`;
  const mapsUrl = getGoogleMapsUrl(fullAddress);

  return (
    <section className="py-16 md:py-20 px-4">
      <ScrollAnimation className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <p className="text-xs text-beige-400 tracking-[0.2em] uppercase mb-2 font-medium">
            Ubicación
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-beige-500">
            ¿Dónde será?
          </h2>
          <div className="w-8 h-0.5 bg-gold-300 mx-auto mt-3" />
        </div>

        <p className="text-beige-500/80 mb-6 leading-relaxed">
          {fullAddress}
        </p>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="gold" size="lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Ver ubicación
          </Button>
        </a>
      </ScrollAnimation>
    </section>
  );
}
