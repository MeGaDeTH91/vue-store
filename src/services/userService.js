import { HTTP } from "./httpService";

export const userService = {
  login,
  logout,
  register
};

function login(email, password) {
  return HTTP.post(`users/login`, { email, password })
    .then((response) => {
      localStorage.setItem("access-token", JSON.stringify(response));
    })
    .catch((e) => {
      console.log(e);
    });
}


function register(email, fullName, phone, password, rePassword) {
  return HTTP.post(`users/register`, { email, fullName, phone, password, rePassword })
    .then((response) => {
      login(email, password);

      return response;
    })
    .catch((e) => {
      console.log(e);
    });
}

function logout() {
  localStorage.removeItem("access-token");
}
