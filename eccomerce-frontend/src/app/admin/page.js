'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/adminProducts';

export default function AdminPage() {

  // Estado para manejar los productos, formulario, edición, carga y errores
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null); // id del producto o si es null
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    categoria: '',
  });

  // Estados para manejar la carga y errores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  // Función para obtener todos los productos al cargar la página
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario, ya sea para crear o actualizar un producto

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await updateProduct(editing, form);
      } else {
        await createProduct(form);
      }
      setForm({ name: '', description: '', price: '', image_url: '', categoria: '' });
      setEditing(null);
      fetchProducts();
    } catch (err) {
      setError('Error al guardar producto');
      console.error('Error real al guardar producto:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
// Funciones para manejar la edición y eliminación de productos
  const handleEdit = product => {
    setEditing(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
      categoria: product.categoria || '',
    });
  };


  // realizar un delete
  const handleDelete = async id => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    setLoading(true);
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError('Error al eliminar producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de productos</h1>
      <div className="mb-4">
        <Link href="/Panel" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">&larr; Volver al panel</Link>
      </div>
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" className="border p-2 rounded" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Precio" type="number" className="border p-2 rounded" required />
        <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="URL de imagen" className="border p-2 rounded" required />
        <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoria" className="border p-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción" className="border p-2 rounded col-span-1 sm:col-span-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded col-span-1 sm:col-span-2">
          {editing ? 'Actualizar' : 'Crear'} producto
        </button>
        {editing && (
          <button type="button" onClick={() => { setEditing(null); setForm({ name: '', description: '', price: '', image_url: '', categoria: '' }); }} className="bg-gray-400 text-white px-4 py-2 rounded col-span-1 sm:col-span-2">Cancelar edición</button>
        )}
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? <p>Cargando...</p> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Nombre</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Categoría</th>
              <th className="p-2">Imagen</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t">
                <td className="p-2">{product.name}</td>
                <td className="p-2">${product.price}</td>
                <td className="p-2">{product.categoria}</td>
                <td className="p-2">
                  <Image src={product.image_url} alt={product.name} width={64} height={64} className="w-16 h-16 object-cover" />
                </td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(product)} className="bg-yellow-400 px-2 py-1 rounded text-white">Editar</button>
                  <button onClick={() => handleDelete(product.id)} className="bg-red-500 px-2 py-1 rounded text-white">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
