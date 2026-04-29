# 🚀 API ZelaDoa 

## 📌 Sobre o Projeto

A API ZelaDoa - Doações foi criada para registrar e gerenciar necessidades de doações em locais afetados, como:

Comunidades em situação de risco
Áreas afetadas por enchentes
Regiões com falta de recursos básicos

Essa API permite criar, visualizar, atualizar e deletar registros de doações.

## 🛠️ Tecnologias utilizadas

Node.js
Express
SQLite
SQLite3
Postman
Nodemon

---
## 📦 Instalação
`npm install`

## ▶️ Como Executar
```bash
npm run dev
```

A API estará disponível em:

`http://localhost:3000
`
[Clique Aqui](http:localhost:3000)

---


## 🗄️ Banco de Dados

O banco de dados é criado automaticamente ao iniciar o projeto.

```
database.db
```

## 🧾 Tabela doacoes
|Campo                   |	Descrição                               |
|------------------------|------------------------------------------|
|id            	         |Identificador único                       |
|local_afetado	         |	Local onde a doação é necessária        |
|itens_necessarios	     |	Itens que precisam ser doados           | 
|quantidade_necessaria   |	Quantidade necessária                   |
|prioridade	             |	Baixa, Média ou Alta                    |
|status_doacao	         |Status (Faltando, Em andamento, Lotado)|

---

## 🔗 Endpoints


### Rota Inicial
##
```http
GET /
```

Retorna uma página HTML simples com informações da API.

---

```http
GET /doacao
```
### Rota para listar todas as doações
```
## Rota para buscar um incidente específico
(ID)
```http
GET /doacoes/:id

Ex: /doacoes/1

### Rota para criar um novo

```http
POST /doacoes
```
### bady (JSON)

```json

### Body (JSON)

{
  "local_afetado": "Rocinha",
  "itens_necessarios": "Água, alimentos",
  "quantidade": 100,
  "prioridade": "Alta",
  "status_doacao": "Lotado"
}

```

### Rota para Atualizar doação

```http
PUT /doacoes/:id
```
### body (JSON)
```json

{
  "itens_necessarios": "Água, alimentos e roupas",
  "quantidade": 150,
  "prioridade": "Alta",
  "status_doacao": "Lotado"
}
```
### Rota para Deletar doação
```http
DELETE /doacoes/:id
```

---

## 🔐 Segurança

A API utiliza  `?` nas queries SQL:

```sql
WHERE id = ?
```

Isso evita ataques de SQL Injection.

## 📚 Conceitos
CRUD (Create, Read, Update, Delete)
Rotas com Express
Métodos HTTP (GET, POST, PUT, DELETE)
Banco de dados SQLite
SQL básico
Uso de `req.params` e `req.body`

## 🎯 Observações
O banco é criado automaticamente
Dados iniciais podem ser inseridos se a tabela estiver vazia
A API pode ser testada com o Postman

### Teste com Postman
- Método: `POST`
- URL: `http://localhost:3000/doacoes`
- Headers:
  - `Content-Type: application/json`
- Body: selecione `raw` e `JSON` no Postman
- Body (raw JSON):
```json
{
  "local": "Abrigo Escola A",
  "item": "água",
  "quantidade": 50,
  "prioridade": "Alta"
}
```

Importante:
- use aspas duplas `"` em todas as chaves e valores de texto
- não deixe vírgula extra depois do último item
- o corpo deve ser JSON válido para evitar o erro `Corpo JSON inválido`

A resposta retorna o novo registro com `status_doacao`, `item` e `prioridade`.

## 👩‍💻 Projeto educacional

Este projeto foi desenvolvido para fins de aprendizado em back-end com Node.js.


< ! -- ## Esses emojis é um padrão em praticamente TODO README:

## 🚀 Nome da API / Projeto
## 📌 Sobre o Projeto
## 🎯 Objetivo
## 🛠️ Tecnologias
## 📦 Instalação
## ▶️ Como Executar
## ⚙️ Configurações
## 🗄️ Banco de Dados
## 🔗 Endpoints
## 🔐 Segurança
## 📚 Conceitos
## 💡 Dicas / Melhorias
##  👩‍💻 Autor

---

## 📖 Descrição
## 🔧 Ferramentas
## 💻 Ambiente
## 📊 Dados
## 🧾 Tabela
## 📡 Requisições
## 📥 Entrada de dados
## 📤 Saída de dados
## 🚫 Bloqueios / proteção
## 🧠 Aprendizado
## 🎓 Educacional
## ⚠️ Atenção
## ❗Importante
## 🤝 Contribuição
## 📄 Licença