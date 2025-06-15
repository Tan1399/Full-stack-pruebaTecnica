'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import ProductCard from "./components/Productcard";
import { fetchProducts } from "./services/products";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/Authcontext";
import Link from "next/link";

export default function Home() {

  // Estado para manejar los productos, categoría, página actual, total de páginas y estado de carga
  const [products, setProducts] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useCart();
  const { user, loading: authLoading } = useAuth();


  //use effect para cargar los productos al montar el componente y al cambiar la página o categoría
  useEffect(() => {
    setLoading(true);
    fetchProducts({ page, categoria })
      .then((data) => {
        setProducts(Array.isArray(data.products) ? data.products : []);
        setTotalPages(data.totalPages || 1);
      })
      .finally(() => setLoading(false));
  }, [page, categoria]);

  useEffect(() => {
    console.log('Valor de user en Home:', user);
  }, [user]);

  if (authLoading) return null; // O puedes mostrar un loader

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-end gap-4 mb-4">
        {user && user.id ? (
          <>
            <Link href="/cart" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Ir al carrito</Link>
            <Link href="/Panel" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Panel</Link>
          </>
        ) : (
          <>
            <Link href="/Login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Iniciar sesión</Link>
            <Link href="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Registrarse</Link>
          </>
        )}
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Productos disponibles
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Categoría..."
          value={categoria}
          onChange={(e) => {
            setCategoria(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded w-full sm:w-64"
        />
      </div>
      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            console.log('Producto renderizado:', product);
            return (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={user && user.id ? () => addToCart(product) : null}
              />
            );
          })}
        </div>
      )}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
