import React, { useState } from 'react';
import api from '../../api';

import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

import { 
  Container, 
  Content, 
  InputCadastro, 
  Imagem 
} from './styles';

function Register() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} severity={props.severity} variant='filled' {...props} />;
  });

  var [mensagem, setMensagem] = useState('')
  const [estado, setEstado] = useState();

  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
    setEstado()
  };

  const handleClickCad = () => {
    if(nome !== ''){
      setTimeout(() => setOpenAlert(true), 200)
    }
  }

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmacao, setConfirmacao] = useState('')

  function Cadastrar (e) {
    e.preventDefault()
    api.post('/auth/cadastro', {
      nome: nome,
      email: email,
      senha: senha,
      confirmacao: confirmacao
    }).then(e => {
      setMensagem('Top! Cadastro efetuado!')
      setEstado('success')
      setNome('')
      setEmail('')
      setSenha('')
      setConfirmacao('')
    }).catch(e => {
      setMensagem('Falha ao Realizar o Cadastro!')
      setEstado('error')
    })
  }
  
  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={2200} onClose={handleCloseAlert} anchorOrigin={{vertical: 'top', horizontal: 'left'}}>
        <Alert onClose={handleCloseAlert} severity={estado}>
          {mensagem}
        </Alert>
      </Snackbar>

      <Container>
        {/* <Logo></Logo> */}
        <Content>
          <InputCadastro> 
            <h1>Registro</h1>
            <form>
                <h6>Nome</h6>
                <input value={nome} data-cy="nome"type='text' placeholder='Digite seu Nome' onChange={e => setNome(e.target.value)} required/>
                <h6>Email</h6>
                <input value={email} data-cy="email" type='email' placeholder='Digite seu Email' onChange={e => setEmail(e.target.value)} required/>
                <h6>Senha</h6>
                <input value={senha} data-cy="senha" type='password' placeholder='Digite sua Senha' onChange={e => setSenha(e.target.value)} required/>
                <h6>Confirmar Senha</h6>
                <input value={confirmacao} data-cy="senha2" type='password' placeholder='Confime sua Senha' onChange={e => setConfirmacao(e.target.value)} required/>
            </form>
            <button
              id="botao"
              onClick={(e) => {Cadastrar(e); handleClickCad()}}

              style={{
                background: '#280948', 
                width: '50%', 
                borderRadius: '32px', 
                color: 'white', 
                height: '45px', 
                marginLeft: '-30px'
              }}
            >
              Cadastrar
            </button>
            <a href='/login'>Já Tem Cadastro? Faça Login</a>
          </InputCadastro>
          <Imagem />
        </Content>
      </Container>
    </>
  );
}

export default Register;