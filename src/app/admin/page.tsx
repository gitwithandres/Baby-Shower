'use client';

import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    premiumGifts: 0,
    reservedGifts: 0,
    messages: 0,
    approvedMessages: 0,
    attendance: 0,
  });
  const router = useRouter();

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const supabase = getSupabaseClient();
    const [
      { count: premiumGifts },
      { count: reservedGifts },
      { count: messages },
      { count: approvedMessages },
      { count: attendance },
    ] = await Promise.all([
      supabase.from('premium_gifts').select('*', { count: 'exact', head: true }),
      supabase.from('premium_gifts').select('*', { count: 'exact', head: true }).eq('reservado', true),
      supabase.from('guest_messages').select('*', { count: 'exact', head: true }),
      supabase.from('guest_messages').select('*', { count: 'exact', head: true }).eq('aprobado', true),
      supabase.from('attendance_confirmations').select('*', { count: 'exact', head: true }),
    ]);

    setStats({
      premiumGifts: premiumGifts ?? 0,
      reservedGifts: reservedGifts ?? 0,
      messages: messages ?? 0,
      approvedMessages: approvedMessages ?? 0,
      attendance: attendance ?? 0,
    });
  }

  const cards = [
    {
      label: 'Regalos Premium',
      value: stats.premiumGifts,
      sub: `${stats.reservedGifts} reservados`,
      href: '/admin/gifts',
      color: 'text-gold-400',
    },
    {
      label: 'Mensajes Recibidos',
      value: stats.messages,
      sub: `${stats.approvedMessages} aprobados`,
      href: '/admin/messages',
      color: 'text-sky-400',
    },
    {
      label: 'Confirmaciones',
      value: stats.attendance,
      sub: 'asistentes confirmados',
      href: '/admin/attendance',
      color: 'text-beige-400',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl text-beige-500 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <button
            key={card.label}
            onClick={() => router.push(card.href)}
            className="bg-white rounded-2xl p-6 border border-beige-100 text-left cursor-pointer hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-beige-400 mb-1">{card.label}</p>
            <p className={`font-serif text-3xl ${card.color} mb-1`}>
              {card.value}
            </p>
            <p className="text-xs text-beige-300">{card.sub}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-beige-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl text-beige-500">
            Acciones rápidas
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            variant="gold"
            size="sm"
            onClick={() => router.push('/admin/gifts')}
            className="w-full sm:w-auto"
          >
            Gestionar regalos
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push('/admin/messages')}
            className="w-full sm:w-auto"
          >
            Revisar mensajes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/admin/attendance')}
            className="w-full sm:w-auto"
          >
            Ver asistencia
          </Button>
        </div>
      </div>
    </div>
  );
}
