// layout.js
'use client';
import { AuthProvider } from './context/Authcontext';
import { CartProvider } from './context/CartContext';
import './globals.css';

export default function RootLayout({ children }) {

  // lógica adicional si es necesario, como manejar el estado de autenticación o el carrito
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}