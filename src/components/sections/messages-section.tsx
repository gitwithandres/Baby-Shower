'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation } from '@/components/effects/scroll-animation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { GuestMessage } from '@/types';

export function MessagesSection() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from('guest_messages')
      .select('*')
      .eq('aprobado', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (data) {
      setMessages(data);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !mensaje.trim()) return;

    setIsSubmitting(true);

    const supabase = getSupabaseClient();
    const { error } = await supabase.from('guest_messages').insert({
      nombre: nombre.trim(),
      mensaje: mensaje.trim(),
    });

    if (!error) {
      setSubmitted(true);
      setNombre('');
      setMensaje('');
    }

    setIsSubmitting(false);
  }

  return (
    <section id="mensajes" className="py-16 md:py-20 px-4">
      <ScrollAnimation className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs text-beige-400 tracking-[0.2em] uppercase mb-2 font-medium">
            Dedicatorias
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-beige-500">
            Deja un mensaje para Juan José
          </h2>
          <div className="w-8 h-0.5 bg-gold-300 mx-auto mt-3" />
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-beige-100 text-center max-w-md mx-auto mb-12"
          >
            <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-serif text-xl text-beige-500 mb-2">
              ¡Mensaje enviado!
            </p>
            <p className="text-sm text-beige-400/70 mb-4">
              Tu mensaje será visible después de ser aprobado.
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Escribir otro
            </Button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-beige-100 max-w-md mx-auto mb-12 space-y-4"
          >
            <Input
              id="message-name"
              label="Tu nombre"
              placeholder="Ej: María García"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <Textarea
              id="message-text"
              label="Tu mensaje"
              placeholder="Escribe una dedicatoria para Juan José..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows={4}
              required
            />
            <Button
              variant="gold"
              className="w-full"
              isLoading={isSubmitting}
              type="submit"
            >
              Enviar mensaje
            </Button>
          </form>
        )}

        {messages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/40 backdrop-blur-sm rounded-2xl p-5 border border-beige-100"
              >
                <p className="text-sm text-beige-500/80 leading-relaxed mb-3 italic">
                  &ldquo;{msg.mensaje}&rdquo;
                </p>
                <p className="text-xs text-beige-400 font-medium">
                  &mdash; {msg.nombre}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </ScrollAnimation>
    </section>
  );
}
