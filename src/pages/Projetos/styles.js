import styled from 'styled-components';

import { Lupa } from '../../styles/Icons';

export const ColunaUm = styled.div`
    width: 46%;
    height: calc(100% - 48px);
    margin: 24px 0px;
    padding: 0 10px;
    border-radius: 20px;
    overflow: hidden;

    background-color: white;

    display: flex;
    flex-direction: column;

    @media (max-width: 1600px) {
        overflow: hidden;
        max-height: 85vh;
    }

    @media (max-width: 480px) {
        width: 100%;
        overflow: visible;

        margin: 0;

        border-radius: 0;
    }
`;

export const ContGrafico = styled.div`
    width: 100%;
    height: 40%;
`;

export const TopGrafico = styled.div`
    margin-top: 20px;

    h1 {
        font-weight: 600;
        font-size: 32px;
        line-height: 48px;
        color: var(--roxo);
        padding-left: 15px;
    }
`;

export const ColunaDois = styled.div`
    width: 33%;
    height: calc(100% - 48px);
    margin: 24px 10px;
    padding: 15px 20px;
    background-color: white;
    border-radius: 20px;
    
    display: flex;
    flex-direction: column;

    @media (max-width: 480px) {
        width: 100%;
        margin: 0;

        border-radius: 0;
    }
`;

export const Agenda = styled.div`
    width: 100%;
    height: auto;
    margin-top: 10px;
    padding: 10px 5px;
    border-radius: 20px;

    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    overflow-y: auto;

    ::-webkit-scrollbar-thumb{
        background: #764BA2;
        border-radius: 10px;
        width: 5px;
    }
        
    ::-webkit-scrollbar{
        background-color: #F5F5F7;
        width: 5px;
        border-radius: 10px;
    }
`;

export const ContProjetos = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContMais = styled.div`
    display: flex;
    align-items: center;
`;

export const CabecalhoProjetos = styled.div`
    display: flex;
    top: 0;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    z-index: 2;

    padding-left: 15px;
    padding-right: 20px;
    padding-bottom: 10px;

    > h2 {
        color: var(--roxo);
        font-weight: 600;
        font-size: 1.25rem;
        line-height: 1.87rem;
        width: 12.18rem;
        margin-bottom: 0.5px;
    }

    @media (max-width: 767px) {
        h2 {
            font-weight: 600;
            font-size: 15px;
            line-height: 20px;
        }
    }

    @media (max-width: 480px) {

        position: relative;
        h2 {
            font-size: 20px;
        }        
    }
`;

export const Search = styled.div`
    border: 2px solid var(--roxo);
    border-radius: 20px;
    height: 36px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 5px;
 
    > input {
        z-index: 2;
        outline: none;
        border: none;
        background-color: transparent;
        width: calc(100% - 50px);
        margin: 10px;
    }
`;

export const SearchIcon = styled(Lupa)`
    width: 25px;
    height: 25px;
    z-index: 2;

    transition-duration: 0.3s;

    &:hover {
        transform: scale(1.05);
        transform: rotate(-7deg);
        transition-duration: 0.3s;

        cursor: pointer;
    }
`;

export const ContTabela = styled.div`
    width: 100%;
    margin-top: 5px;
    overflow-y: auto;

    a {
        color: white;
        text-decoration: none;
        background-color: transparent;
        border: none;
        font-weight: 600;
        line-height: 1.7rem;
    }
    
    ul::-webkit-scrollbar-thumb{
        background: #764BA2;
        border-radius: 10px;
        width: 5px;
    }
    
    ul::-webkit-scrollbar{
        background-color: #F5F5F7;
        width: 5px;
        border-radius: 10px;
    }

    ul {
        list-style-type: none;
        padding: 0px 10px;
        overflow-y: auto;
        overflow-x: hidden;
        transition-duration: .2s;
        
        @media (max-height: 750px) {
            height: 200px;
        }

        @media (min-height: 850px) {
            height: 280px;
        }

        @media (min-height: 920px) {
            height: 350px;
        }

        @media (min-height: 1280px) {
            height: 285px;
        }

        @media (max-width: 480px) {
            p, a {
                font-size: 14px;
            }  
            height: 270px;
            margin-top: 10px;
           
        }
    }
    
    @media (max-width: 767px) {
        height: 280px;
        overflow-y: hidden;

        p, a {
            font-weight: 600;
            font-size: 10px;
            line-height: 15px;
        }
    }

    @media (max-width: 480px) {
        overflow: hidden;
    }
`;

export const Filtros = styled.div`
    z-index: 1;
    margin-right: 0.8rem;
`;

export const CardProjeto = styled.li`
    background: linear-gradient(90.24deg, #764BA2 9.3%, #667EEA 99.93%);

    height: 40px;
    width: 100%;
    border-radius: 16px;

    padding: 10px;
    margin-bottom: 0.5rem;
    
    color: white;
    font-weight: 600;
   

    display: flex;
    justify-content: space-between;
    align-items: center;
 

    transition-duration: .3s;
    
    &:nth-last-child(1) {
        margin-bottom: 2px;
    }
    
    p {
        display: flex;
        padding: 18px 0px 0px 0px;
        font-weight: 500;
        font-size: 15px;
    }
`; 