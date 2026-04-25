# 🌊 Projeto: ZelaDoa – Sistema Inteligente de Doações em Enchentes
Este projeto foi desenvolvido a partir do desafio sobre enchentes no Brasil.
Ao analisar o cenário, identifiquei a dificuldade na organização e distribuição de doações, onde muitos locais recebem itens em excesso enquanto outros sofrem com escassez.
Diante disso, surgiu a ideia de criar uma solução que centraliza informações sobre doações, conectando quem quer ajudar com quem realmente precisa.


## 📌 Problema: Organização de Doações
Durante enchentes:
    - Doações chegam sem controle 
    - Falta comunicação entre pontos de coleta 
    - Há: 
         excesso de roupas em alguns locais 
         falta de água e alimentos em outros 

## 👥 Pessoas impactadas:
    - Famílias afetadas pela enchente 
    - Voluntários 
    - ONGs e pontos de arrecadação 

## ⚠️ Por que isso é grave?
    • Desperdício de recursos 
    • Demora na ajuda 
    • Pessoas continuam sofrendo mesmo com doações disponíveis 


## 💡 Ideia: Plataforma de Doações Inteligente
O ZelaDoa é um sistema que:
    - Mostra o que cada local precisa em tempo real 
    - Permite que doadores vejam: 
          📍 localização 
          📦 itens necessários 
          📊 nível de urgência 
    - Permite que pontos de coleta atualizem suas necessidades 

## 🔁 Como funciona:
    - Um abrigo cadastra suas necessidades: 
         Ex: “Preciso de água e alimentos” 
    - O sistema atualiza: 
            prioridade (Alta, Média, Baixa) 
    - Doadores acessam: 
          lista de locais 
          escolhem onde doar 
    - Evita: 
          excesso ❌ 
          falta ❌ 
          desorganização ❌ 

## ⭐ Diferencial
    - Atualização em tempo real 
    - Sistema simples (funciona até com internet limitada) 
    - Foco em eficiência da ajuda, não só registro 

 ## 🖥️ Front-end
  Interface simples com:

    - Lista de pontos de doação 

    - Filtro por: 
         prioridade 
         tipo de item 
    - Botão para cadastrar necessidade 

## ⚙️ Back-end (Você já começou 👏)
Você pode adaptar seu projeto atual assim:
Nova tabela: doacoes
CREATE TABLE IF NOT EXISTS doacoes(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  local TEXT,
  item TEXT,
  quantidade INTEGER,
  prioridade TEXT,
  status TEXT DEFAULT 'Pendente'
);

## 🔌 Rotas da API
📥 Criar necessidade
POST /doacoes
📄 Listar todas

GET /doacoes
🔍 Buscar por prioridade
GET /doacoes?prioridade=Alta

✏️ Atualizar status
PUT /doacoes/:id

❌ Deletar
DELETE /doacoes/:id

## 🗄️ Banco de Dados
Armazena:
    - locais afetados 
    - itens necessários 
    - prioridade 
    - status da doação 
💡 Pode usar o mesmo SQLite que você já configurou (perfeito pro projeto!)


## 🧠 Resumo (pra fechar bonito no README)
O ZelaDoa é uma solução tecnológica que organiza e distribui doações de forma inteligente em cenários de enchente, garantindo que recursos cheguem onde são mais necessários, evitando desperdícios e aumentando a eficiência da ajuda humanitária.

# Zeladoan1
