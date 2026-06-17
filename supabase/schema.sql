-- Baby Shower Database Schema
-- Run this in Supabase SQL Editor

-- Premium Gifts
CREATE TABLE IF NOT EXISTS premium_gifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion TEXT DEFAULT '',
  imagen TEXT DEFAULT '',
  reservado BOOLEAN DEFAULT FALSE,
  reservado_por TEXT DEFAULT NULL,
  fecha_reserva TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Complementary Selections
CREATE TABLE IF NOT EXISTS complementary_selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gift_id TEXT NOT NULL,
  nombre_invitado TEXT NOT NULL,
  cantidad INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attendance Confirmations
CREATE TABLE IF NOT EXISTS attendance_confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  telefono TEXT DEFAULT NULL,
  confirmado BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guest Messages
CREATE TABLE IF NOT EXISTS guest_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  aprobado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Remove duplicate premium gifts (keep the first one)
DELETE FROM premium_gifts
WHERE id NOT IN (
  SELECT DISTINCT ON (nombre) id FROM premium_gifts ORDER BY nombre, created_at ASC
);

-- Unique constraint to prevent future duplicates
ALTER TABLE premium_gifts DROP CONSTRAINT IF EXISTS premium_gifts_nombre_unique;
ALTER TABLE premium_gifts ADD CONSTRAINT premium_gifts_nombre_unique UNIQUE (nombre);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_premium_gifts_reservado ON premium_gifts(reservado);
CREATE INDEX IF NOT EXISTS idx_guest_messages_aprobado ON guest_messages(aprobado);
CREATE INDEX IF NOT EXISTS idx_attendance_confirmations_created ON attendance_confirmations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guest_messages_created ON guest_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_complementary_selections_guest ON complementary_selections(nombre_invitado);
CREATE INDEX IF NOT EXISTS idx_premium_gifts_created ON premium_gifts(created_at);

-- Row Level Security
ALTER TABLE premium_gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE complementary_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_confirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_messages ENABLE ROW LEVEL SECURITY;

-- Public policies (anon key) - drop first to allow re-runs
DROP POLICY IF EXISTS "Anyone can read premium_gifts" ON premium_gifts;
DROP POLICY IF EXISTS "Anyone can read complementary_selections" ON complementary_selections;
DROP POLICY IF EXISTS "Anyone can read attendance_confirmations" ON attendance_confirmations;
DROP POLICY IF EXISTS "Anyone can read guest_messages" ON guest_messages;
DROP POLICY IF EXISTS "Anyone can insert complementary_selections" ON complementary_selections;
DROP POLICY IF EXISTS "Anyone can insert attendance_confirmations" ON attendance_confirmations;
DROP POLICY IF EXISTS "Anyone can insert guest_messages" ON guest_messages;
DROP POLICY IF EXISTS "Anyone can update premium_gifts to reserve" ON premium_gifts;
DROP POLICY IF EXISTS "Admin can update premium_gifts" ON premium_gifts;
DROP POLICY IF EXISTS "Anyone can delete premium_gifts" ON premium_gifts;
DROP POLICY IF EXISTS "Admin can update guest_messages" ON guest_messages;
DROP POLICY IF EXISTS "Anyone can delete guest_messages" ON guest_messages;
DROP POLICY IF EXISTS "Anyone can delete attendance_confirmations" ON attendance_confirmations;

CREATE POLICY "Anyone can read premium_gifts"
  ON premium_gifts FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read complementary_selections"
  ON complementary_selections FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read attendance_confirmations"
  ON attendance_confirmations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read guest_messages"
  ON guest_messages FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert complementary_selections"
  ON complementary_selections FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can insert attendance_confirmations"
  ON attendance_confirmations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can insert guest_messages"
  ON guest_messages FOR INSERT
  WITH CHECK (true);

-- Update policy for reserving gifts (guests can only reserve non-reserved)
CREATE POLICY "Anyone can update premium_gifts to reserve"
  ON premium_gifts FOR UPDATE
  USING (reservado = false)
  WITH CHECK (true);

-- Admin: update any premium gift (for admin panel)
DROP POLICY IF EXISTS "Admin can update premium_gifts" ON premium_gifts;
CREATE POLICY "Admin can update premium_gifts"
  ON premium_gifts FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Admin: delete premium gifts
DROP POLICY IF EXISTS "Anyone can delete premium_gifts" ON premium_gifts;
CREATE POLICY "Anyone can delete premium_gifts"
  ON premium_gifts FOR DELETE
  USING (true);

-- Admin: update guest messages (approve/reject)
DROP POLICY IF EXISTS "Admin can update guest_messages" ON guest_messages;
CREATE POLICY "Admin can update guest_messages"
  ON guest_messages FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Admin: delete guest messages
DROP POLICY IF EXISTS "Anyone can delete guest_messages" ON guest_messages;
CREATE POLICY "Anyone can delete guest_messages"
  ON guest_messages FOR DELETE
  USING (true);

-- Admin: delete attendance confirmations
DROP POLICY IF EXISTS "Anyone can delete attendance_confirmations" ON attendance_confirmations;
CREATE POLICY "Anyone can delete attendance_confirmations"
  ON attendance_confirmations FOR DELETE
  USING (true);

-- Fix existing records with wrong image paths
UPDATE premium_gifts SET imagen = '/images/corralpiso.jpg' WHERE nombre = 'Corral' AND imagen = '/images/corral.jpg';
UPDATE premium_gifts SET imagen = '/images/bañera.jpg' WHERE nombre = 'Bañera' AND imagen = '/images/banera.jpg';

-- Seed sample premium gifts
INSERT INTO premium_gifts (nombre, descripcion, imagen) VALUES
  ('Cuna', 'Cuna de madera maciza con colchón ortopédico', '/images/cuna.jpg'),
  ('Coche', 'Carrito de paseo todo terreno reclinable', '/images/coche.jpg'),
  ('Corral', 'Corral plegable con colchoneta acolchada', '/images/corralpiso.jpg'),
  ('Silla para automóvil', 'Silla de seguridad grupo 0+ con base isofix', '/images/silla.jpg'),
  ('Bañera', 'Bañera ergonómica con soporte antideslizante', '/images/bañera.jpg')
ON CONFLICT DO NOTHING;
