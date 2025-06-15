import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { api } from '../services/api';
import { usePathname } from 'next/navigation';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      try {
        const decoded = jwtDecode(stored);
        setToken(stored);
        setUser(decoded);
      } catch (err) {
        console.error("Token inválido:", err.message);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }
    } else {
      setToken(null);
      setUser(null);
    }
    setLoading(false);
  }, [pathname]);

  //  login: recibe email y password, hace petición al backend y guarda el token
  const login = async (email, password) => {
    try {
      const res = await api.post('/api/auth/login', { email, password });
      const tok = res.data.token;
      const decoded = jwtDecode(tok);
      localStorage.setItem('token', tok);
      setToken(tok);
      setUser(decoded);
      return true;
    } catch (err) {
      console.error("Error al hacer login:", err.response?.data || err.message);
      return false;
    }
  };

  //register: recibe name, email y password, hace petición al backend y guarda el token
  const register = async (name, email, password) => {
    try {
      const res = await api.post('/api/auth/register', { name, email, password });
      console.log('Respuesta del backend al registrar:', res.data);
      const tok = res.data.token;
      console.log('Token recibido:', tok, 'Tipo:', typeof tok);
      const decoded = jwtDecode(tok);
      localStorage.setItem('token', tok);
      setToken(tok);
      setUser(decoded);
      return true;
    } catch (err) {
      console.error("Error al hacer registro:", err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}