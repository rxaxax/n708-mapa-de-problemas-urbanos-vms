# Especificação da API
---

## Autenticação

A API utiliza **JWT (JSON Web Token)**.

### - Envio do token

Para rotas protegidas, envie:

`Authorization: Bearer <seu_token>`

O token é obtido na rota **/auth/login**.

---

## Estrutura Geral da API

A API está dividida em:

- **/auth** → Registro e login de usuários
- **/problems** → CRUD de problemas urbanos
- **/uploads** → Upload de imagens via Multer + Cloudinary
---

# MODELOS

## **User**

```
{   "_id": "string",   "name": "string",   "email": "string",   "password": "hashed string",   "role": "user | admin",   "createdAt": "date",   "updatedAt": "date" }
```

## **Problem**

```
{   "_id": "string",   "title": "string",   "description": "string",   "category": "string",   "imageUrl": "string",   "status": "pendente | resolvido | em_andamento",   "location": {     "latitude": "number",     "longitude": "number"   },   "user": "userId",   "createdAt": "date",   "updatedAt": "date" }
```


---
# ROTAS — Autenticação (`/auth`)

---

## **POST `/auth/register`**

Cria um novo usuário.

### **Body JSON**

```
{   
	"name": "Renato",   
	"email": "renato@example.com",   
	"password": "123456" 
}
```

### **Respostas**

#### ✔️ Sucesso — 201

```
{   
	"message": "User created successfully",   
	"user": {     
		"_id": "string",     
		"name": "Renato",     
		"email": "renato@example.com",     
		"role": "user"   
	} 
}
```

#### ❌ Erro — 400

E-mail já existe.

```
{ 
	"error": "Email already in use" 
}
```

---

## **POST `/auth/login`**

Autentica usuário.

### **Body JSON**

```
{   
	"email": "renato@example.com",   
	"password": "123456" 
}
```

### **Resposta — 200**

```
{   
	"message": "Login successful",   
	"token": "jwt_token_here",   
	"user": {     
		"_id": "string",     
		"name": "Renato",     
		"email": "renato@example.com",     
		"role": "user"   
	} 
}
```

#### ❌ Erro — 401

Senha incorreta ou email inexistente.

---

# ROTAS — Problemas (`/problems`)

> ⚠ **Todas as rotas abaixo exigem token JWT.**

---

## **GET `/problems`**

Lista todos os problemas cadastrados.

### Parâmetros opcionais (query)

`?category=Pavimentação ?status=pendente`

### ✔️ Resposta — 200

```
[   
	{     
		"_id": "123",     
		"title": "Buraco na rua",     
		"description": "Muito grande",     
		"category": "Pavimentação",     
		"status": "pendente",     
		"imageUrl": "https://cloudinary.com/photo.jpg",     
		"createdAt": "data",     
		"user": {       
			"_id": "u1",       
			"name": "Renato"     
		}   
	} 
]
```

---

## **GET `/problems/:id`**

Retorna um problema específico.

### ✔️ Resposta — 200

```
{   
	"_id": "123",   
	"title": "Buraco na rua",   
	"description": "Muito grande",   
	"status": "pendente",   
	"category": "Pavimentação" }
```

#### ❌ Erro — 404

`{ "error": "Problem not found" }`

---

## **POST `/problems`**

Cria um novo problema.

> Envio obrigatório em **multipart/form-data**, pois inclui imagem.

### **Campos form-data**

|Campo|Tipo|Obrigatório|Descrição|
|---|---|---|---|
|title|text|✔|Título do problema|
|description|text|✔|Descrição|
|category|text|✔|Pavimentação, Iluminação etc|
|image|file|Opcional|Foto do problema|

### ✔️ Resposta — 201

```
{   
	"message": "Problem created successfully",   
	"problem": {     
		"_id": "string",     
		"title": "Buraco na rua",     
		"imageUrl": "https://cloudinary.com/.../img.jpg",     
		"status": "pendente"   
	} 
}
```

---

## **PUT `/problems/:id`**

Atualiza um problema.

### **Body JSON**

```
{   
	"title": "Buraco enorme",   
	"status": "em_andamento" 
}
```

### ✔️ Resposta — 200

```
{   
	"message": "Problem updated",   
	"problem": {     
		"title": "Buraco enorme",     
		"status": "em_andamento"   
	} 
}
```

---

## **DELETE `/problems/:id`**

Remove um problema.

### ✔️ Resposta — 200

`{ "message": "Problem deleted successfully" }`

---

# **Upload de Imagem**

A imagem é enviada via Multer e depois enviada ao Cloudinary.

### Comportamento:

1. Front envia `multipart/form-data`
    
2. Multer captura o arquivo do campo `image`
    
3. Backend envia ao Cloudinary
    
4. URL final é salva no banco
    

### Resposta de upload bem-sucedido:

`{   "imageUrl": "https://res.cloudinary.com/.../file.jpg" }`

---

# Middleware de Autorização

### Resposta quando token é ausente ou inválido:

`{ "error": "Access denied" }`

---

# Códigos de Status Utilizados

|Código|Descrição|
|---|---|
|200|OK|
|201|Criado|
|400|Erro de validação|
|401|Não autorizado|
|404|Não encontrado|
|500|Erro interno|

---

# Exemplos de Requisições

## Criar problema (curl)

```
curl -X POST http://localhost:5000/problems \   
	-H "Authorization: Bearer TOKEN" \   
	-F "title=Buraco" \   
	-F "description=Perigoso" \   
	-F "category=Pavimentação" \   
	-F "image=@/caminho/foto.jpg"
```
