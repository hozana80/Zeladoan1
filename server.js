// Importações
const express = require("express");
const cors = require("cors");
const { criarBanco } = require("./database");

const cors = require("cors");

const app = express();

// Middlewares
// Ativando 
app.use(cors());   // ativando o CORS no servidor
app.use(express.json());

// Banco
let db;

(async () => {
  try {
    db = await criarBanco();
    console.log("Banco conectado!");
  } catch (err) {
    console.error("Erro ao conectar banco:", err);
    process.exit(1);
  }
})();

// =========================
// ROTA INICIAL
// =========================
app.get("/", (req, res) => {
  res.send(`
    <h1>ZelaDoa</h1>
    <p>Sistema de Doações para Enchentes</p>
    <p>Use /doacoes para acessar</p>
  `);
});

// =========================
// ROTAS DE DOAÇÕES
// =========================

// LISTAR TODAS
app.get("/doacoes", async (req, res) => {

  const listadoacoes = await db.all("SELECT * FROM doacoes");
  res.json(listadoacoes);
});

// BUSCAR POR ID
app.get("/doacoes/:id", async (req, res) => {
  const { id } = req.params;

  const db = await db.get(
    "SELECT * FROM doacoes WHERE id = ?",
    [id]
  );

  if (!db) {
    return res.status(404).json({ erro: "Doação não encontrada" });
  }

  res.json(db);
});

// CRIAR DOAÇÃO
app.post("/doacoes", async (req, res) => {
  let { local, item, quantidade, prioridade } = req.body;

  // Itens válidos atualizados
  const itensValidos = [
    "alimento",
    "água",
    "roupa",
    "sapato",
    "ração de animais",
    "produto de higiene pessoal"
  ];

  if (!itensValidos.includes(item.toLowerCase())) {
    return res.status(400).json({
      erro: "Item inválido. Use: alimento, água, roupa, sapato, ração de animais ou produto de higiene pessoal",
    });
  }

  await db.run(
    `INSERT INTO doacoes (local, item, quantidade, prioridade)
     VALUES (?, ?, ?, ?)`,
    [local, item, quantidade, prioridade]
  );

  res.json({
    mensagem: `Doação de ${item} cadastrada com sucesso!`,
  });
});

// ATUALIZAR STATUS
app.put("/doacoes/:id", async (req, res) => {
  const { id } = req.params;

  const { item, prioridade, status_doacao } = req.body;

  const db = await CriarBanco();

  await db.run(
  "UPDATE doacoes SET item = ?, prioridade =?, status_doacao = ? WHERE id = ?",
   [item, prioridade, status_doacao, id]
  );
  
  
  res.send(`Doação ${id} foi atualizada com sucesso!`);

});

// DELETAR DOAÇÃO (mantido correto!)
app.delete("/doacoes/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db.run(
    "DELETE FROM doacoes WHERE id = ?",
    [id]
  );

  if (result.changes === 0) {
    return res.status(404).json({ erro: "Doação não encontrada" });
  }

  res.json({ mensagem: "Doação removida!" });
});

// =========================
// SERVIDOR
// =========================
// Criando um variavel inteligente para  a porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});