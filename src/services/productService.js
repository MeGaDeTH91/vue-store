import { HTTP } from './httpService';

export const productService = {
  getAll,
  create,
};

async function getAll() {
  return await HTTP.get('products/all');
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
