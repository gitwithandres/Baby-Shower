'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation } from '@/components/effects/scroll-animation';
import { GiftModal } from './gift-modal';
import { Button } from '@/components/ui/button';
import { getSupabaseClient } from '@/lib/supabase/client';
import { COMPLEMENTARY_GIFTS } from '@/lib/constants';
import type { PremiumGift } from '@/types';

export function GiftListSection() {
  const [premiumGifts, setPremiumGifts] = useState<PremiumGift[]>([]);
  const [selectedGift, setSelectedGift] = useState<PremiumGift | null>(null);
  const [selectedCompGifts, setSelectedCompGifts] = useState<Set<string>>(new Set());
  const [hasReservedPremium, setHasReservedPremium] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [compGuestName, setCompGuestName] = useState('');

  useEffect(() => {
    const supabase = getSupabaseClient();
    fetchPremiumGifts();

    const channel = supabase
      .channel('premium-gifts-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'premium_gifts' },
        () => {
          fetchPremiumGifts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchPremiumGifts() {
    const supabase = getSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from('premium_gifts') as any)
      .select('*')
      .order('created_at', { ascending: true });

    if (data) {
      setPremiumGifts(data as PremiumGift[]);
    }
    setIsLoading(false);
  }

  const handleReserve = useCallback(async (nombre: string) => {
    if (!selectedGift) return;

    const supabase = getSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('premium_gifts') as any)
      .update({
        reservado: true,
        reservado_por: nombre,
        fecha_reserva: new Date().toISOString(),
      })
      .eq('id', selectedGift.id);

    if (error) throw error;

    setHasReservedPremium(true);
    setGuestName(nombre);
  }, [selectedGift]);

  function handleToggleComplementary(giftId: string) {
    if (!hasReservedPremium) {
      alert('Primero debes reservar un regalo premium antes de elegir regalos complementarios.');
      return;
    }

    setSelectedCompGifts((prev) => {
      const next = new Set(prev);
      if (next.has(giftId)) {
        next.delete(giftId);
      } else {
        next.add(giftId);
      }
      return next;
    });
  }

  async function handleReserveComplementary() {
    if (!compGuestName.trim()) {
      alert('Por favor ingresa tu nombre.');
      return;
    }

    const selections = Array.from(selectedCompGifts).map((giftId) => ({
      gift_id: giftId,
      nombre_invitado: compGuestName.trim(),
      cantidad: 1,
    }));

    const supabase = getSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('complementary_selections') as any).insert(selections);

    if (error) {
      alert('Error al guardar las selecciones.');
      return;
    }

    setSelectedCompGifts(new Set());
    setCompGuestName('');
    alert('¡Regalos complementarios seleccionados con éxito!');
  }

  const availablePremium = premiumGifts.filter((g) => !g.reservado);
  const reservedPremium = premiumGifts.filter((g) => g.reservado);

  return (
    <section id="regalos" className="py-16 md:py-20 px-4">
      <ScrollAnimation className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs text-beige-400 tracking-[0.2em] uppercase mb-2 font-medium">
            Lista
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-beige-500">
            Lista de Regalos
          </h2>
          <div className="w-8 h-0.5 bg-gold-300 mx-auto mt-3" />
          <p className="text-sm text-beige-400/70 mt-4 max-w-md mx-auto leading-relaxed">
            Tu presencia es el mejor regalo, pero si deseas contribuir con algo especial,
            aquí tienes nuestras sugerencias.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="font-serif text-xl text-beige-400 text-center mb-6">
            Regalos Premium
          </h3>

          {isLoading ? (
            <div className="text-center text-beige-300">Cargando...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {availablePremium.map((gift, index) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-beige-100 group"
                >
                  <div className="relative h-40 bg-beige-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-12 h-12 text-beige-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-serif text-lg text-beige-500 mb-1">
                      {gift.nombre}
                    </h4>
                    <p className="text-xs text-beige-400/70 mb-3 line-clamp-2">
                      {gift.descripcion}
                    </p>
                    <span className="inline-block px-3 py-1 bg-gold-50 text-gold-400 text-xs rounded-full font-medium">
                      Disponible
                    </span>
                    <div className="mt-3">
                      <Button
                        variant="gold"
                        size="sm"
                        className="w-full"
                        onClick={() => setSelectedGift(gift)}
                      >
                        Reservar
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {reservedPremium.map((gift, index) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-beige-50 rounded-2xl overflow-hidden border border-beige-100 opacity-75"
                >
                  <div className="relative h-40 bg-beige-100 overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <svg className="w-12 h-12 text-beige-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-serif text-lg text-beige-400 mb-1">
                      {gift.nombre}
                    </h4>
                    <p className="text-xs text-beige-300/70 mb-3 line-clamp-2">
                      {gift.descripcion}
                    </p>
                    <span className="inline-block px-3 py-1 bg-beige-200 text-beige-400 text-xs rounded-full font-medium">
                      Reservado por {gift.reservado_por}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {availablePremium.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-beige-400 font-serif text-xl">
                Todos los regalos premium han sido reservados
              </p>
              <p className="text-beige-300 text-sm mt-2">
                Gracias por tu generosidad
              </p>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-serif text-xl text-beige-400 text-center mb-6">
            Regalos Complementarios
          </h3>

          {!hasReservedPremium && (
            <p className="text-center text-sm text-beige-300 mb-6">
              * Primero reserva un regalo premium para poder seleccionar regalos complementarios.
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
            {COMPLEMENTARY_GIFTS.map((gift) => {
              const isSelected = selectedCompGifts.has(gift.id);
              return (
                <motion.button
                  key={gift.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleToggleComplementary(gift.id)}
                  className={`
                    p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer
                    ${isSelected
                      ? 'bg-gold-50 border-gold-300'
                      : 'bg-white/60 border-beige-100 hover:border-beige-200'
                    }
                    ${!hasReservedPremium ? 'opacity-50' : ''}
                  `}
                  disabled={!hasReservedPremium}
                >
                  <span className="text-2xl block mb-1">{gift.icono}</span>
                  <p className="text-xs text-beige-500 font-medium">{gift.nombre}</p>
                  {isSelected && (
                    <span className="text-xs text-gold-400 font-medium">Seleccionado</span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {hasReservedPremium && selectedCompGifts.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-sm mx-auto space-y-3"
            >
              <input
                type="text"
                placeholder="Tu nombre"
                value={compGuestName}
                onChange={(e) => setCompGuestName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-beige-200 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-beige-400/30"
              />
              <Button
                variant="gold"
                className="w-full"
                onClick={handleReserveComplementary}
              >
                Confirmar selección ({selectedCompGifts.size})
              </Button>
            </motion.div>
          )}
        </div>
      </ScrollAnimation>

      <GiftModal
        isOpen={selectedGift !== null}
        onClose={() => setSelectedGift(null)}
        giftName={selectedGift?.nombre ?? ''}
        onConfirm={handleReserve}
      />
    </section>
  );
}
