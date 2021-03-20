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

async function login(email, password) {
  try {
    let response = await HTTP.post(`users/login`, { email, password })
    localStorage.setItem('access-token', JSON.stringify(response));

    return response.data.user;
  } catch (error) {
    console.log(error)
    throw new Error('Invalid credentials!');
  }
}

async function register(email, fullName, phone, password, rePassword) {
  await HTTP.post(`users/register`, {
    email,
    fullName,
    phone,
    password,
    rePassword,
  });

  return await login(email, password);
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
