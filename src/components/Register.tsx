import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

import env from '../utils/env';

import './Register.scss';

//icon
import { FaEye } from "react-icons/fa";

function Register() {

    const [name, setName] = useState<any>(null);
    const [mail, setMail] = useState<any>(null);
    const [phone, setPhone] = useState<any>(null);
    const [password, setPassword] = useState<any>(null);
    const [confPassword, setConfPassword] = useState<any>(null);
    const [error, setError] = useState<any>(null);

     const showPassword = (e:any) => {
        const attr = document.getElementById(e)?.getAttribute('type');

        if(attr=='password') {
            document.getElementById(e)?.setAttribute('type', 'text');
        } else {
            document.getElementById(e)?.setAttribute('type', 'password');
        }
    }

    const[sucesso, setSucesso] = useState<boolean>(false);

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
            setSucesso(true);
        }).catch((error) => {
            if (error.status === 401) {
                setError('cadastro não encontrado');
            }
        })
    }

    const login = () => {
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
            window.open('/plano', '_self');
        }).catch((error) => {
            console.log('Falha na validação do OTP', error.response.data);
            setError('Erro na validação, tente novamente!');
        })
    }

    const register = () => {

        if (password !== confPassword) {
            alert('As senhas não conferem!');
            return;
        }

        let cleanPhone = '';
        
        if (phone.indexOf('55') === -1) {
            cleanPhone = '55' + phone.replace(/\D/g, '');
        } else {
            cleanPhone = phone.replace(/\D/g, '');
        }

        axios.post(`${env}/api/user`,
            {
                'name': name,
                'mail': mail,
                'phone': cleanPhone,
                'password': password
            }
        ).then(()=>{
            sendOtp();
        }).catch((err)=>{
            setError(err.response.data.error);

            setTimeout(()=>{
                setError(null);
            }, 5000)
        })
    }

    const [otp, setOtp] = useState<any>(null);

    return (
        <div className='Register'>
            {!sucesso && (
                <Container className='home-register'>
                    <Row>
                        <Col>
                            <h1>Cadastre-se</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Container>
                                <Row>
                                    <Col xs={3}>Nome</Col>
                                    <Col xs={9}>
                                        <input 
                                            type='text' 
                                            id='name'
                                            placeholder='Nome'
                                            onChange={(e)=>{setName(e.target.value)}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>E-mail</Col>
                                    <Col xs={9}>
                                        <input 
                                            type='text' 
                                            id='mail'
                                            placeholder='seu@email.com'
                                            onChange={(e)=>{setMail(e.target.value)}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>Celular</Col>
                                    <Col xs={9}>
                                        <input 
                                            type='text' 
                                            id='phone'
                                            placeholder='(**) 9****-****'
                                            onChange={(e)=>{setPhone(e.target.value)}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>Senha</Col>
                                    <Col xs={9} className='password-field'>
                                        <input 
                                            type='password' 
                                            id='password'
                                            placeholder='******'
                                            onChange={(e)=>{setPassword(e.target.value)}} />
                                            <FaEye onClick={()=>{showPassword('password')}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3}>Confirme a Senha</Col>
                                    <Col xs={9} className='password-field'>
                                        <input 
                                            type='password' 
                                            id='confPassword'
                                            placeholder='******'
                                            onChange={(e)=>{setConfPassword(e.target.value)}} />
                                            <FaEye  onClick={()=>{showPassword('confPassword')}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <Button style={{width: '100%'}} onClick={(e)=>{e.preventDefault(); register()}}>Cadastre-se</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='regulamento text-center'>
                                            Ao se cadastrar você fará parte de milhares de pessoas que fazem renda extra todos os meses sem disperdiçar seu tempo e não se preocupe, seus dados são protegidos e não serão compartilhados com ninguém, a Afilipro, zela pela <strong>privacidade</strong> de todos os nossos usuários.
                                        </div>
                                    </Col>
                                </Row>
                                {error && (
                                    <Row className='error'><Col>{error}</Col></Row>
                                )}
                            </Container>
                        </Col>
                    </Row>
                </Container>
            )}
            {sucesso && (
                <Container style={{marginBottom: '2rem'}}>
                    <Row>
                        <Col style={{textAlign: 'center', margin: '1rem 0', fontWeight: 'bold', fontSize: '1.25rem'}}>Falta apenas um passo, agora vamos validar seu cadastro!</Col>
                    </Row>
                    <Row>
                        <Col className='text-center' style={{marginBottom: '1rem'}}>Digite no campo abaixo o código de 6 digitos enviado para o celular informado</Col>
                    </Row>
                    <Row className='otp-form'>
                        <Col xs={6}>
                            <input type="text" onChange={(e)=>{setOtp(e.target.value)}} placeholder='******' />
                        </Col>
                        <Col xs={6}>
                            <Button onClick={(e)=>{e.preventDefault(); login()}}>Validar</Button>
                        </Col>
                    </Row>
                    {error && (
                        <Row className='error'><Col>{error}</Col></Row>
                    )}
                </Container>
            )}
        </div>
    )
}

export default Register;