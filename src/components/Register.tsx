import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

import env from '../utils/env';

import './Register.scss';

//icon
import { FaEye } from "react-icons/fa";

initMercadoPago('APP_USR-0dc798dc-56c5-4274-a39d-8029a47bec99');

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

        return new Promise((resolve, reject) => {

            access('pagamento', 'plano');

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
                
                axios.post(`${env}/api/pagamento`,
                        {
                            "plain": plainId,
                            "user_id": e.data.user.id
                        }
                    ).then((e:any)=>{
                        resolve(e.data.id);
                    }).catch(()=>{
                        reject();
                    })

            }).catch(() => {
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
                        {plainId === '20' && (
                            <>
                                <h1 style={{fontSize: '2rem', textAlign: 'center', color: 'rgb(97, 160, 255)', paddingBottom: '1rem', borderBottom: 'solid 1px #ccc'}}>Plano Mensal<br /><small><strong>R$ 29,90</strong></small></h1>
                                <p style={{margin: '1rem 0 .5rem 1rem'}}><strong>Você terá:</strong></p>
                                <ul>
                                    <li>Acesso imediato</li>
                                    <li>1 mês de utilização</li>
                                    <li>Vídeos validados todos os dias</li>
                                    <li>Gerador de links rastreáveis</li>
                                    <li>Página personalizada para Linmk na Bio</li>
                                    <li>Suporte por Whatsapp</li>
                                    <li>Renove somente quando quiser</li>
                                </ul>
                            </>
                        )}
                        {plainId === '120' && (
                            <>
                                <h1 style={{fontSize: '2rem', textAlign: 'center', color: 'rgb(255, 174, 43)', paddingBottom: '1rem', borderBottom: 'solid 1px #ccc'}}>Plano Anual<br /><small><strong>R$ 197,90</strong> <span style={{fontSize: '1rem'}}></span></small></h1>
                                <p style={{margin: '1rem 0 .5rem 1rem'}}><strong>Você terá:</strong></p>
                                <ul>
                                    <li>Acesso imediato</li>
                                    <li>1 ano de utilização</li>
                                    <li>Vídeos validados todos os dias</li>
                                    <li>Gerador de links rastreáveis</li>
                                    <li>Página personalizada para Linmk na Bio</li>
                                    <li>Suporte por Whatsapp</li>
                                    <li>Renove somente quando quiser</li>
                                </ul>
                            </>
                        )}
                        <p style={{color: '#000', fontSize: '1rem'}} className='text-center'><strong>Insira as informações abaixo</strong></p>
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
                                        {(confPassword === null && confPassword === '') && (
                                            <Button disabled={true} style={{width: '100%', color: '#999', padding: '.5rem 0', fontWeight: 'bold', backgroundColor: '#CCC', border: 'none'}}>mercado pago</Button>
                                        )}
                                        {/*<Button style={{width: '100%', fontSize: '1.5rem', fontWeight: 'bold', padding: '.5rem 1rem', margin: '1rem 0'}} onClick={(e)=>{e.preventDefault(); register()}}>Cadastrar</Button>*/}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p style={{fontSize: '.75rem', marginTop: '1rem'}} className='text-center'>Formas de pagamentos aceitos:<br /><img src="/images/payment.jpg?1" alt="Pague com:" /></p>
                    </Col>
                    <Col md={12}>
                        <div className='regulamento text-center'>
                            Ao se cadastrar você fará parte de milhares de pessoas que fazem renda extra todos os meses sem disperdiçar seu tempo e não se preocupe, seus dados são protegidos e não serão compartilhados com ninguém, a Afilipro, zela pela <strong>privacidade</strong> de todos os nossos usuários.
                        </div>
                    </Col>
                    <Col>
                        <p className='text-center'>Você poderá verificar seus extratos de pagamento e vigência de contratação, acessando <a href='/conta' target='_self'><strong>Minha Conta</strong></a> a qualquer momento.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;