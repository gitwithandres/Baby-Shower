'use client';

import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { PremiumGift } from '@/types';

export default function AdminGiftsPage() {
  const [gifts, setGifts] = useState<PremiumGift[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGift, setEditingGift] = useState<PremiumGift | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    fetchGifts();
  }, []);

  async function fetchGifts() {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from('premium_gifts')
      .select('*')
      .order('created_at', { ascending: true });
    if (data) setGifts(data);
  }

  function resetForm() {
    setNombre('');
    setDescripcion('');
    setImagen('');
    setEditingGift(null);
    setShowForm(false);
  }

  function editGift(gift: PremiumGift) {
    setEditingGift(gift);
    setNombre(gift.nombre);
    setDescripcion(gift.descripcion);
    setImagen(gift.imagen);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;

    const supabase = getSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase.from('premium_gifts') as any;
    if (editingGift) {
      await db.update({ nombre: nombre.trim(), descripcion: descripcion.trim(), imagen: imagen.trim() }).eq('id', editingGift.id);
    } else {
      await db.insert({ nombre: nombre.trim(), descripcion: descripcion.trim(), imagen: imagen.trim() });
    }

    resetForm();
    fetchGifts();
  }

  async function deleteGift(id: string) {
    if (!confirm('¿Eliminar este regalo premium?')) return;
    const supabase = getSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('premium_gifts') as any).delete().eq('id', id);
    fetchGifts();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-beige-500">
          Regalos Premium
        </h1>
        <Button
          variant="gold"
          size="sm"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancelar' : 'Nuevo regalo'}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 border border-beige-100 mb-8 space-y-4"
        >
          <Input
            id="gift-name"
            label="Nombre"
            placeholder="Ej: Cuna"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <Textarea
            id="gift-desc"
            label="Descripción"
            placeholder="Descripción del regalo"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={2}
          />
          <Input
            id="gift-image"
            label="URL de imagen"
            placeholder="/images/regalo.jpg"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
          <Button type="submit" variant="gold">
            {editingGift ? 'Actualizar regalo' : 'Crear regalo'}
          </Button>
        </form>
      )}

      <div className="space-y-3">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="bg-white rounded-xl p-4 border border-beige-100 flex items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-beige-500">{gift.nombre}</h3>
                {gift.reservado && (
                  <span className="text-xs px-2 py-0.5 bg-beige-100 text-beige-400 rounded-full">
                    Reservado por {gift.reservado_por}
                  </span>
                )}
              </div>
              {gift.descripcion && (
                <p className="text-xs text-beige-400/70 mt-0.5 truncate">
                  {gift.descripcion}
                </p>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editGift(gift)}
              >
                Editar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteGift(gift.id)}
                className="text-red-400 hover:text-red-500"
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}

        {gifts.length === 0 && (
          <p className="text-center text-beige-300 py-8">
            No hay regalos premium todavía. Crea el primero.
          </p>
        )}
      </div>
    </div>
  );
}
