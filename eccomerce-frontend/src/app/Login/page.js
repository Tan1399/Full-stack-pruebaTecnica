'use client';

import {useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/Authcontext';

export default function LoginPage() {

    // Estado para los campos del formulario
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

      const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) router.push('/Panel');
  };
return (
    <div>
        <div className="max-w-md mx-auto mt-20">
            <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Entrar
                </button>
            </form>
        </div>
        
        <p className="text-center mt-4">
            ¿No estás registrado?{' '}
            <a href="/register" className="text-blue-500">Regístrate aquí</a>
        </p>
        <p className="text-center mt-4 text-gray-600 hover:text-gray-800">
            <a href="/register" className="underline">
                Crear una nueva cuenta
            </a>
        </p>
    </div>
);
    }
