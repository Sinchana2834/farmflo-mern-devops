import api from "./api";

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const fetchConsumerOrders = async (id) => {
  const response = await api.get(`/orders/consumer/${id}`);
  return response.data;
};

export const fetchFarmerOrders = async (id) => {
  const response = await api.get(`/orders/farmer/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}/status`, { status });
  return response.data;
};
