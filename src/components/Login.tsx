import { useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import env from '../utils/env';

import './Login.scss';

function Login() {

    const [send, setSend] =  useState(false);
    const [mail, setMail] =  useState('');
    const [password, setPassword] =  useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const sendOtp = () => {
        axios.post(
            `${env}/api/login`,
            {
                "mail": mail,
                "password": password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then(()=>{
            setSend(true);
            setMail(mail.toString());
        }).catch((error) => {
            if (error.status === 401) {
                setError('cadastro não encontrado');
            }
        })
    }

    const login = (otp: String) => {
        // Implement login logic here

        axios.post(
            `${env}/api/validate-otp`,
            {
                "mail": mail,
                "otp": otp,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then((e)=>{
            window.localStorage.setItem('user', JSON.stringify(e.data.user));
            window.localStorage.setItem('token', e.data.token);
            setSuccess(true);
        }).catch((error) => {
            console.log('Falha na validação do OTP', error.response.data);
            setError('Erro na validação, tente novamente!');
        })
    }

    return (
        <div className="login-container">
            <form className="login-form">
                <Container>
                    {!send && !success &&
                    <>
                        <Row>
                            <Col md={12}>
                                <Form.Control
                                    type='text'
                                    placeholder='seu@email.com' 
                                    style={{width: '100%'}} 
                                    id="mail"
                                    name='mail'
                                    onChange={(e)=>{setMail(e.target.value)}} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Control
                                    type='password'
                                    placeholder='******' 
                                    style={{width: '100%'}} 
                                    id="password"
                                    name='password'
                                    onChange={(e)=>{setPassword(e.target.value)}}  />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Button type="submit" style={{width: '100%'}} onClick={(e) => {e.preventDefault(); sendOtp()}} className="login-button">Solicitar Senha</Button>
                            </Col>
                            { error !== '' && (
                            <Col md={12}>
                                <div className='login-error'>{error}</div>
                            </Col>
                            )}
                        </Row>
                    </>
                    }
                    {send && !success &&
                    <>
                        <Row>
                            <Col md={12}>
                                <p>Um código foi enviado para o celular cadastrado.</p>
                            </Col>
                            <Col md={8}>
                                <Form.Control 
                                    type="password" 
                                    style={{width: '100%'}} 
                                    id="otp" 
                                    name="otp" 
                                    placeholder='******' 
                                    required />
                            </Col>
                            <Col md={4}>
                                <Button type="submit" style={{width: '100%'}} onClick={(e) => {e.preventDefault(); login((document.getElementById('otp') as HTMLInputElement).value)}} className="login-button">Logar</Button>
                            </Col>
                            { error !== '' && (
                            <Col md={12}>
                                <div className='login-error'>{error}</div>
                            </Col>
                            )}
                        </Row>
                    </>
                    }
                    { success && 
                        <>
                            <Row>
                                <Col md={12}>
                                    Usuário logado com sucesso!
                                </Col>
                            </Row>
                        </>
                    }
                </Container>
            </form>
        </div>
    );
}

export default Login;