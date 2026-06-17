export function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(' ');
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateWhatsAppMessage(nombre: string): string {
  const message = `Hola Andrea, confirmo mi asistencia al Baby Shower de Juan José.`;
  return encodeURIComponent(message);
}

export function generateReservationMessage(
  nombreInvitado: string,
  giftName: string
): string {
  const message = `Hola, soy ${nombreInvitado} y he reservado: ${giftName} para el Baby Shower de Juan José.`;
  return encodeURIComponent(message);
}

export function getGoogleMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
