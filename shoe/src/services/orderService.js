// src/services/orderService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

const createOrder = async (orderData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, orderData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default {
  createOrder,
};