import React, { Component, useEffect, useState } from 'react';
import api from '../../../api';
import { Title, Person, Icon, Name, Job, TotalTask, Ellipse, Container, SubTitle, Card, CardIcon, ColunaUm, ColunaDois } from './style';
import { render } from '@testing-library/react';
import { Equipes } from '../../../styles/Icons';



function GetEquipe() {
  const [equipe, setEquipe] = useState()
  const path = window.location.pathname;

  useEffect(() => {
    api.get(path)
      .then((response) => {
        setEquipe(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  // console.log(qtBack)


  return (
    <>
      {equipe ?
        <>
          <ColunaUm>
            <Title>{equipe.eq_nome}</Title>
            <SubTitle>Todos os membros</SubTitle>
            {equipe.pessoas.map((e) =>
              <Person key={e.pe_id}>
                <Ellipse>
                  <Icon></Icon>
                </Ellipse>
                <Name>{e.pe_nome}</Name>
                <Job>{e.pe_cargo}</Job>

                <TotalTask>{e.tarefas.length}</TotalTask>
              </Person>
            )}

            <SubTitle>Pontos Fortes da Equipe</SubTitle>
            <Card>
              <CardIcon>
                <img src="../../../assets/cod.svg"/>
              </CardIcon>
              {equipe.pessoas.filter(cargo => cargo.pe_cargo === 'FrontEnd Junior').length}
            </Card>
          </ColunaUm>

          <ColunaDois>
              <SubTitle>RANKING</SubTitle>
              <p>grafico</p>
              <p>as</p>

          </ColunaDois>
        </>

        : <p>Sem Informações</p>}
    </>
  )

}

export default GetEquipe;