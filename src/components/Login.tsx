import { useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import env from '../utils/env';
import { useNavigate } from 'react-router-dom';

import './Login.scss';
import { BiTargetLock } from 'react-icons/bi';

interface Props {
    show: boolean;
    setShow: any;
}

function Login({show, setShow}: Props) {

    const Navigate = useNavigate();

    const [mail, setMail] =  useState('');
    const [password, setPassword] =  useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const goToRegister = () => {
        Navigate('/#plains');
    }

    const resetPassword = () => {
        axios.put(`${env}/api/password`, {
            "mail": mail
        }).then(()=>{
            setError('Foi encaminhada uma nova senha para seu e-mail!');
        }).catch(()=>{
            setError('Não foi possível encaminhar o e-mail');
        })
    }

    const login = () => {
        // Implement login logic here

        axios.post(
            `${env}/api/login`,
            {
                "mail": mail,
                "password": password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then((e)=>{
            window.localStorage.setItem('user', JSON.stringify(e.data.user));
            window.localStorage.setItem('token', e.data.token);
            setShow(false);
            setSuccess(true);
            window.open('/produtos', '_self');
        }).catch(() => {
            setError('Erro na validação, tente novamente!');
        })
    }

    return (
        <div className="login-container">
            <form className="login-form">
                <Container>
                    {!success &&
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
                                <Button type="submit" style={{width: '100%'}} onClick={(e) => {e.preventDefault(); login()}} className="login-button">Validar login</Button>
                            </Col>
                            <Col sm={12} style={{marginTop: '2rem'}}>
                                <span onClick={()=>{
                                    console.log(mail);
                                    if(mail === '') {setError('Digite seu e-mail de cadastro!'); return;}
                                    if(confirm('Deseja enviar uma nova senha para seu e-mail?')){
                                        resetPassword();
                                    }
                                }} style={{display: 'block', marginBottom: '1rem'}}>Esqueceu sua senha?</span>
                            </Col>
                            <Col sm={12}>
                                <div style={{borderTop: 'solid 1px #ccc', fontSize: '.75rem', marginTop: '1rem', paddingTop: '1rem', textAlign: 'center'}}>
                                    <span onClick={()=>{
                                        goToRegister();
                                        setShow(!show);   
                                        }}>Ainda não tem cadastro? <strong style={{cursor: 'pointer'}}>Clique aqui!</strong></span>
                                </div>
                            </Col>
                            { error !== '' && (
                            <Col md={12}>
                                <div className='login-error'>{error}</div>
                            </Col>
                            )}
                        </Row>
                    </>
                    }
                </Container>
            </form>
        </div>
    );
}

export default Login;