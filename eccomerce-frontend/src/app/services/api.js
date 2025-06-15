import axios from 'axios';
//api para conectar con el backend, se usa axios para hacer peticiones HTTP
const api = axios.create({
  baseURL: 'http://localhost:4000', // base del puerto que conecta al backend
});


// api para conectar con los productos, se usa axios para hacer peticiones HTTP
 const productsApi = axios.create({
  baseURL: 'http://localhost:4000/api/products',
});

export  {api, productsApi};