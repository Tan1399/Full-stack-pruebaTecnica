import {productsApi} from '../services/api';


// Función para obtener productos con paginación y búsqueda
export async function fetchProducts({ page = 1, search = '', categoria = '' }) {
  const params = {};
  if (search) params.search = search;
  if (categoria) params.categoria = categoria;
  params.page = page;
  params.limit = 10;
  const res = await productsApi.get('/', { params });
  if (Array.isArray(res.data)) {
    return { products: res.data, totalPages: 1 };
  }
  return res.data;
}
