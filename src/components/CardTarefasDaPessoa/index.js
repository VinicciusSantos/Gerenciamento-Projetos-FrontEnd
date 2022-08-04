import React from 'react';

import { Container, Top, Prioridade, Bottom } from './styles';
import { useDrag } from 'react-dnd'

function CardTarefasDaPessoa(Props) {
  const status = ["Baixa", "Media", "Alta"]
  const [{isDragging}, dragRef] = useDrag({
    type: 'CARD',
    item: {'id': Props.dados.tr_id, "status": Props.dados.tr_status},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <Container ref={dragRef} isDragging={isDragging}>
        <Top>
          <h3>{Props.dados.tr_nome}</h3>
          <Prioridade style={{backgroundColor: Props.dados.tr_prioridade === 3 ? "#E74444" : Props.dados.tr_prioridade === 2 ? "#FF9533" : Props.dados.tr_prioridade === 1 ? "#67CB65" : "#666"}}>
            {status[Props.dados.tr_prioridade - 1]}
          </Prioridade>
        </Top>
        <Bottom>
          <p>Data de Criação:</p>
          <span>{Props.dados.tr_data_criacao.substring(0,12)}</span>
        </Bottom>
    </Container>
  );
}

export default CardTarefasDaPessoa;