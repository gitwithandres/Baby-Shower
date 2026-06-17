'use client';

import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import type { GuestMessage } from '@/types';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from('guest_messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setMessages(data);
  }

  async function toggleApproval(id: string, current: boolean) {
    const supabase = getSupabaseClient();
    await supabase
      .from('guest_messages')
      .update({ aprobado: !current })
      .eq('id', id);
    fetchMessages();
  }

  async function deleteMessage(id: string) {
    if (!confirm('¿Eliminar este mensaje?')) return;
    const supabase = getSupabaseClient();
    await supabase.from('guest_messages').delete().eq('id', id);
    fetchMessages();
  }

  async function exportMessages() {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from('guest_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!data) return;

    const csv = [
      'Nombre,Mensaje,Aprobado,Fecha',
      ...data.map((m) =>
        `"${m.nombre}","${m.mensaje.replace(/"/g, '""')}",${m.aprobado ? 'Sí' : 'No'},"${m.created_at}"`
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mensajes.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = messages.filter((m) => {
    if (filter === 'pending') return !m.aprobado;
    if (filter === 'approved') return m.aprobado;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-beige-500">
          Mensajes
        </h1>
        <Button variant="outline" size="sm" onClick={exportMessages}>
          Exportar CSV
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        {(['pending', 'approved', 'all'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'gold' : 'ghost'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f === 'pending' ? 'Pendientes' : f === 'approved' ? 'Aprobados' : 'Todos'}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className="bg-white rounded-xl p-4 border border-beige-100"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-beige-500/80 leading-relaxed mb-2">
                  &ldquo;{msg.mensaje}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-beige-400 font-medium">
                    &mdash; {msg.nombre}
                  </span>
                  <span className="text-xs text-beige-300">
                    {new Date(msg.created_at).toLocaleDateString('es-CO')}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleApproval(msg.id, msg.aprobado)}
                >
                  {msg.aprobado ? 'Ocultar' : 'Aprobar'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMessage(msg.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-beige-300 py-8">
            No hay mensajes {filter === 'pending' ? 'pendientes' : filter === 'approved' ? 'aprobados' : ''}.
          </p>
        )}
      </div>
    </div>
  );
}
