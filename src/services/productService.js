import { HTTP } from './httpService';

export const productService = {
  getAll,
  get,
  create,
  edit,
};

async function getAll() {
  return await HTTP.get('products/all');
}

async function get(id) {
  return await HTTP.get(`products/product?id=${id}`);
}

async function create(title, description, imageURL, price, quantity, category) {
  return await HTTP.post('products/create', {
    title,
    description,
    imageURL,
    price,
    quantity,
    category,
  });
}

async function edit(
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
