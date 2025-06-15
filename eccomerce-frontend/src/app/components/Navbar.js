import Link from 'next/link';
import { useAuth } from '../context/Authcontext';
import { useEffect } from 'react';

export default function Navbar() {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('Estado de user en Navbar:', user);
  }, [user]);

  if (loading) return null; // O puedes mostrar un loader

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link href="/">Inicio</Link>
      <div className="flex gap-4">
        {user && user.id && <Link href="/cart">Carrito</Link>}
        {!user || !user.id ? <Link href="/Login">Login</Link> : null}
        {!user || !user.id ? <Link href="/register">Registro</Link> : null}
        {user && user.id && <Link href="/panel">Panel</Link>}
        {user && user.rol === 'admin' && <Link href="/admin">Admin</Link>}
      </div>
    </nav>
  );
}