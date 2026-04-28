// =========================
// IMPORTAÇÕES
// =========================
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// =========================
// FUNÇÃO PRINCIPAL
// =========================
const criarBanco = async () => {
  const db = await open({
    filename: "./zeladoan1.db", // corrigido nome
    driver: sqlite3.Database,
  });

  // =========================
  // CRIAR TABELA
  // =========================
  await db.exec(`
    CREATE TABLE IF NOT EXISTS doacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      local TEXT NOT NULL,
      item TEXT NOT NULL,
      quantidade INTEGER NOT NULL,
      prioridade TEXT NOT NULL,
      status_doacao TEXT DEFAULT 'Pendente',
      data_registro TEXT,
      hora_registro TEXT
    );
  `);

  const tabelaInfo = await db.all(`PRAGMA table_info(doacoes);`);
  const colunas = tabelaInfo.map((coluna) => coluna.name);

  if (!colunas.includes("data_registro")) {
    await db.exec(`ALTER TABLE doacoes ADD COLUMN data_registro TEXT;`);
    console.log("Coluna data_registro adicionada ao banco existente.");
  }

  if (!colunas.includes("hora_registro")) {
    await db.exec(`ALTER TABLE doacoes ADD COLUMN hora_registro TEXT;`);
    console.log("Coluna hora_registro adicionada ao banco existente.");
  }

  console.log("Banco configurado!");

  // =========================
  // INSERIR DADOS INICIAIS (APENAS SE VAZIO)
  // =========================
  const checagem = await db.get(
    "SELECT COUNT(*) AS total FROM doacoes"
  );

  if (checagem.total === 0) {
    await db.exec(`
      INSERT INTO doacoes (local, item, quantidade, prioridade) VALUES
      ('Abrigo Escola A', 'água', 50, 'Alta'),
      ('Ginásio Central', 'roupa', 200, 'Baixa'),
      ('Igreja São José', 'alimento', 100, 'Alta'),
      ('Centro Comunitário', 'sapato', 40, 'Média'),
      ('Abrigo Pet', 'ração de animais', 80, 'Alta'),
      ('Posto de Apoio', 'produto de higiene pessoal', 60, 'Média')
    `);

    console.log("Dados iniciais inseridos!");
  } else {
    console.log(`Banco já possui ${checagem.total} registros`);
  }

  // =========================
  // LOG SIMPLES (OPCIONAL)
  // =========================
  const todas = await db.all("SELECT * FROM doacoes");
  console.table(todas);

  return db;
};

// =========================
// EXPORTAÇÃO
// =========================
module.exports = { criarBanco };