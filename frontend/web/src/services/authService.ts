import api from "./api";

export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await api.post("/auth/register", data);
  localStorage.setItem("token", res.data.token);
  return res.data;
}

export async function loginUser(credentials: { email: string; password: string }) {
  const res = await fetch("http://localhost:4000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error("Login inválido");
  }

  return res.json(); // deve retornar { token, user }
}


export function logout() {
  localStorage.removeItem("token");
}
