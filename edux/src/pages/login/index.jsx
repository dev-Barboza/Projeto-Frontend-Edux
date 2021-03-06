import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import { Container , Form , Button } from 'react-bootstrap';
import Logo2 from  '../../assets/img/logo_2.png';
import './login.css';




const Login = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const logar = (event) => {
        event.preventDefault();

        fetch('http://localhost:5000/api/usuario',{
            method : 'POST',
            body : JSON.stringify({
                email : email,
                senha : senha
            }),
            headers : {
                'content-type' : 'application/json',
                'use-cors' : 'none'
            }
        })
        .then(response => {

            if(response.ok){
                return response.json();
            }

            alert('Dados Invalidos');
        })
        .then(data => {
            console.log(data)

            localStorage.setItem('token-nyous-tarde', data.token);

            let usuario = jwt_decode(data.token)

            if(usuario.role === 'Admin')
                history.push('/admin/dashboard');
            else   
                history.push('/eventos') 


            history.push('/eventos');
        })
        .catch(err => console.error(err))
    }

    return (
      <div className="completo">
      <Menu />
      <Container className="first">
         <Container className='second'>
                <Container className= "Texto">
                    <div class="div">

                    <h1><img src={Logo2} alt="Logo do Edux"/></h1>
                    <h2>Faça Parte Voce também! <br/>Entre agora para usufruir <br/>todos os beneficios disponiveis </h2>
                   

                    </div>
                </Container>  

                <Container className='second2'>
                 <Form className='uno' onSubmit={ event => logar(event) }>
                    <div className='text-center'>
                       <img src="" alt=""/>
                    </div>
                    <br/>
                    <small>Informe os dados abaixo</small>
                    <hr/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={ event => setEmail(event.target.value)} placeholder="Informe o email" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicSenha">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" value={senha} onChange={ event => setSenha(event.target.value)} placeholder="Senha" required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                    <br/><br/>
                    <a href="/cadastrar" style={{ marginTop : '30px' }}>Não tenho conta!</a>
                 </Form>
             </Container>
          </Container>

            
        </Container>         
      <Rodape />
      </div>
  )

}


export default Login