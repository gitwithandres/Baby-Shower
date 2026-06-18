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
  whatsappNumber: '573183396465',
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
    nombre: 'Bañera con Cambiador',
    descripcion: 'Bañera ergonómica con cambiador integrado y soporte antideslizante',
    imagen: '/images/baneracambiador.jpeg',
  },
  {
    nombre: 'Baby Kit',
    descripcion: 'Kit completo de cuidado esencial para recién nacido',
    imagen: '/images/babykit.jpeg',
  },
  {
    nombre: 'Cuna Corral Génova',
    descripcion: 'Cuna corral plegable modelo Génova con colchoneta acolchada',
    imagen: '/images/cunacorralgenova.jpeg',
  },
  {
    nombre: 'Esterilizador de Teteros',
    descripcion: 'Esterilizador eléctrico para biberones y accesorios',
    imagen: '/images/esterilizadorteteros.jpeg',
  },
  {
    nombre: 'Gimnasio para Bebé',
    descripcion: 'Gimnasio de estimulación temprana con colchoneta y juguetes colgantes',
    imagen: '/images/gimnasio.jpeg',
  },
  {
    nombre: 'Mecedora',
    descripcion: 'Mecedora clásica de madera para bebé',
    imagen: '/images/mecedora.jpeg',
  },
  {
    nombre: 'Mecedora Eléctrica',
    descripcion: 'Mecedora automática con vibración y sonidos relajantes',
    imagen: '/images/mecedorelectronico.jpeg',
  },
  {
    nombre: 'Nutribullet',
    descripcion: 'Procesador de alimentos y extractor para papillas y jugos naturales',
    imagen: '/images/nutribullet.jpeg',
  },
  {
    nombre: 'Olla Multifuncional',
    descripcion: 'Olla de cocción lenta y vaporera para preparar comidas saludables',
    imagen: '/images/olla.jpeg',
  },
  {
    nombre: 'Pañalera',
    descripcion: 'Bolso pañalero organizador con múltiples compartimentos',
    imagen: '/images/panalera.jpeg',
  },
  {
    nombre: 'Silla de Comer',
    descripcion: 'Silla de comedor para bebé con bandeja desmontable y ajustable',
    imagen: '/images/sillacomedor.jpeg',
  },
  {
    nombre: 'Set de Teteros',
    descripcion: 'Set de biberones anticólicos con tetinas de silicona',
    imagen: '/images/tetero.jpeg',
  },
  {
    nombre: 'Silla Mecedora Eléctrica MaxyBaby',
    descripcion: 'Silla mecedora eléctrica MaxyBaby con movimientos suaves y melodías',
    imagen: '/images/sillamecedoramaxybaby.jpeg',
  },
  {
    nombre: 'Calentador de Biberón Digital',
    descripcion: 'Calentador de biberón con pantalla digital y control de temperatura',
    imagen: '/images/calentadorbiberon.jpeg',
  },
  {
    nombre: 'Cepillo Eléctrico para Biberón',
    descripcion: 'Cepillo eléctrico rotatorio para limpieza profunda de biberones',
    imagen: '/images/cepillolectrico.jpeg',
  },
  {
    nombre: 'Nido para Bebé - Arte Bebé',
    descripcion: 'Nido acogedor para bebé marca Arte Bebé, ideal para descanso y juego',
    imagen: '/images/nidobebe.jpeg',
  },
] as const;
