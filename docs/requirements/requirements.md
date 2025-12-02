# Requisitos do Sistema — Mapa de Problemas Urbanos

---

## Requisitos Funcionais (RF)

**RF01** — O sistema deve permitir cadastro de usuário.  
**RF02** — O sistema deve permitir login com autenticação JWT.  
**RF03** — O usuário deve poder reportar um problema urbano.  
**RF04** — O problema deve conter: título, descrição, categoria, foto opcional, localização (lat/lng).  
**RF05** — O usuário pode escolher fazer a denúncia como **identificado** ou **anônimo**.  
**RF06** — O sistema deve exibir os problemas em um **mapa interativo**.  
**RF07** — Deve ser possível filtrar problemas por categoria ou status.  
**RF08** — O usuário autenticado pode editar ou excluir problemas que ele criou.  
**RF09** — O administrador pode alterar o status de qualquer problema.  
**RF10** — O sistema deve registrar a data de criação e atualização da denúncia.

---

## Requisitos Não Funcionais (RNF)

**RNF01** — O sistema deve ser responsivo e acessível.  
**RNF02** — A API deve responder em no máximo 2 segundos por requisição.  
**RNF03** — A comunicação entre frontend e backend deve ser feita por JSON (REST).  
**RNF04** — As senhas devem ser armazenadas com hash (bcrypt).  
**RNF05** — O sistema deve suportar pelo menos 100 usuários simultâneos.  
**RNF06** — O código deve seguir boas práticas de modularização e padrão MVC.  

---

## Regras de Negócio (RN)

**RN01** — Apenas usuários autenticados podem registrar problemas.  
**RN02** — Usuários podem marcar a denúncia como "anônima", mas o sistema guarda internamente o autor.  
**RN03** — A exclusão ou edição de uma denúncia só pode ser feita pelo autor ou administrador.  
**RN04** — O status inicial de qualquer problema deve ser "pendente".  
**RN05** — Administradores podem alterar status para "em andamento" ou "resolvido".

---

## Perfis de Usuários

### **Usuário comum**
- Pode reportar problemas.
- Pode editar e excluir apenas seus próprios problemas.
- Pode visualizar todo o mapa.
- Pode optar por denúncia anônima.

### **Administrador**
- Pode visualizar, editar e excluir qualquer denúncia.
- Pode alterar status de qualquer problema.

---

## Histórias de Usuário

### **US01 — Cadastro**
> Como morador, quero criar uma conta para poder reportar problemas no bairro.

### **US02 — Reportar problema**
> Como morador autenticado, quero registrar um problema urbano para que ele seja exibido no mapa.

### **US03 — Denúncia anônima**
> Como usuário, quero enviar uma denúncia anonimamente para não expor minha identidade.

### **US04 — Visualizar problemas**
> Como cidadão, quero estudar o mapa para ver onde estão os principais problemas urbanos.

### **US05 — Atualizar status**
> Como administrador, quero mudar o status de um problema para acompanhar sua resolução.

