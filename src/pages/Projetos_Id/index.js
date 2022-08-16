import React, { useState } from 'react'
import api from '../../api'
import CardDetalhesList from '../../components/CardDetalhesList';
import KanbanUl from '../../components/KanbanUl';
import Header from '../../components/header'
import { Container, ContDados, Top, Buttons, Titulo, Detalhamento, Trelo, Deletar, Main } from './styles'
import Edit from './put';
import { useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Index() {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
    });
    
    const [open, setOpen] = useState(false);
    
    const handleClickDelete = () => {
        setOpen(true);
    };
    
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
    } 

    const path = window.location.pathname;
    const [dados, setDados] = useState()
    const [updateScrenn, setUpdateScreen] = useState(true)
    let string_equipes = ''
    let qtd_pessoas = 0

    let navigate = useNavigate()

    const getDados = async () => {
        const response = await api.get(path)
        setDados(response.data);
    };

    if (updateScrenn) {
        getDados()
        setUpdateScreen(false)
    };
    
    const deletarProjeto = (pr_id) => {
        api.delete(path)
        handleClickDelete();
        setTimeout(() => navigate('/projetos'), 1500);
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={1500} onClose={handleCloseAlert} anchorOrigin={{vertical: 'top', horizontal: 'left',}}>
                <Alert onClose={handleCloseAlert} severity='warning'>
                    Projeto apagado com sucesso!
                </Alert>
            </Snackbar>
            <Container>
                <Header />

                {dados ?
                    <ContDados>
                        <Top>
                            <Main>
                                <Titulo>{dados.dados.pr_nome}</Titulo>
                                <p>(#{dados.dados.pr_id})</p>
                                <span>{dados.dados.pr_status}</span>
                            </Main>
                            <Buttons>
                                <Edit dados={dados} atualizar={getDados}/>
                                <Deletar onClick={deletarProjeto}>Deletar</Deletar>
                            </Buttons>
                        </Top>
                        <Detalhamento>
                            {dados.equipes.forEach((e, index) => {
                                qtd_pessoas += e.pessoas.length
                                string_equipes += `${e.eq_nome} (#${e.eq_id})`
                                if (index !== dados.equipes.length - 1) {
                                    string_equipes += ', '
                                }
                            })}

                            <CardDetalhesList width='23.29%' height='143px' keys={[
                                'Data de Criação', 'Data de Finalização', 'Equipes'
                            ]} values={[dados.dados.pr_data_criacao.substring(0,10), dados.dados.pr_data_finalizacao, string_equipes]} />

                            <CardDetalhesList width='58.32%' height='143px' keys={['Descrição']} values={[dados.dados.pr_descricao]} />

                            <CardDetalhesList width='15.32%' height='143px' keys={[
                                'Total de Tarefas', 'Total de Pessoas', 'Status'
                                ]} values={[
                                    dados.tarefas.EmDesenvolvimento.length + dados.tarefas.Concluidas.length + dados.tarefas.NaoIniciadas.length + dados.tarefas.Testes.length, qtd_pessoas, dados.dados.pr_status
                                ]} />
                        </Detalhamento>
                        <Trelo>
                            <KanbanUl func={getDados} index={1} status='Não Iniciado' titulo='To Do' elements={dados.tarefas.NaoIniciadas} />
                            <KanbanUl func={getDados} index={2} status='Em Desenvolvimento' titulo='In Progress' elements={dados.tarefas.EmDesenvolvimento} />
                            <KanbanUl func={getDados} index={3} status='Em Testes' titulo='Test' elements={dados.tarefas.Testes} />
                            <KanbanUl func={getDados} index={4} status='Concluido' titulo='Done' elements={dados.tarefas.Concluidas} />
                        </Trelo>
                    </ContDados>
                    : <>
                        Aguardando...
                    </>
                }
            </Container>
        </>    
    )
}
