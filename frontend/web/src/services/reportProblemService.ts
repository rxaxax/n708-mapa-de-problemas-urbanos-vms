export async function createProblem(data: any) {
  try {
    const token = localStorage.getItem("token"); // 🔥 PEGAR TOKEN
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔥 ENVIAR TOKEN AQUI
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Erro ao enviar problema");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro no createProblem:", error);
    throw error;
  }
}
