import React, { useState } from 'react';
import { Container, Top, Body, Prioridade, ButtonCancel, StatusTarefa, PrioridadeTarefa, Input, TituloSubtarefas } from './styles';
import { useDrag } from 'react-dnd'
import { BsFlagFill } from 'react-icons/bs'
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';
import api from '../../api';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { Progress } from 'rsuite';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function KanbanLi(Props) {
  // -=-=-=-=-=-=-=-=-=-=- Constante que permite o Drag -=-=-=-=-=-=-=-=-=-=-
  const [{isDragging}, dragRef] = useDrag({
    type: 'CARD',
    item: {'id': Props.dados.tr_id, 'status': Props.dados.tr_status},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  
  // -=-=-=-=-=-=-=-=-=-=- Recebe os objetos de tarefas -=-=-=-=-=-=-=-=-=-=-
  const [descricao, setDescricao] = useState(Props.dados.tr_descricao)
  const [titulo, setTitulo] = useState(Props.dados.tr_nome)
  const [prioridade, setPrioridade] = useState(Props.dados.tr_prioridade)
  const [tarefas, setTarefas] = useState ()
  
  const getSubtarefas = async () => {
    api.get(`/tarefas/${Props.dados.tr_id}`)
      .then(response => {
        setTarefas(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const changeStatus = async (e, id) => {
    let newStatus = e.target.checked ? 1 : 0

    api
    .put(`/subtarefas/${id}/status/${newStatus}`)
    .then(getSubtarefas)
    .catch(e => {
      console.log(e)
    })
  }
  
  // -=-=-=-=-=-=-=-=-=-=- Abrir e fechar dialog de detalhes -=-=-=-=-=-=-=-=-=-=-
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    getSubtarefas()
    setOpen(true);
  };

  const handleClose = () => {
    // Editar as infomações da tarefa
    // api
    //   .put(`/tarefas/${Props.dados.tr_id}`, {
    //     tr_nome: titulo,
    //     tr_descricao: descricao,
    //     tr_prioridade: prioridade
    //   })
    //   .then(res => {
    //   })
      setOpen(false);

  };

  return (
    <>
      <Container ref={dragRef} isDragging={isDragging} onClick={handleClickOpen}>
        <Top>
          <h3 title={Props.dados.tr_nome}>{Props.dados.tr_nome}</h3>
        </Top>
        <Body>
            {/* -=-=-=-=-=-=-=-=-=-=- Prioridade na tela de projetos/tarefas -=-=-=-=-=-=-=-=-=-=- */}
            <Prioridade>
              <span style={{ backgroundColor: Props.dados.tr_prioridade === 1 ? '#67CB65' :
                                              Props.dados.tr_prioridade === 2 ? '#FF9533' : 
                                              Props.dados.tr_prioridade === 3 ? '#E74444' : 'gray'}}>
                {
                  Props.dados.tr_prioridade === 1 ? 'Baixa' :
                  Props.dados.tr_prioridade === 2 ? 'Média' :
                  Props.dados.tr_prioridade === 3 ? 'Alta'  :
                  Props.dados.tr_prioridade
                }
              </span>
            </Prioridade>
            {/* <ul>
              <li>
                {Props.dados.tr_descricao.length > 100 ?
                <span><strong>Descricao:</strong> {`${Props.dados.tr_descricao.substring(0, 100)}...`}</span>
                : <span><strong>Descricao:</strong> {Props.dados.tr_descricao}</span>}
              </li>
              {Props.dados.tr_data_criacao &&
                <li>
                  <p>Data de Criação:</p> 
                  <span>{Props.dados.tr_datProps.dados.tr_nome

              }
              <li> <strong>Data de Entrega:</strong> {Props.dados.tr_data_entrega}</li>
            </ul> */}
        </Body>
      </Container>
      <>
        {/* -=-=-=-=-=-=-=-=-=-=- Dialog de detalhamento de subtarefa -=-=-=-=-=-=-=-=-=-=- */}
        { tarefas &&
          <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
          PaperProps={{
            style: { borderRadius: '20px', 
            background: '#F5F5F7',
          }
        }}
        >
          <DialogTitle sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 600,
            fontSize: '30px',
            color: '#280948',
          }}>
            <Input type="text" value={titulo} onChange={e => setTitulo(e.target.value)}/>
            {/* <ButtonCancel onClick={handleClose}/> */}
          </DialogTitle>
          <Divider color="#764BA2" sx={{height: '1px'}}/>
          <DialogContent>
            <DialogContentText sx={{
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
            }}>
              <StatusTarefa>
                {Props.dados.tr_status}
              </StatusTarefa>
              <PrioridadeTarefa>
                {
                  Props.dados.tr_prioridade === 1 ? <BsFlagFill size={22} style={{color: '#67CB65'}}/> :
                  Props.dados.tr_prioridade === 2 ? <BsFlagFill size={22} style={{color: '#FF9533'}}/> :
                  Props.dados.tr_prioridade === 3 ? <BsFlagFill size={22} style={{color: '#E74444'}}/> :
                  Props.dados.tr_prioridade
                }
              </PrioridadeTarefa>
            </DialogContentText>
              <TextField
                fullWidth
                onChange={e => setDescricao(e.target.value)}
                value={descricao}
                sx={{
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                  marginTop: '24px'
                }}  
                placeholder='Descrição'
                multiline
                rows={4}
              />
            <DialogContentText>
              <TituloSubtarefas>
                Subtarefas
              </TituloSubtarefas>
                {/* -=-=-=-=-=-=-=-=-=-=- Subtarefas dentro de uma lista -=-=-=-=-=-=-=-=-=-=- */}
                <form>
                  {tarefas.subTarefas.map(tarefa => (
                    <div>
                        {tarefa.status == 1
                          ? <input onChange={(e) => changeStatus(e, tarefa.id)} key={tarefa.id} type="checkbox" id={tarefa.nome} checked={true}/>
                          : <input onChange={(e) => changeStatus(e, tarefa.id)} key={tarefa.id} type="checkbox" id={tarefa.nome} checked={false}/>
                        }
                        <label for={tarefa.nome}>{tarefa.nome}</label>
                    </div>
                  )
                  )}
                </form>
            </DialogContentText>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>}
      </>
    </>
  );
}

export default KanbanLi;