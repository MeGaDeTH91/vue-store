import { HTTP } from './httpService';

export const productService = {
  getAllProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};

async function getAllProducts() {
  return await HTTP.get('products/all');
}

async function getProduct(id) {
  return await HTTP.get(`products/product?id=${id}`);
}

async function createProduct(
  title,
  description,
  imageURL,
  price,
  quantity,
  category
) {
  return await HTTP.post('products/create', {
    title,
    description,
    imageURL,
    price,
    quantity,
    category,
  });
}

async function editProduct(
  id,
  title,
  description,
  imageURL,
  price,
  quantity,
  category
) {
  return await HTTP.put(`products/product?id=${id}`, {
    title,
    description,
    imageURL,
    price,
    quantity,
    category,
  });
}

async function deleteProduct(id) {
  return await HTTP.delete(`products/product?id=${id}`, {});
}
