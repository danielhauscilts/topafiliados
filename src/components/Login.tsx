import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import './Login.scss';

function Login() {

    const [send, setSend] =  useState(false);
    const [phone, setPhone] =  useState('');

    const sendSms = (phone: String) => {
        axios.post(
            'http://localhost:8080/api/login',
            {
                "phone": phone,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then((e)=>{
            setSend(true);
            setPhone(phone.toString());
            console.log('Enviado com sucesso', e.data);
        }).catch((error) => {
            console.log('Falha no envio', error.response.data);
        })
    }

    const login = (otp: String) => {
        // Implement login logic here

        axios.post(
            'http://localhost:8080/api/validate-otp',
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
            setSend(true);
            window.localStorage.setItem('token', e.data.token);
            console.log('OTP validado com sucesso', e.data);
        }).catch((error) => {
            console.log('Falha na validação do OTP', error.response.data);
        })
    }

    return (
        <div className="login-container">
            <form className="login-form">
                <Container>
                    <Row>
                        <Col md={12}>
                            <h2>Área restrita</h2>
                        </Col>
                        {!send &&
                            <>
                                <Col md={8}>
                                    <input type="text" style={{width: '100%'}} id="phone" name="phone" placeholder='5511900000000' required />
                                </Col>
                                <Col md={4}>
                                    <button type="submit" style={{width: '100%'}} onClick={(e) => {e.preventDefault(); sendSms((document.getElementById('phone') as HTMLInputElement).value)}} className="login-button">Solicitar Senha</button>
                                </Col>
                            </>
                        }
                        {send &&
                            <>
                                <Col md={12}>
                                    <p>Um SMS foi enviado para o número {phone}. Por favor, verifique seu celular.</p>
                                    <input type="password" style={{width: '100%'}} id="otp" name="otp" placeholder='******' required />
                                </Col>
                                <Col md={4}>
                                    <button type="submit" style={{width: '100%'}} onClick={(e) => {e.preventDefault(); login((document.getElementById('otp') as HTMLInputElement).value)}} className="login-button">Logar</button>
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