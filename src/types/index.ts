export interface PremiumGift {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  reservado: boolean;
  reservado_por: string | null;
  fecha_reserva: string | null;
  created_at: string;
  updated_at: string;
}

export interface GiftReservation {
  id: string;
  gift_id: string;
  nombre_invitado: string;
  fecha_reserva: string;
}

export interface ComplementaryGift {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  categoria: string;
}

export interface ComplementarySelection {
  id: string;
  gift_id: string;
  nombre_invitado: string;
  cantidad: number;
  created_at: string;
}

export interface AttendanceConfirmation {
  id: string;
  nombre: string;
  telefono: string | null;
  confirmado: boolean;
  created_at: string;
}

export interface GuestMessage {
  id: string;
  nombre: string;
  mensaje: string;
  aprobado: boolean;
  created_at: string;
}

export interface GiftFormData {
  nombre: string;
  descripcion: string;
  imagen: string;
}

export interface MessageFormData {
  nombre: string;
  mensaje: string;
}

export interface RsvpFormData {
  nombre: string;
  telefono?: string;
}

export type SortOrder = 'asc' | 'desc';
