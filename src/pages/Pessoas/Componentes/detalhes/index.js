import React, { useState } from "react";
import api from "../../../../api";

import { TitleNoResults } from "../../../Equipes_Id/get/styles";

import { 
  Container, 
  Body, 
  Tarefas 
} from "./styles";

import CardInfoPessoa from "../CardInfoPessoa";
import CardProjetosDaPessoa from "../CardProjetosDaPessoa";
import CardTarefasDaPessoa from "../CardTarefasDaPessoa";
import Lista from "../Lista";
import ListaMaior from "../ListaMaior";
import { Grafico } from "../grafico";
import NaoAutorizado from "../../../../Components/NaoAutorizado";

function Detalhes(Props) {
  const [detalhes, setDetalhes] = useState()
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  
  const getDetalhes = async () => {
    api
      .get(`/pessoas/${Props.dados.id}`)
      .then(response => {
        setDetalhes(response.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setIsAlertVisible(true)
          setTimeout(() => window.location.href = "/login", 2000)
        } else console.log(err.message);
      });
  };

  if ((!detalhes || Props.dados.id !== detalhes.id) && Props.dados.id) {
    getDetalhes()
  }
  
  return (
    <>
      { detalhes ?
      <Container>
        {Props.nome === "Ninguem selecionado" ?

        // Quando não tem pessoas para serem exibidas
        <>
          <img src="./assets/ninguem.svg" style={{height: '21rem', width: '18rem', display: 'flex', alignSelf: 'center'}}/>
          <TitleNoResults>Ninguém selecionado</TitleNoResults>
        </>

        // Quando tem uma pessoa selecionada
        :detalhes &&
        <>
          <CardInfoPessoa dados={detalhes}/>
          <Body>
            <Grafico dados={detalhes}/>
            <Tarefas>

              <div>
                <Lista titulo="Tarefas Não Iniciadas" func={getDetalhes} status="Não Iniciada">
                  {detalhes.tarefas.NaoIniciadas.map((e) =>
                    <CardTarefasDaPessoa key={e.id}  dados={e}/>
                  )}
                </Lista>

                <Lista titulo="Tarefas em Andamento" func={getDetalhes} status="Em Desenvolvimento">
                  {detalhes.tarefas.EmDesenvolvimento.map((e) =>
                    <CardTarefasDaPessoa key={e.id} dados={e}/>
                  )}
                </Lista>
              </div>

              <div>
                <Lista titulo="Tarefas Em Testes" func={getDetalhes} status="Em Testes">
                  {detalhes.tarefas.Testes.map((e) =>
                    <CardTarefasDaPessoa key={e.id} dados={e}/>
                  )}
                </Lista>

                <Lista titulo="Tarefas Concluidas" func={getDetalhes} status="Concluido">
                  {detalhes.tarefas.Concluidas.map((e) =>
                    <CardTarefasDaPessoa key={e.id} dados={e}/>
                  )}
                </Lista>
              </div>  
            </Tarefas>
            
            {/* Lista de Projetos que a pessoa está*/}
            <ListaMaior titulo="Projetos">
              {detalhes.projetos.map((e, index) =>
                <CardProjetosDaPessoa key={index} dados={e}/>
                )}
            </ListaMaior>
          </Body>
        </>
        }
      </Container>
      : isAlertVisible && <NaoAutorizado /> }
    </>
  );
}

export default Detalhes;
