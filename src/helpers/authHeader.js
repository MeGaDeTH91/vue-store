export function authHeader() {
  let cookie = JSON.parse(localStorage.getItem("access-token"));
  let token;
  
  if (cookie) {
    token = cookie.data.token;
  }

  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: token,
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
}
