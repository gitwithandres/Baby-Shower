'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollAnimation } from '@/components/effects/scroll-animation';
import { GALLERY_IMAGES } from '@/lib/constants';

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20 px-4">
      <ScrollAnimation className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs text-beige-400 tracking-[0.2em] uppercase mb-2 font-medium">
            Galería
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-beige-500">
            Nuestros Momentos
          </h2>
          <div className="w-8 h-0.5 bg-gold-300 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((image) => (
            <motion.button
              key={image.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedImage(image.id)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group bg-beige-100"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105 p-1"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          ))}
        </div>
      </ScrollAnimation>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES.find((img) => img.id === selectedImage)?.src ?? ''}
                alt="Galería"
                fill
                className="object-contain"
                sizes="100vw"
              />

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
