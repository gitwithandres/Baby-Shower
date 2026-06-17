export const EVENT = {
  babyName: 'Juan José',
  babyNameFull: 'Juan José Carreño Marmolejo',
  parent1: 'José Miguel Carreño Sánchez',
  parent2: 'Andrea Marmolejo Dueñas',
  date: '2026-07-04',
  time: '4:00 PM',
  address: 'Cra 33 # 34-51',
  neighborhood: 'Cabecera',
  city: 'Bucaramanga, Colombia',
  welcomeMessage:
    'Con inmensa alegría esperamos la llegada de nuestro amado Juan José. Queremos compartir contigo este momento tan especial y celebrar juntos el comienzo de esta hermosa aventura.',
  whatsappNumber: '573167740131',
} as const;

export const COMPLEMENTARY_GIFTS = [
  {
    id: 'comp-1',
    nombre: 'Pañales',
    descripcion: 'Pañales desechables etapa 1',
    icono: '🩲',
    categoria: 'Cuidado',
  },
  {
    id: 'comp-2',
    nombre: 'Cobijas',
    descripcion: 'Cobijas suaves y cálidas',
    icono: '🧸',
    categoria: 'Textiles',
  },
  {
    id: 'comp-3',
    nombre: 'Ropa',
    descripcion: 'Ropa para recién nacido',
    icono: '👕',
    categoria: 'Vestuario',
  },
  {
    id: 'comp-4',
    nombre: 'Baberos',
    descripcion: 'Baberos de algodón',
    icono: '🥄',
    categoria: 'Alimentación',
  },
  {
    id: 'comp-5',
    nombre: 'Toallas',
    descripcion: 'Toallas suaves para bebé',
    icono: '🛁',
    categoria: 'Baño',
  },
  {
    id: 'comp-6',
    nombre: 'Paños húmedos',
    descripcion: 'Toallitas húmedas hipoalergénicas',
    icono: '🧻',
    categoria: 'Cuidado',
  },
  {
    id: 'comp-7',
    nombre: 'Gorritos',
    descripcion: 'Gorritos de algodón',
    icono: '🧢',
    categoria: 'Vestuario',
  },
  {
    id: 'comp-8',
    nombre: 'Medias',
    descripcion: 'Medias suaves para bebé',
    icono: '🧦',
    categoria: 'Vestuario',
  },
] as const;

export const GALLERY_IMAGES = [
  { id: 1, src: '/images/gallery-1.jpg', alt: 'Andrea y Miguel' },
  { id: 2, src: '/images/gallery-2.jpg', alt: 'Andrea y Miguel' },
  { id: 3, src: '/images/gallery-3.jpg', alt: 'Andrea y Miguel' },
  { id: 4, src: '/images/gallery-4.jpg', alt: 'Andrea y Miguel' },
] as const;

export const SAMPLE_PREMIUM_GIFTS = [
  {
    nombre: 'Cuna',
    descripcion: 'Cuna de madera maciza con colchón ortopédico',
    imagen: '/images/cuna.jpg',
  },
  {
    nombre: 'Coche',
    descripcion: 'Carrito de paseo todo terreno reclinable',
    imagen: '/images/coche.jpg',
  },
  {
    nombre: 'Corral',
    descripcion: 'Corral plegable con colchoneta acolchada',
    imagen: '/images/corral.jpg',
  },
  {
    nombre: 'Silla para automóvil',
    descripcion: 'Silla de seguridad grupo 0+ con base isofix',
    imagen: '/images/silla.jpg',
  },
  {
    nombre: 'Bañera',
    descripcion: 'Bañera ergonómica con soporte antideslizante',
    imagen: '/images/banera.jpg',
  },
] as const;
