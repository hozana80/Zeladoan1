import axios from "axios";   //axions para hacer peticiones http

import { useEffect, useState } from "react";  //hooks para manejar el estado y efectos secundarios
//Usestatte para manejar el estado de los doações
//UseEffect para hacer la peticion a la api cuando el componente se monta

export default function doacoes() {
  //Estado para almacenar los doações obtenidos de la API
  //Inicialmente o un array vacio
   const [listadoacoes, setlistadoacoes] = useState([]);
   const carregarDados = async () => {

    const resposta = await axios.get("http:s//zeladoan1.onrender.com/doacoes",
    );
    setListadoacoes(resposta.data); //Atualiza o estado con los datos obtenidos de la API
   };

    useEffect(() => {
     carregarDados();
   }, []);


    return (
      <section>
        <h2> Doações Recebidas</h2>
        </section> 
      
    );
}
          