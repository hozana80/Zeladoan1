// =========================
// IMPORTAÇÕES
// =========================
const express = require("express");
const cors = require("cors");
const { criarBanco } = require("./database");

const app = express();

// =========================
// MIDDLEWARES
// =========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// BANCO DE DADOS
// =========================
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
    <h2>Sistema de Doações para Enchentes</h2>
    <p> Endpoint que leva as doações para acessar: /doacoes</p>
    </body>

  `);
});

// =========================
// LISTAR TODAS
// =========================
app.get("/doacoes", async (req, res) => {
  const lista = await db.all("SELECT * FROM doacoes");
  res.json(lista);
});

// =========================
// BUSCAR POR ID
// =========================
app.get("/doacoes/:id", async (req, res) => {
  const { id } = req.params;

  const doacao = await db.get(
    "SELECT * FROM doacoes WHERE id = ?",
    [id]
  );

  if (!doacao) {
    return res.status(404).json({ erro: "Doação não encontrada" });
  }

  res.json(doacao);
});

// =========================
// CRIAR DOAÇÃO
// =========================
app.post("/doacoes", async (req, res) => {
  const { local, item, quantidade, prioridade } = req.body;

  if (!local || !item || !quantidade || !prioridade) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  const itensValidos = [
    "alimento",
    "água",
    "roupa",
    "sapato",
    "ração de animais",
    "produto de higiene pessoal"
  ];

  if (!itensValidos.includes(item.toLowerCase())) {
    return res.status(400).json({ erro: "Item inválido" });
  }

  const agora = new Date();
  const data_registro = agora.toLocaleDateString("pt-BR");
  const hora_registro = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const result = await db.run(
    `INSERT INTO doacoes (local, item, quantidade, prioridade, data_registro, hora_registro) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [local, item, quantidade, prioridade, data_registro, hora_registro]
  );

  res.status(201).json({
    id: result.lastID,
    local,
    item,
    quantidade,
    prioridade,
    status_doacao: "Pendente",
    data_registro,
    hora_registro
  });
});

// =========================
// ATUALIZAR DOAÇÃO (PUT)
// =========================
app.put("/doacoes/:id", async (req, res) => {
try {
  const { id } = req.params;

  const { item, prioridade, status_doacao } = req.body;

  const result = await db.run(
    `UPDATE doacoes 
       SET item = ?, prioridade = ?, status_doacao = ?
       WHERE id = ?`,
    [item, prioridade, status_doacao, id]
  );

  if (result.changes === 0) {
    return res.status(404).json({ erro: "Doação não encontrada" });
  }

  res.json({ mensagem: "Doação atualizada com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao atualizar doação" });
  }
});

// =========================
// DELETAR
// =========================
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
// TRATAMENTO DE ERRO DE JSON MALFORMADO
// =========================
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ erro: "Corpo JSON inválido" });
  }

  next(err);
});

// =========================
// SERVIDOR
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});