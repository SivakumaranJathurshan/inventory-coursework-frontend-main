import API from './api';

// Inventory API calls
const getInventory = () => API.get('/inventory');
const getInventoryById = (id) => API.get(`/inventory/${id}`);
const createInventoryItem = (data) => API.post('/inventory', data);
const updateInventoryItem = (id, data) => API.put(`/inventory/${id}`, data);
const deleteInventoryItem = (id) => API.delete(`/inventory/${id}`);
const updateStock = (productId, quantity) => API.put(`/inventory/update-stock/${productId}`, quantity);

export default {
  getInventory,
  getInventoryById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateStock,
};
