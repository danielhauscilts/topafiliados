import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import "yet-another-react-lightbox/styles.css";

import './Count.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

import env from '../utils/env';

// Inicialize o Mercado Pago com seu Public Key 
initMercadoPago('APP_USR-0dc798dc-56c5-4274-a39d-8029a47bec99');

const Count = () => {

    const userStorage:any = window.localStorage.getItem('user');

    const [user] = useState<any>(JSON.parse(userStorage));
    const [pId, setPId] = useState<any>(null);
    const [pagamentos, setPagamentos] = useState<any[]>([]);
    const [payment, setPayment] = useState(false);
    const [plain, setPlain] = useState(20);

    const getPreferenceId = (pl: number) => {
        axios.post(`${env}/api/pagamento`,
            {
                "user_id": JSON.parse(userStorage)?.id,
                "plain": pl
            }
        ).then((e:any)=>{
            setPId(e.data.id);
        })
    }

    const setStatus = (st:any) => {
        
        let status = '';

        switch(st) {
            case 'a':
                status = 'Administrador';
                break;
            case 'u':
                status = 'Ativo';
                break;
            case 'p':
                status = 'Pendente';
                break;
        }

        return status;
    }

    const activePayment = (pl: number) => {
        setPlain(pl);
        setPayment(!payment);
        getPreferenceId(pl);
    }

    useEffect(()=>{
        axios.get(`${env}/api/pagamentos/${user?.id}`)
        .then((e)=>{
            setPagamentos(e.data);
        }).catch(()=>{
            setPagamentos([]);
        })
    }, []);

    return (
        <>
        <div className='content count'>
            <Container>
                <Row>
                    <Col><h1>Minha Conta</h1></Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col xs={12}>
                        <div className='box-info'>
                            <span>Nome</span>
                            <p>{user?.name}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <div className='box-info'>
                            <span>E-mail</span>
                            <p>{user?.mail}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {/* <Col xs={6}>
                        <div className='box-info'>
                            <span>Telefone</span>
                            <p>{user?.phone}</p>
                        </div>
                    </Col>
                    */}
                    <Col xs={12}>
                        <div className='box-info'>
                            <span>Status</span>
                            <p>{setStatus(user?.type)}</p>
                        </div>
                    </Col>
                </Row>
                {pagamentos.length > 0 && (
                    <Row>
                        <Col xs={12}>
                            <div className='box-info'>
                                <span>Utilização vigente até</span>
                                <p>
                                    {pagamentos[pagamentos.length-1]?.end_date.split('-')[2]}/
                                    {pagamentos[pagamentos.length-1]?.end_date.split('-')[1]}/
                                    {pagamentos[pagamentos.length-1]?.end_date.split('-')[0]}
                                </p>
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
            <Container>
                {pagamentos.length > 0 && (
                    <Row>
                        <Col>
                            <h3 style={{margin: '1rem 0'}}>Faturas</h3>
                        </Col>
                    </Row>
                )}
                {pagamentos.length > 0 && pagamentos.map((e, i) => (
                    <Row key={i} style={{borderBottom: 'solid 1px #CCC', margin: '.5rem .25rem', padding: '0 0 .5rem'}}>
                        <Col xs={6}>{e.data.split('-')[2]}/{e.data.split('-')[1]}/{e.data.split('-')[0]}</Col>
                        <Col xs={6}>
                            <span className='status-payment'>
                                {e.status === '1' ? 'Pago' : 'Cancelado'}
                            </span>
                        </Col>
                    </Row>
                ))}
                {pagamentos.length === 0 && !pId && (
                    <Row>
                        <Col className='text-center' style={{margin: '2rem 0 0', color: '#999'}}>Ainda não foram contratados planos, <br /><strong>Contrate agora mesmo escolhendo um<br />dos planos abaixo!</strong></Col>
                    </Row>
                )}
                {!pId && (
                    <Row style={{marginTop: '1rem'}}>
                        <Col xs={12} className='text-center'>
                            <Button style={{padding: '1rem 3rem', margin: '1rem 0', fontSize: '1.5rem', width: '100%'}} onClick={()=>{activePayment(20)}}>1 mês por <strong>R$ 29,90</strong></Button>
                        </Col>
                        <Col xs={12} className='text-center' style={{marginBottom: '2rem'}}>
                            <Button style={{padding: '1rem 3rem', margin: '1rem 0', fontSize: '1.5rem', width: '100%'}} onClick={()=>{activePayment(120)}}>1 ano por <strong>R$ 197,90</strong></Button>
                            <br /><small>* 1 ano contado à partir da confirmação do pagamento</small>
                        </Col>
                    </Row>
                )}
                {pId && (
                    <Row>
                        <Col md={12} className='laser-list text-right' style={{margin: '2rem 0'}}>
                            {pId && (
                                <>
                                    {plain === 20 && (
                                        <p className='text-center'>
                                            <p>Você está contratando o plano por 1 mês</p>
                                            <p style={{fontSize: '2rem'}}><strong>R$ 29,90</strong></p>
                                            <small>Clique abaixo e pague com</small>
                                        </p>
                                    )}
                                    {plain === 120 && (
                                        <p className='text-center'>
                                            <p>Você está contratando o plano por 1 ano</p>
                                            <p style={{fontSize: '2rem'}}><strong>R$ 197,90</strong></p>
                                            <small>Clique abaixo e pague com</small>
                                        </p>
                                    )}
                                    <Wallet initialization={{ preferenceId: pId }} />
                                    <p style={{fontSize: '.75rem', marginTop: '2rem'}}>Pagamentos aceitos:<br /><img src="/images/payment.jpg?1" alt="Pague com:" /></p>
                                </>
                            )}
                        </Col>
                    </Row>
                )}
                
            </Container>
        </div>
        </>
    )
}

export default Count;