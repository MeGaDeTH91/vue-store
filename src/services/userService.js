import { HTTP } from "./httpService";

export const userService = {
  login,
  logout,
};

function login(email, password) {

  return HTTP.post(`users/login`, { email, password })
    .then((response) => {
      console.log("RES: ", response)
      localStorage.setItem("access-token", JSON.stringify(response));
    })
    .catch((e) => {
      console.log(e);
    });
}

function logout() {
  localStorage.removeItem("access-token");
}
