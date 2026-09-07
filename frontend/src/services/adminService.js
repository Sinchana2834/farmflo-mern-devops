import api from "./api";

export const fetchUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const fetchProducts = async () => {
  const response = await api.get("/admin/products");
  return response.data;
};

export const fetchOrders = async () => {
  const response = await api.get("/admin/orders");
  return response.data;
};
