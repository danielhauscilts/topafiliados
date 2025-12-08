import { useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import env from '../utils/env';

import './Login.scss';

function Login() {

    const [send, setSend] =  useState(false);
    const [phone, setPhone] =  useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const sendSms = (phone: String) => {
        axios.post(
            `${env}api/login`,
            {
                "phone": phone,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then(()=>{
            setSend(true);
            setPhone(phone.toString());
        }).catch((error) => {
            if (error.status === 401) {
                setError('Telefone não encontrado');
            }
        })
    }

    const login = (otp: String) => {
        // Implement login logic here

        axios.post(
            `${env}api/validate-otp`,
            {
                "phone": phone,
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
                    <Row>
                        {!send && !success &&
                            <>
                                <Col md={8}>
                                    <Form.Control
                                        type='text'
                                        placeholder='5511900000000' 
                                        style={{width: '100%'}} 
                                        id="phone"
                                        name='phone' />
                                </Col>
                                <Col md={4}>
                                    <Button type="submit" style={{width: '100%'}} onClick={(e) => {e.preventDefault(); sendSms((document.getElementById('phone') as HTMLInputElement).value)}} className="login-button">Solicitar Senha</Button>
                                </Col>
                                { error !== '' && (
                                <Col md={12}>
                                    <div className='login-error'>{error}</div>
                                </Col>
                                )}
                            </>
                        }
                        {send && !success &&
                            <>
                                <Col md={12}>
                                    <p>Um SMS foi enviado para o número {phone}. Por favor, verifique seu celular.</p>
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
                            </>
                        }
                        { success && 
                            <>
                                <Col md={12}>
                                    Usuário logado com sucesso!
                                </Col>
                            </>
                        }
                    </Row>
                </Container>
            </form>
        </div>
    );
}

export default Login;