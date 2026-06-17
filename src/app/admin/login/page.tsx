'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'admin123';

    if (password === adminPassword) {
      sessionStorage.setItem('admin_auth', 'true');
      router.replace('/admin');
    } else {
      setError('Contraseña incorrecta');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 max-w-sm w-full border border-beige-100 shadow-xl space-y-6"
      >
        <div className="text-center">
          <h1 className="font-serif text-2xl text-beige-500 mb-1">
            Administración
          </h1>
          <p className="text-sm text-beige-400/70">
            Ingresa la contraseña para acceder
          </p>
        </div>

        <Input
          id="admin-password"
          type="password"
          label="Contraseña"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
        />

        <Button type="submit" variant="gold" className="w-full">
          Ingresar
        </Button>
      </form>
    </div>
  );
}
