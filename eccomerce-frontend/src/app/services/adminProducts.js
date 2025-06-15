import { api } from '../services/api';

//llamar a la API para obtener todos los productos, crear un producto, actualizar un producto y eliminar un producto


// crear un producto
export async function createProduct(product) {
  const token = localStorage.getItem('token');
  console.log('Token enviado en createProduct:', token);
  const res = await api.post('/api/products/products', product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}


//obtener todos los productos

export async function getAllProducts() {
  const res = await api.get('/api/products');
  // Si la respuesta es un array, se devuelve; si es un objeto (error), devuelve array vacío
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.products)) return res.data.products;
  return [];
}

// actualizar un producto
export async function updateProduct(id, product) {
  const token = localStorage.getItem('token');
  console.log('Token enviado en updateProduct:', token);
  const res = await api.put(`/api/products/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}


//borrar un producto
export async function deleteProduct(id) {
  const token = localStorage.getItem('token');
  console.log('Token enviado en deleteProduct:', token);
  const res = await api.delete(`/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
