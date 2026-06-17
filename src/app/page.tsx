'use client';

import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { CountdownSection } from '@/components/sections/countdown-section';
import { EventInfoSection } from '@/components/sections/event-info';
import { LocationSection } from '@/components/sections/location';
import { RsvpSection } from '@/components/sections/rsvp';
import { GallerySection } from '@/components/sections/gallery';
import { GiftListSection } from '@/components/sections/gift-list';
import { MessagesSection } from '@/components/sections/messages-section';
import { MusicPlayer } from '@/components/effects/music-player';

const ConfettiEffect = dynamic(
  () => import('@/components/effects/confetti').then((mod) => ({ default: mod.ConfettiEffect })),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <ConfettiEffect />
      <Navbar />
      <main>
        <HeroSection />
        <CountdownSection />
        <EventInfoSection />
        <LocationSection />
        <RsvpSection />
        <GallerySection />
        <GiftListSection />
        <MessagesSection />
      </main>
      <Footer />
      <MusicPlayer />
    </>
  );
}
