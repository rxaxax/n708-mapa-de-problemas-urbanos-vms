/* import { API_URL } from "../config/api";

export type ProblemDTO = {
  _id: string;
  title: string;
  description: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  images: string[];
  status?: string;
};

export async function getAllProblems(): Promise<ProblemDTO[]> {
  try {
    const res = await fetch(`${API_URL}/problems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Caso use token:
        Authorization:
          typeof window !== "undefined"
            ? `Bearer ${localStorage.getItem("token")}`
            : "",
      },
      cache: "no-store", // garante que Next não cacheie
    });

    if (!res.ok) {
      console.error("Erro ao buscar problemas:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Erro no getAllProblems:", error);
    return [];
  }
}

 */

import { API_URL } from "../config/api";

export type ProblemDTO = {
  _id: string;
  title: string;
  description: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  images: string[];
  status?: string;
  userId?: { _id: string; name: string };
};

// =========================================
// GET ALL
// =========================================
export async function getAllProblems(): Promise<ProblemDTO[]> {
  try {
    const res = await fetch(`${API_URL}/problems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          typeof window !== "undefined"
            ? `Bearer ${localStorage.getItem("token")}`
            : "",
      },
      cache: "no-store",
    });

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error("Erro no getAllProblems:", error);
    return [];
  }
}

// =========================================
// GET BY ID
// =========================================
export async function getProblemById(id: string): Promise<ProblemDTO | null> {
  try {
    const res = await fetch(`${API_URL}/problems/${id}`, {
      headers: {
        Authorization:
          typeof window !== "undefined"
            ? `Bearer ${localStorage.getItem("token")}`
            : "",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Erro ao buscar problema:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Erro no getProblemById:", error);
    return null;
  }
}

// =========================================
// UPDATE (PUT)
// =========================================
/* export async function updateProblem(id: string, data: any) {
  try {
    const res = await fetch(`${API_URL}/problems/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          typeof window !== "undefined"
            ? `Bearer ${localStorage.getItem("token")}`
            : "",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Erro ao atualizar problema");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro no updateProblem:", error);
    throw error;
  }
} */

export async function updateProblem(id: string, data: FormData) {
  const res = await fetch(`${API_URL}/problems/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // ❌ NÃO DEFINA Content-Type — o browser faz isso automaticamente
    },
    body: data,
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar problema");
  }

  return await res.json();
}

// =========================================
// DELETE
// =========================================
export async function deleteProblem(id: string) {
  try {
    const res = await fetch(`${API_URL}/problems/${id}`, {
      method: "DELETE",
      headers: {
        Authorization:
          typeof window !== "undefined"
            ? `Bearer ${localStorage.getItem("token")}`
            : "",
      },
    });

    if (!res.ok) {
      throw new Error("Erro ao excluir problema");
    }

    return true;
  } catch (error) {
    console.error("Erro no deleteProblem:", error);
    throw error;
  }
}
