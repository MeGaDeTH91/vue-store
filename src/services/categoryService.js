import { HTTP } from './httpService';

export const categoryService = {
  getAllCategories,
  createCategory,
  getCategory,
  editCategory,
};

async function getAllCategories() {
  return await HTTP.get('categories/all');
}

async function getCategory(id) {
  return await HTTP.get(`categories/category?id=${id}`);
}

async function createCategory(title, imageURL) {
  return await HTTP.post('categories/create', {
    title,
    imageURL,
  });
}

async function editCategory(id, title, imageURL) {
  return await HTTP.put(`categories/category?id=${id}`, {
    title,
    imageURL,
  });
}
