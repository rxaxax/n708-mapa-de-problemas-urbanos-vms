import api from "./api";

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

// GET ALL PROBLEMS
export async function getAllProblems(): Promise<ProblemDTO[]> {
  try {
    const { data } = await api.get("/problems", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });

    return data ?? [];
  } catch (error) {
    console.error("Erro no getAllProblems:", error);
    return [];
  }
}

// GET PROBLEM BY ID
export async function getProblemById(
  id: string
): Promise<ProblemDTO | null> {
  try {
    const { data } = await api.get(`/problems/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });

    return data ?? null;
  } catch (error) {
    console.error("Erro no getProblemById:", error);
    return null;
  }
}

// UPDATE PROBLEM (PUT)
export async function updateProblem(id: string, form: FormData) {
  try {
    const { data } = await api.put(`/problems/${id}`, form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error("Erro ao atualizar problema:", error);
    throw error;
  }
}

// DELETE PROBLEM
export async function deleteProblem(id: string) {
  try {
    await api.delete(`/problems/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });

    return true;
  } catch (error) {
    console.error("Erro no deleteProblem:", error);
    throw error;
  }
}
