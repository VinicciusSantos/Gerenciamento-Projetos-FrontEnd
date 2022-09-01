import React from "react";
import PostEquipes from "./modal"
import { Search, SearchIcon } from "../Projetos/styles";
import { ContainerUnico, Footer } from "./style";
import { useState } from "react";
import api from "../../api";
import { AllCards, Card, Name, Title, Retangulo, TeamLength, Elipse, SmallElipse } from "./style";
import Container from "../../Components/Container";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

function Equipes() {
    const [updateScreen, setUpdate] = useState(true);
    const [equipes, setEquipes] = useState([]);
    const [nome, setNome] = useState('');
    const [foundEquipes, setFoundEquipes] = useState();
    const [filtros, setFiltros] = useState()

    const getEquipes = async () => {
        api
            .get('/equipes')
            .then(response => {
                setEquipes(response.data);
                setFoundEquipes(response.data);
            })
            .catch(err => {
                if(err.response.status === 401) {
                    alert("Faça o Login para visualizar a página")
                    window.location.href = '/login'
                }
                else alert(err.message)
            })
    };

    const filter = (e, filt) => {
        let keyword = ''
        if (e) keyword = e.target.value;
        if (keyword !== '') {
            const results = equipes.filter((equipes) => {
                return equipes.eq_nome.toLowerCase().includes(keyword.toLowerCase());
            });
            setFoundEquipes(results);
        } else {
            setFoundEquipes(equipes);
        }
        setNome(keyword);

        switch (filt) {
            case 1:
                // Ordem Alfabética (A-Z)
                setFoundEquipes(valorAntigo => valorAntigo.sort((a,b) => {
                    return a.eq_nome.toLowerCase() < b.eq_nome.toLowerCase() ? -1 : a.eq_nome.toLowerCase() > b.eq_nome.toLowerCase() ? 1 : 0;
                }))
                break;
            
            case 2:
                // Ordem Alfabética (Z-A)
                setFoundEquipes(valorAntigo => valorAntigo.sort((a,b) => {
                    return a.eq_nome.toLowerCase() > b.eq_nome.toLowerCase() ? -1 : a.eq_nome.toLowerCase() < b.eq_nome.toLowerCase() ? 1 : 0;
                }))
                break;
                
                case 3:
                    // Mais Recentes
                    setFoundEquipes(valorAntigo => valorAntigo.sort((a,b) => {
                        return a.eq_id > b.eq_id ? -1 : a.eq_id < b.eq_id ? 1 : 0;
                    }))
                    break;
                    
                case 4:
                    // Mais Antigos
                    setFoundEquipes(valorAntigo => valorAntigo.sort((a,b) => {
                        return a.eq_id < b.eq_id ? -1 : a.eq_id > b.eq_id ? 1 : 0;
                    }))
                    break;
            default:
                break;
        }
    };

    if (updateScreen) {
        getEquipes()
        setUpdate(false)
    }
    
    if (!filtros && foundEquipes){
        setFiltros(1)
        filter(null, 1)
    } 
    return (
        <Container>
            <ContainerUnico>
                <div className="d-flex justify-content-between mt-4">
                    <Title>Equipes</Title>

                    <div className="d-flex">
                        <Dropdown>
                            <Dropdown.Toggle style={{background: "transparent", color: "#333", border: "0"}}>
                            Filtros
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{padding: "10px", fontSize: "14px"}}>
                            <Dropdown.Header>Ordenar por:</Dropdown.Header>
                            <Form.Check
                                label="Ordem Alfabética (A-Z)"
                                type="radio"
                                checked={1 === filtros} 
                                onChange={() => {setFiltros(1); filter(null, 1)}}
                            />
                            <Form.Check
                                label="Ordem Alfabética (Z-A)"
                                type="radio"
                                checked={2 === filtros}
                                onChange={() => {setFiltros(2); filter(null, 2)}}
                            />
                            <Form.Check
                                label="Mais Recentes"
                                type="radio"
                                checked={3 === filtros}
                                onChange={() => {setFiltros(3); filter(null, 3)}}
                            />
                            <Form.Check
                                label="Mais Antigas"
                                type="radio"
                                checked={4 === filtros}
                                onChange={() => {setFiltros(4); filter(null, 4)}}
                            />
                            </Dropdown.Menu>
                        </Dropdown>
                        <Search>
                            <input type="search" placeholder="Pesquise..." onChange={filter} value={nome}></input>
                            <SearchIcon/>
                        </Search>
                    </div>
                </div>
                <AllCards>
                    <PostEquipes update={getEquipes}/>
                    {foundEquipes && foundEquipes.length > 0 ? (
                        foundEquipes.map((equipes) => (
                            <Card key={equipes.eq_id} href={"equipes/" + equipes.eq_id}>
                                <Retangulo/>
    
                                <Elipse>
                                    <SmallElipse src={equipes.eq_foto}/>
                                </Elipse>
                                <Name>{equipes.eq_nome}</Name>
                                <TeamLength>Quantidade de integrantes: {equipes.pessoas.length}</TeamLength>
                            </Card>
                        ))
                    ) : (
                        <div variant="outlined" severity="warning">
                            Nome não encontrado! ;-;
                        </div>
                    )}
                </AllCards>
                <Footer/>
            </ContainerUnico>
        </Container>
    );
}

export default Equipes;