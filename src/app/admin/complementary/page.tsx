'use client';

import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

interface Selection {
  id: string;
  gift_id: string;
  nombre_invitado: string;
  cantidad: number;
  created_at: string;
}

const GIFT_NAMES: Record<string, string> = {
  'comp-1': 'Pañales',
  'comp-2': 'Cobijas',
  'comp-3': 'Ropa',
  'comp-4': 'Baberos',
  'comp-5': 'Toallas',
  'comp-6': 'Paños húmedos',
  'comp-7': 'Gorritos',
  'comp-8': 'Medias',
};

export default function AdminComplementaryPage() {
  const [selections, setSelections] = useState<Selection[]>([]);

  useEffect(() => {
    fetchSelections();
  }, []);

  async function fetchSelections() {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from('complementary_selections')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setSelections(data);
  }

  async function deleteSelection(id: string) {
    if (!confirm('¿Eliminar esta selección?')) return;
    const supabase = getSupabaseClient();
    await supabase.from('complementary_selections').delete().eq('id', id);
    fetchSelections();
  }

  const grouped = selections.reduce<Record<string, Selection[]>>((acc, s) => {
    if (!acc[s.nombre_invitado]) acc[s.nombre_invitado] = [];
    acc[s.nombre_invitado].push(s);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-beige-500">
          Regalos Complementarios
        </h1>
        <span className="text-sm text-beige-400">{selections.length} selecciones</span>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-center text-beige-300 py-8">No hay selecciones todavía.</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([guest, items]) => (
            <div key={guest} className="bg-white rounded-xl p-4 border border-beige-100">
              <h3 className="font-medium text-beige-500 mb-2">{guest}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {items.map((item) => (
                  <span
                    key={item.id}
                    className="px-3 py-1 bg-beige-50 text-beige-400 text-sm rounded-full"
                  >
                    {GIFT_NAMES[item.gift_id] ?? item.gift_id}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-beige-300">
                  {new Date(items[0].created_at).toLocaleDateString('es-CO')}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => items.forEach((item) => deleteSelection(item.id))}
                  className="text-red-400 hover:text-red-500"
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
