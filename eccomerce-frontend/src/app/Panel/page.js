'use client';

import { useAuth } from '../context/Authcontext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserPanel() {

  // Obtener el usuario y la función de logout del contexto de autenticación
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    // Si no hay usuario logeado, redirige a login
    if (typeof window !== 'undefined') router.push('/Login');
    return null;
  }

  const handleLogout = () => {
    logout();
    // Forzar recarga para limpiar el contexto y la UI
    window.location.href = '/';
  };

  // Obtener el nombre del usuario desde diferentes posibles campos
  const userName = user.name || user.nombre || user.email || 'Usuario';

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Panel de usuario</h1>
      <p className="mb-4">Bienvenido, <span className="font-semibold">{userName}</span></p>
      <div className="flex flex-col gap-4 mb-6">
        <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded text-center">Ver productos</Link>
        <Link href="/cart" className="bg-green-500 text-white px-4 py-2 rounded text-center">Ir al carrito</Link>
        {user.rol === 'admin' && (
          <Link href="/admin" className="bg-yellow-500 text-white px-4 py-2 rounded text-center">Gestión de productos (Admin)</Link>
        )}
      </div>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded w-full">Cerrar sesión</button>
    </div>
  );
}
