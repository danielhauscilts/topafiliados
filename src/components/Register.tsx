import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

import env from '../utils/env';

import './Register.scss';

//icon
import { FaEye } from "react-icons/fa";

initMercadoPago('APP_USR-ceb63fa9-bcdd-4c5c-8ae3-19ca3b9411fe');

function Register() {

    const { pathname } = useLocation();

    const { plainId } = useParams();

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

        access('btn_cadastrar_plano_'+plainId, 'Cadastro');

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

                access('act_cadastrado_com_sucesso_plano_'+plainId, 'Cadastro');
                
                axios.post(`${env}/api/pagamento`,
                        {
                            "plain": plainId,
                            "user_id": e.data.user.id
                        }
                    ).then((e:any)=>{
                        access('act_pagamento_com_sucesso_plano_'+plainId, 'Cadastro');
                        resolve(e.data.id);
                    }).catch(()=>{
                        access('act_pagamento_com_erro_plano_'+plainId, 'Cadastro');
                        reject();
                    })

            }).catch(() => {
                access('act_cadastrado_com_erro_plano_'+plainId, 'Cadastro');
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

    useEffect(()=>{
        access('cadastro_plano_' + plainId, 'Cadastro');
    }, []);

    return (
        <div className='Register'>
            <Container className='register'>
                <Row>
                    <Col md={12}>
                        <h1 style={{fontSize: '1rem', textAlign: 'center', color: '#999', paddingBottom: '0', textDecoration: 'line-through'}}>De R$ 249,90</h1>
                        <p style={{textAlign: 'center', fontSize: '2rem', lineHeight: '1.5rem', marginBottom: '1rem'}}>
                            por <strong style={{color: 'orangered'}}>R$ 159,90</strong><br />
                            <small style={{fontSize: '1rem'}}>parcele em 10x de R$ 15,99</small>
                        </p>
                        <p>Acesso por 1 ano</p>
                    </Col>
                    <Col md={12}>
                        <div className='reg-form'>
                            <Container>
                                <Row>
                                    <Col xs={12}>
                                        <input 
                                            type='text' 
                                            id='name'
                                            placeholder='Nome: ex. João da Silva'
                                            onChange={(e)=>{setName(e.target.value)}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <input 
                                            type='text' 
                                            id='mail'
                                            placeholder='E-mail: ex. seu@email.com'
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
                                            <Button disabled={true} style={{width: '100%', color: '#999', padding: '.5rem 0', fontWeight: 'bold', backgroundColor: '#CCC', border: 'none'}}>ir para pagamento</Button>
                                        )}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                    <p style={{fontSize: '.75rem', marginTop: '1rem'}} className='text-center'>Formas de pagamentos aceitos:<br /><img src="/images/payment.jpg?1" alt="Pague com:" /></p>
                        <p>
                            <p style={{margin: '1rem 0 .5rem 1rem'}}><strong>Você terá:</strong></p>
                            <ul style={{textAlign: 'left'}}>
                                <li>Acesso imediato</li>
                                <li>{(plainId === '20') ? '1 mês' : '1 ano'} de utilização</li>
                                <li>Vídeos prontos</li>
                                <li>Gerador de links rastreáveis</li>
                                <li>Site personalizado</li>
                                <li>Suporte por Whatsapp</li>
                                <li>Renove somente quando quiser</li>
                            </ul>
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;