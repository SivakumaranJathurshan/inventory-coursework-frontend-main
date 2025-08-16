import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7037/api',
});

// Attach JWT token on every request if available
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (userData) => API.post('/auth/register', userData);
export const login = (credentials) => API.post('/auth/signin', credentials);

//Products
export const getProducts = () => API.get('/products');
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Suppliers
export const getSuppliers = () => API.get('/suppliers');
export const createSupplier = (supplier) => API.post('/suppliers', supplier);
export const updateSupplier = (id, supplier) => API.put(`/suppliers/${id}`, supplier);
export const deleteSupplier = (id) => API.delete(`/suppliers/${id}`);

// Categories
export const getCategories = () => API.get('/categories');
export const createCategory = (category) => API.post('/categories', category);
export const updateCategory = (id, category) => API.put(`/categories/${id}`, category);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

//Orders
export const getOrders = () => API.get('/orders');
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const createOrder = (orderData) => API.post('/orders', orderData);
export const updateOrder = (id, orderData) => API.put(`/orders/${id}`, orderData);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, status);



// Optional: helper to set auth token manually
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
