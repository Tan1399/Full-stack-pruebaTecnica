'use client';

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Cart() {
  const { cart, removeFromCart, getTotal } = useCart();

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Tu carrito</h1>
      <div className="mb-4">
        <Link
          href="/"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          &larr; Volver a productos
        </Link>
      </div>
      {cart.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border p-4 rounded"
              >
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right mt-6">
            <h2 className="text-2xl font-bold">Total: ${getTotal()}</h2>
          </div>
        </div>
      )}
    </div>
  );
}