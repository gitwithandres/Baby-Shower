import { EVENT } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-beige-100/50 py-12 px-4 mt-24">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-12 h-0.5 bg-beige-400 mx-auto mb-6" />

        <p className="font-serif text-2xl text-beige-400 mb-2">
          {EVENT.babyName}
        </p>
        <p className="text-sm text-beige-500/70 mb-4">
          Con amor, {EVENT.parent1} y {EVENT.parent2}
        </p>

        <p className="text-xs text-beige-300">
          &copy; {currentYear} &middot; Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
