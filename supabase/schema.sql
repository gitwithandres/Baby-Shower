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

-- Seed premium gifts
INSERT INTO premium_gifts (nombre, descripcion, imagen) VALUES
  ('Bañera con Cambiador', 'Bañera ergonómica con cambiador integrado y soporte antideslizante', '/images/baneracambiador.jpeg'),
  ('Baby Kit', 'Kit completo de cuidado esencial para recién nacido', '/images/babykit.jpeg'),
  ('Cuna Corral Génova', 'Cuna corral plegable modelo Génova con colchoneta acolchada', '/images/cunacorralgenova.jpeg'),
  ('Esterilizador de Teteros', 'Esterilizador eléctrico para biberones y accesorios', '/images/esterilizadorteteros.jpeg'),
  ('Gimnasio para Bebé', 'Gimnasio de estimulación temprana con colchoneta y juguetes colgantes', '/images/gimnasio.jpeg'),
  ('Mecedora', 'Mecedora clásica de madera para bebé', '/images/mecedora.jpeg'),
  ('Mecedora Eléctrica', 'Mecedora automática con vibración y sonidos relajantes', '/images/mecedorelectronico.jpeg'),
  ('Nutribullet', 'Procesador de alimentos y extractor para papillas y jugos naturales', '/images/nutribullet.jpeg'),
  ('Olla Multifuncional', 'Olla de cocción lenta y vaporera para preparar comidas saludables', '/images/olla.jpeg'),
  ('Pañalera', 'Bolso pañalero organizador con múltiples compartimentos', '/images/panalera.jpeg'),
  ('Silla de Comer', 'Silla de comedor para bebé con bandeja desmontable y ajustable', '/images/sillacomedor.jpeg'),
  ('Set de Teteros', 'Set de biberones anticólicos con tetinas de silicona', '/images/tetero.jpeg'),
  ('Silla Mecedora Eléctrica MaxyBaby', 'Silla mecedora eléctrica MaxyBaby con movimientos suaves y melodías', '/images/sillamecedoramaxybaby.jpeg'),
  ('Calentador de Biberón Digital', 'Calentador de biberón con pantalla digital y control de temperatura', '/images/calentadorbiberon.jpeg'),
  ('Cepillo Eléctrico para Biberón', 'Cepillo eléctrico rotatorio para limpieza profunda de biberones', '/images/cepillolectrico.jpeg'),
  ('Nido para Bebé - Arte Bebé', 'Nido acogedor para bebé marca Arte Bebé, ideal para descanso y juego', '/images/nidobebe.jpeg')
ON CONFLICT DO NOTHING;
