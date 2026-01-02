import { useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import env from '../utils/env';
import { useNavigate } from 'react-router-dom';

import './Login.scss';

interface Props {
    show: boolean;
    setShow: any;
}

function Login({show, setShow}: Props) {

    const Navigate = useNavigate();

    const [send, setSend] =  useState(false);
    const [mail, setMail] =  useState('');
    const [password, setPassword] =  useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const goToRegister = () => {
        Navigate('/cadastro');
    }

    const resetPassword = () => {
        axios.put(`${env}/api/password`, {
            "mail": mail
        }).then(()=>{setError('Foi encaminhada uma nova senha para o celular cadastrado!')})
    }

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
                            <Col sm={6}>
                                <span onClick={()=>{
                                    console.log(mail);
                                    if(mail === '') {setError('Digite seu e-mail de cadastro!'); return;}
                                    if(confirm('Deseja enviar uma nova senha para seu celular?')){
                                        resetPassword();
                                        setError('Foi enviada uma nova senha para seu celular cadastrado!')}
                                }} style={{display: 'block', marginBottom: '1rem'}}>Esqueceu sua senha?</span>
                            </Col>
                            <Col sm={6}>
                                <Button type="submit" style={{width: '100%'}} onClick={(e) => {e.preventDefault(); sendOtp()}} className="login-button">Validar login</Button>
                            </Col>
                            <Col>
                                <Row>
                                    <div style={{borderTop: 'solid 1px #ccc', fontSize: '.75rem', marginTop: '1rem', paddingTop: '1rem', textAlign: 'center'}}>
                                        <span onClick={()=>{
                                    goToRegister();
                                    setShow(!show);   
                                }}>Ainda não tem cadastro? <strong style={{cursor: 'pointer'}}>Clique aqui!</strong></span>
                                    </div>
                                </Row>
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
                            <Col xs={8}>
                                <Form.Control 
                                    type="password" 
                                    style={{width: '100%'}} 
                                    id="otp" 
                                    name="otp" 
                                    placeholder='******' 
                                    required />
                            </Col>
                            <Col xs={4}>
                                <Button type="submit" style={{width: '100%'}} onClick={(e) => {e.preventDefault(); login((document.getElementById('otp') as HTMLInputElement).value)}} className="login-button">Logar</Button>
                            </Col>
                            { error !== '' && (
                            <Col sm={12}>
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