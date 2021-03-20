import { HTTP } from './httpService';

export const orderService = {
  getUserOrders,
  createOrder,
  getUserCart,
  addToCart,
  removeFromCart,
};

async function getUserOrders(id) {
  return await HTTP.get(`orders/user-orders?userId=${id}`);
}

async function createOrder(id) {
  return await HTTP.post(`orders/create-order?userId=${id}`);
}

async function getUserCart(id) {
  return await HTTP.get(`orders/user-cart?userId=${id}`);
}

async function addToCart(productId, userId) {
  return await HTTP.post(`orders/add-to-cart?productId=${productId}`, {
    userId,
  });
}

async function removeFromCart(id, userId) {
  return await HTTP.post(`orders/remove-from-cart?productId=${id}`, {
    userId,
  });
}
