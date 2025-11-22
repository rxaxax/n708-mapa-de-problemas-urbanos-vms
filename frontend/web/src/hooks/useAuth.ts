// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export function useAuth() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) router.push("/login");
//   }, []);
// }

"use client";

import { useState } from "react";
import { loginUser as loginService } from "../services/authService";
import { useRouter } from "next/navigation";

// export function useAuth() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function login(email: string, password: string) {
//     try {
//       setLoading(true);
//       setError("");

//       await loginService({ email, password });

//       router.push("/dashboard");
//     } catch (err: any) {
//       setError(err.response?.data?.error || "Erro ao fazer login");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return {
//     login,
//     loading,
//     error,
//   };
// }

export function useAuth() {
  const login = (token: string) => {
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return { login, logout, isAuthenticated };
}
