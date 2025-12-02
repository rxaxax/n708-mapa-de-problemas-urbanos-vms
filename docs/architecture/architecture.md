# Arquitetura do Sistema

---

## Descrição Geral

A aplicação segue uma arquitetura **cliente-servidor**, separando claramente:

- **Frontend (Next.js)** — camada de apresentação e interação com usuário.  
- **Backend (Node.js + Express)** — serviços REST, autenticação, regras de negócio.  
- **Banco (MongoDB)** — armazenamento dos problemas e usuários.

O sistema utiliza autenticação JWT e se comunica exclusivamente via requisições HTTP REST.

---

## Componentes do Sistema

### **Frontend**
- Interface de login e cadastro  
- Formulário de denúncia  
- Mapa interativo Leaflet  
- Painel administrativo (opcional)

### **Backend**
- Controller de usuários  
- Controller de problemas  
- Middleware de autenticação  
- Serviço de upload de imagens  
- Regras de negócio

### **Database**
- Coleção `users`
- Coleção `issues` (problemas urbanos)

---

## Padrões Arquiteturais Utilizados

- **REST** para comunicação entre sistemas  
- **MVC** no backend  
- **Component-based architecture** no frontend  
- **JWT** para autenticação  
- **DTOs** para padronização de entrada/saída  

---

## Diagrama de Arquitetura

        ┌──────────────────────────┐
        │        FRONTEND          │
        │  Next.js + Leaflet       │
        └─────────────┬────────────┘
                      │ Requisições HTTP (axios)
                      ▼
        ┌──────────────────────────┐
        │         BACKEND          │
        │  Node.js + Express       │
        │  Controllers / Services  │
        └─────────────┬────────────┘
                      │ Mongoose
                      ▼
        ┌──────────────────────────┐
        │          MongoDB         │
        └──────────────────────────┘

---

## Decisões Técnicas e Justificativas

### **1. MongoDB**
- Flexibilidade no armazenamento de dados geoespaciais (pontos no mapa).
- Fácil integração com Node.

### **2. Next.js**
- Melhor performance e SEO.
- Simples de integrar com Leaflet.

### **3. Express**
- Simples, rápido e flexível para APIs pequenas.

### **4. JWT**
- Independente de sessão.
- Simples de usar em apps SPA.

