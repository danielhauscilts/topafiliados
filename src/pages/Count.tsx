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

    const getPreferenceId = () => {
        axios.post(`${env}/api/pagamento`,
            {
                "user": JSON.parse(userStorage)?.id
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

    const activePayment = () => {
        setPayment(!payment);
        getPreferenceId();
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
                    <Col xs={6}>
                        <div className='box-info'>
                            <span>Telefone</span>
                            <p>{user?.phone}</p>
                        </div>
                    </Col>
                    <Col xs={6}>
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
                {pagamentos.length > 0 && pagamentos.map((e) => (
                    <>
                        <Row style={{borderBottom: 'solid 1px #CCC', margin: '.5rem .25rem', padding: '0 0 .5rem'}}>
                            <Col xs={6}>{e.data.split('-')[2]}/{e.data.split('-')[1]}/{e.data.split('-')[0]}</Col>
                            <Col xs={6}>
                                <span className='status-payment'>
                                    {e.status === '1' ? 'Pago' : 'Cancelado'}
                                </span>
                            </Col>
                        </Row>
                    </>
                ))}
                {pagamentos.length === 0 && (
                    <Row>
                        <Col className='text-center' style={{margin: '2rem 0 0', color: '#999'}}>Ainda não foram contratados planos!</Col>
                    </Row>
                )}
                <Row style={{marginTop: '1rem'}}>
                    <Col className='text-center' style={{marginBottom: '2rem'}}>
                        <p style={{fontSize: '1.5rem'}}>
                            Contrate 30 dias,<br /><strong>por apenas R$ 20,00</strong>!
                        </p>
                        <Button style={{padding: '1rem 3rem', margin: '1rem 0', fontSize: '1.5rem'}} onClick={()=>{activePayment()}}>clicando aqui</Button>
                        <br /><small>* 30 dias contados à partir da confirmação do pagamento</small>
                    </Col>
                </Row>
                {payment && (
                    <Row>
                        <Col md={12} className='laser-list text-center' style={{margin: '2rem 0'}}>
                            {pId && (
                                <>
                                    <strong>Ativar 30 dias pagando com: </strong>
                                    <p><img src="/images/payment.jpg?1" alt="Pague com:" /></p>
                                    <Wallet initialization={{ preferenceId: pId }} />
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