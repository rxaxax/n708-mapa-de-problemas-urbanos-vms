export async function createProblem(data: any) {
  try {
    const token = localStorage.getItem("token");

    const form = new FormData();

    // Campos normais
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "images") {
        form.append(key, String(value));
      }
    });

    // Imagens
    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((file: File) => {
        form.append("images", file);
      });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // 🔥 NÃO DEFINA Content-Type
      },
      body: form,
    });

    if (!res.ok) {
      const txt = await res.text();
      console.log("🔥 Resposta do backend:", txt);
      throw new Error("Erro ao enviar problema");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro no createProblem:", error);
    throw error;
  }
}
