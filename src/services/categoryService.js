import { HTTP } from './httpService';

export const categoryService = {
  getAll,
  create,
};

async function getAll() {
  return await HTTP.get('categories/all');
}

async function create(title, imageURL) {
  return await HTTP.post('categories/create', {
    title,
    imageURL,
  });
}
