'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'admin123';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else if (pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-50">
        <div className="animate-spin w-8 h-8 border-2 border-beige-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null;
  }

  return (
    <div className="min-h-screen bg-beige-50">
      {isAuthenticated && pathname !== '/admin/login' && (
        <AdminNav />
      )}
      {children}
    </div>
  );
}

function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    sessionStorage.removeItem('admin_auth');
    router.replace('/admin/login');
  }

  const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/gifts', label: 'Regalos' },
    { href: '/admin/messages', label: 'Mensajes' },
    { href: '/admin/attendance', label: 'Asistencia' },
  ];

  return (
    <nav className="bg-white border-b border-beige-100 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
                pathname === link.href
                  ? 'bg-beige-100 text-beige-500 font-medium'
                  : 'text-beige-400 hover:text-beige-500'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-beige-400 hover:text-beige-500 cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
