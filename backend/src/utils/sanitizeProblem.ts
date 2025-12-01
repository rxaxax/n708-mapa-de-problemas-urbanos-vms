export function sanitizeProblemForResponse(problem: any, requesterId?: string) {
  // recebe um objeto "lean" (JS object) vindo do DB (já com populate)
  const copy = { ...problem };

  // imagens já convertidas pela sua função formatImageUrls
  // Se for anônimo e o requester NÃO for o dono -> remove id/email
  const ownerId = copy.userId?._id?.toString?.() ?? copy.userId?.toString?.();

  const isOwner = requesterId && ownerId && requesterId === ownerId;

  if (copy.anonymous && !isOwner) {
    // Substitui userId por um objeto seguro sem identificadores
    copy.userId = { name: "Anônimo" };
    // opcional: remova qualquer outro campo que exponha id
    delete copy.userId?._id;
    delete copy.userId?.email;
  } else if (copy.userId) {
    // Se não for anônimo — expõe somente _id e name (remove email)
    copy.userId = {
      _id: copy.userId._id?.toString?.() ?? copy.userId,
      name: copy.userId.name || copy.userId,
    };
  }

  return copy;
}
