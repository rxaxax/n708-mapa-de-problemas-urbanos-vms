// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export function useAuth() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) router.push("/login");
//   }, []);
// }

/* "use client";

import { useEffect, useState } from "react";
import { loginUser } from "../services/authService";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  // Carrega usuário salvo ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Login
  async function login(email: string, password: string) {
    const data = await loginUser({ email, password });

    if (!data || !data.token || !data.user) {
      throw new Error("Login inválido: backend não retornou token + user");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);

    return data.user;
  }

  // Logout
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  }

  function isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  return {
    user,             // 🔥 agora temos o usuário!!
    login,
    logout,
    isAuthenticated,
  };
}
 */

"use client";

import { useEffect, useState } from "react";
import { loginUser as loginService } from "../services/authService";

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  // Carrega estado inicial
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // LOGIN
  const login = (data: { token: string; user: any }) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // AUTH CHECK
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return { user, login, logout, isAuthenticated };
}
