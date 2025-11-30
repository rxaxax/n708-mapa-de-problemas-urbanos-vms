/* import api from "./api";

// ----------------------------
// REGISTER
// ----------------------------
export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await api.post("/users/register", data);

  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
}

// ----------------------------
// LOGIN
// ----------------------------
export async function loginUser(credentials: {
  email: string;
  password: string;
}) {
  const res = await api.post("/users/login", credentials);

  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data; // { token, user }
}

// ----------------------------
// LOGOUT
// ----------------------------
export function logout() {
  localStorage.removeItem("token");
}
 */

import api from "./api";

// ----------------------------
// REGISTER
// ----------------------------
export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await api.post("/users/register", data);

  // O backend PRECISA retornar: { token, user }
  if (res.data?.token && res.data?.user) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }

  return res.data; // { token, user }
}

// ----------------------------
// LOGIN
// ----------------------------
export async function loginUser(credentials: {
  email: string;
  password: string;
}) {
  const res = await api.post("/users/login", credentials);

  // Mesmo formato: { token, user }
  if (res.data?.token && res.data?.user) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }

  return res.data;
}

// ----------------------------
// LOGOUT
// ----------------------------
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
