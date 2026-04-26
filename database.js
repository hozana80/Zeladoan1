// Importações
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// Função para criar e configurar o banco
const criarBanco = async () => {
  const db = await open({
    filename: "./zeladoarn1.db",
    driver: sqlite3.Database,
  });

  // =========================
  // CRIAÇÃO DA TABELA DOAÇÕES
  // =========================
  await db.exec(`
    CREATE TABLE IF NOT EXISTS doacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      local TEXT,
      item TEXT,
      quantidade INTEGER,
      prioridade TEXT,
      status_doacao TEXT DEFAULT "Lotado"
    )
  `);

  console.log("Banco configurado: tabela de doações pronta!");

  // =========================
  // INSERT (DADOS INICIAIS)
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

    console.log("Dados iniciais de doações inseridos!");
  } else {
    console.log(`Banco já possui ${checagem.total} doações cadastradas`);
  }

  // =========================
  // SELECT (VISUALIZAÇÃO)
  // =========================
  const todasDoacoes = await db.all("SELECT * FROM doacoes");
  console.table(todasDoacoes);

  // SELECT específico
  const doacoesAlta = await db.all(
    `SELECT * FROM doacoes WHERE prioridade = "Alta"`
  );
  console.log("Doações com prioridade alta:");
  console.table(doacoesAlta);

  // =========================
  // UPDATE (EXEMPLO)
  // =========================
  await db.run(`
    UPDATE doacoes
    SET status_doacao = "Lotado"
    WHERE prioridade = "Alta"
  `);

  console.log("Doações de prioridade alta atualizadas para 'Lotado'");

  // =========================
  // DELETE (EXEMPLO SEGURO)
  // =========================
  // (Executa apenas se existir ID alto, evitando apagar dados iniciais)
  await db.run(`
    DELETE FROM doacoes
    WHERE id > 1000
  `);

  console.log("Limpeza automática concluída (se necessário)");

  // =========================
  // RELATÓRIO FINAL
  // =========================
  const resultadoFinal = await db.all("SELECT * FROM doacoes");
  console.log("Relatório final:");
  console.table(resultadoFinal);

  return db;
};

// Exportação
module.exports = { criarBanco };
