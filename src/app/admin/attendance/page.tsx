'use client';

import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import type { AttendanceConfirmation } from '@/types';

export default function AdminAttendancePage() {
  const [attendees, setAttendees] = useState<AttendanceConfirmation[]>([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  async function fetchAttendance() {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from('attendance_confirmations')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setAttendees(data);
  }

  async function deleteEntry(id: string) {
    if (!confirm('¿Eliminar esta confirmación?')) return;
    const supabase = getSupabaseClient();
    await supabase.from('attendance_confirmations').delete().eq('id', id);
    fetchAttendance();
  }

  async function exportAttendance() {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from('attendance_confirmations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!data) return;

    const csv = [
      'Nombre,Teléfono,Confirmado,Fecha',
      ...data.map((a) =>
        `"${a.nombre}","${a.telefono ?? ''}",${a.confirmado ? 'Sí' : 'No'},"${a.created_at}"`
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'asistencia.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-beige-500">
          Confirmaciones de Asistencia
        </h1>
        <div className="flex gap-2">
          <span className="text-sm text-beige-400 self-center">
            Total: {attendees.length}
          </span>
          <Button variant="outline" size="sm" onClick={exportAttendance}>
            Exportar CSV
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-beige-100 overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[500px] sm:min-w-0 px-4 sm:px-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-beige-100">
                  <th className="text-left px-4 py-3 text-beige-400 font-medium">Nombre</th>
                  <th className="text-left px-4 py-3 text-beige-400 font-medium">Teléfono</th>
                  <th className="text-left px-4 py-3 text-beige-400 font-medium">Fecha</th>
                  <th className="text-right px-4 py-3 text-beige-400 font-medium">Acción</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((a) => (
                  <tr key={a.id} className="border-b border-beige-50 hover:bg-beige-50/50">
                    <td className="px-4 py-3 text-beige-500">{a.nombre}</td>
                    <td className="px-4 py-3 text-beige-400">{a.telefono ?? '—'}</td>
                    <td className="px-4 py-3 text-beige-400">
                      {new Date(a.created_at).toLocaleDateString('es-CO')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteEntry(a.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {attendees.length === 0 && (
          <p className="text-center text-beige-300 py-8">
            No hay confirmaciones de asistencia todavía.
          </p>
        )}
      </div>
    </div>
  );
}
