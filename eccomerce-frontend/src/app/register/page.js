'use client';
import {useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/Authcontext';

export default function RegisterPage() {

    // Estado para los campos del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(name, email, password);
        if (success) router.push('/');
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <h1 className="text-2xl font-bold mb-4">Registro</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
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
                    Registrarse
                </button>
            </form>
            <p className="text-center mt-4">
                ¿Ya tienes una cuenta?{' '}
                <a href="/Login" className="text-blue-500">Inicia sesión aquí</a>
            </p>
        </div>
    );
}
