import { useState } from "react";
import axios from "axios";

export default function Formulario() {
  const [local, setLocal] = useState("");
  const [item, setItem] = useState( "");
  const [quantidade, setQuantidade] = useState("");
  const [prioridade, setPrioridade] = useState("Baixa");


  //Função assíncrona para enviar os dados
  const enviarDoacoes = async (e) => {
    e.preventDefault(); //Impede o recarregamento da página

    //Montando o "pacote" de dados {Objeto}
    const novoDoacoes = {
      local,
      item,
      quantidade,
      prioridade,
    };

    //Envia os dados para a API usando o POST
    //Espere (await) o axios postar (post) nesse endereço https"API" o pacote novoIncidente
    await axios.post(
      "https://zeladoan1.onrender.com/doacoes",
      novoDoacoes,
    );

    alert("Doação registrada com sucesso!");
  };

  return (
    <section id="form-section">
      <h2>Reportar Nova Doação</h2>
      <form onSubmit={enviarDoacoes} className="formulario-doacoes">
        <div className="grupo-entrada">
          <label>Local:</label>
          <input
            type="text"
            className="campo-texto"
            placeholder="Ex: rua, bairro..."
            required
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
        </div>

        <div className="grupo-entrada">
          <label>Item:</label>
          <input
            type="text"
            className="campo-texto"
            placeholder="Ex: agua, roupa, alimento..."
            required
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>

        <div className="grupo-entrada">
          <label>Quantidade:</label>
          <input
            type="number"
            className="campo-texto"
            placeholder="Ex: 5, 10, 20..."
            required
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </div>

        <div className="grupo-entrada">
          <label>Prioridade:</label>
          <select
            className="selecao-campo"
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          </div>
    
        <button type="submit" className="botao-enviar">
          Registrar Problema
        </button>
      </form>
    </section>
  );
}
