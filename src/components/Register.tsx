import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

import env from '../utils/env';

import './Register.scss';

//icon
import { FaEye } from "react-icons/fa";

initMercadoPago('APP_USR-ceb63fa9-bcdd-4c5c-8ae3-19ca3b9411fe');

function Register() {

    const { pathname } = useLocation();

    const [name, setName] = useState<any>(null);
    const [mail, setMail] = useState<any>(null);
    const [password, setPassword] = useState<any>(null);
    const [confPassword, setConfPassword] = useState<any>(null);
    const [error, setError] = useState<any>(false);

    const showPassword = (e:any) => {
        const attr = document.getElementById(e)?.getAttribute('type');

        if(attr=='password') {
            document.getElementById(e)?.setAttribute('type', 'text');
        } else {
            document.getElementById(e)?.setAttribute('type', 'password');
        }
    }

    // PAGAMENTO

    const register = () => {

        access('btn_cadastrar_plano', 'Cadastro');

        return new Promise((resolve, reject) => {

            if (password !== confPassword) {
                alert('As senhas não conferem!');
                reject();
            }

            axios.post(`${env}/api/user`,
                {
                    'name': name,
                    'mail': mail,
                    'password': password
                }
            ).then((e)=>{
                window.localStorage.setItem('user', JSON.stringify(e.data.user));
                window.localStorage.setItem('token', e.data.token);

                access('act_cadastrado_com_sucesso', 'Cadastro');
                
                axios.post(`${env}/api/pagamento`,
                        {
                            "user_id": e.data.user.id
                        }
                    ).then((e:any)=>{
                        access('act_pagamento_com_sucesso', 'Cadastro');
                        resolve(e.data.id);
                    }).catch(()=>{
                        access('act_pagamento_com_erro', 'Cadastro');
                        reject();
                    })

            }).catch(() => {
                access('act_cadastrado_com_erro', 'Cadastro');
                setError('Usuário já registrado');
                setTimeout(()=>{
                    setError(false);
                }, 5000);
                reject();
            })
        })
    }

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [pathname]);

    const access = (btn:any, pg:any) => {

        axios.post(`${env}/api/access`, {
            button: btn,
            page: pg
        }).then(()=>{

        })
    }

    return (
        <div className='Register'>
            <Container className='register'>
                <Row>
                    <Col md={12}>
                        <h1 style={{lineHeight: '2.75rem'}}>Acesso imediato!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p style={{marginBottom: '2rem', fontSize: '1.5rem', lineHeight: '1.75rem'}}><strong>Realize seu cadastro e<br />libere seus acesso agora mesmo!</strong></p>
                        <div className='reg-form'>
                            <Container>
                                <Row>
                                    <Col xs={12}>
                                        <input 
                                            type='text' 
                                            id='name'
                                            placeholder='Nome'
                                            onChange={(e)=>{setName(e.target.value)}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <input 
                                            type='text' 
                                            id='mail'
                                            placeholder='E-mail'
                                            onChange={(e)=>{setMail(e.target.value)}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className='password-field'>
                                        <input 
                                            type='password' 
                                            id='password'
                                            placeholder='Senha'
                                            onChange={(e)=>{setPassword(e.target.value)}} />
                                            <FaEye onClick={()=>{showPassword('password')}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className='password-field'>
                                        <input 
                                            type='password' 
                                            id='confPassword'
                                            placeholder='Confirme a senha'
                                            onChange={(e)=>{setConfPassword(e.target.value)}} />
                                            <FaEye  onClick={()=>{showPassword('confPassword')}} />
                                    </Col>
                                    <Col>
                                        <p style={{backgroundColor: 'yellow', padding: '.5rem', borderRadius: '10px', margin: '1rem 0 0'}}>Garantia de 7 dias, não se adaptou devolvemos seu dinheiro!</p>
                                    </Col>
                                </Row>
                                {error && (
                                    <Row className='error'><Col>{error}</Col></Row>
                                )}
                                <Row>
                                    <Col xs={12}>
                                        {name && mail && password && confPassword && (password === confPassword) && (
                                            <Wallet initialization={{ redirectMode: 'self'}} onSubmit={register} onReady={()=>{console.log('ready')}} onError={()=>{setError('Ocorreu um erro ao gerar pagamento, tente novamente!')}} />
                                        )}
                                        {(confPassword === '' || confPassword === null || (password !== confPassword)) && (
                                            <Button disabled={true} style={{width: '100%', color: '#999', padding: '.5rem 0', fontWeight: 'bold', backgroundColor: '#CCC', border: 'none'}}>FINALIZAR</Button>
                                        )}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;