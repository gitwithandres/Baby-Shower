'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftName: string;
  onConfirm: (nombre: string) => Promise<void>;
}

export function GiftModal({ isOpen, onClose, giftName, onConfirm }: GiftModalProps) {
  const [nombre, setNombre] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) {
      setError('Por favor ingresa tu nombre');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onConfirm(nombre.trim());
      setNombre('');
      onClose();
    } catch {
      setError('Ocurrió un error. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl"
          >
            <h3 className="font-serif text-xl text-beige-500 mb-2">
              Reservar {giftName}
            </h3>
            <p className="text-sm text-beige-400/70 mb-6">
              Ingresa tu nombre para confirmar la reserva de este regalo.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="gift-reservation-name"
                label="Tu nombre"
                placeholder="Ej: María García"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                error={error}
                autoFocus
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  isLoading={isLoading}
                  className="flex-1"
                >
                  Confirmar
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
