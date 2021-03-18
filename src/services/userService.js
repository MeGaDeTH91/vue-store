import { HTTP } from './httpService';

export const userService = {
  login,
  logout,
  register,
  getUser,
  getAllUsers,
  editUser,
  changeUserStatus,
};

function login(email, password) {
  return HTTP.post(`users/login`, { email, password })
    .then((response) => {
      localStorage.setItem('access-token', JSON.stringify(response));
    })
    .catch((e) => {
      console.log(e);
    });
}

function register(email, fullName, phone, password, rePassword) {
  return HTTP.post(`users/register`, {
    email,
    fullName,
    phone,
    password,
    rePassword,
  })
    .then((response) => {
      login(email, password);

      return response;
    })
    .catch((e) => {
      console.log(e);
    });
}

function logout() {
  localStorage.removeItem('access-token');
}

async function getUser(id) {
  return await HTTP.get(`users/user?id=${id}`);
}

async function getAllUsers() {
  return await HTTP.get('users/all');
}

async function editUser(id, fullName, phone) {
  return await HTTP.put(`users/user?id=${id}`, {
    fullName,
    phone,
  });
}

async function changeUserStatus(id) {
  return await HTTP.put(`users/changeStatus?id=${id}`);
}
