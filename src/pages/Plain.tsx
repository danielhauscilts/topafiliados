import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import "yet-another-react-lightbox/styles.css";

import './Plain.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

import env from '../utils/env';

// Inicialize o Mercado Pago com seu Public Key 
initMercadoPago('APP_USR-0dc798dc-56c5-4274-a39d-8029a47bec99');

const Plain = () => {

    const userStorage:any = window.localStorage.getItem('user');

    const [pId, setPId] = useState<any>(null);
    const [eId, setEId] = useState<any>(null);
    const [payment, setPayment] = useState(false);

    const getPreferenceId = () => {
        axios.post(`${env}/api/pagamento`,
            {
                "user": JSON.parse(userStorage)?.id
            }
        ).then((e:any)=>{
            setPId(e.data.id);
            setEId(e.data.external_reference);
        })
    }

    const activePayment = () => {
        setPayment(!payment);
        getPreferenceId();
    }

    useEffect(()=>{
    }, []);

    return (
        <div className='content plain'>
            <Container>
                <Row>
                    <Col className='text-center'><h1>Parabéns, seu cadastro foi realizado com sucesso!</h1></Col>
                </Row>
                {!pId && (
                    <Row style={{marginTop: '1rem'}}>
                        <Col className='text-center' style={{marginBottom: '2rem'}}>
                            <p style={{fontSize: '1.5rem'}}>
                               Agora, contrate por 30 dias,<br /><strong>por apenas R$ 20,00</strong>!
                            </p>
                            <Button style={{padding: '1rem 3rem', margin: '1rem 0', fontSize: '1.5rem'}} onClick={()=>{activePayment()}}>Gerar PEDIDO</Button>
                            <p><small>* 30 dias contados à partir da confirmação do pagamento</small></p>
                            <p>A partir da geração do pedido, você será guiado ao pagamento através do <strong>Mercado Pago</strong>, <br />não se preocupe, você não precisa ter uma conta na plataforma de pagamento e ainda estará em um ambiente seguro, podendo realizar seu pagamento através do PIX, Cartão de Crédito ou Débito.</p>
                            <p><strong>Além disso o pagamento não é recorrente para seu melhor controle, cada pagamento lhe dará acesso total á Afilipro por 30 dias, podem ser renovado sempre que você quiser.</strong></p>
                        </Col>
                    </Row>
                )}
                {pId && (
                    <Row>
                        <Col md={12} className='laser-list text-right' style={{margin: '0 0 2rem'}}>
                            {pId && (
                                <>
                                    <p className='text-center'>
                                        <strong>Pedido {eId} gerado</strong><br />
                                        <small>Clique abaixo e seja direcionado a um ambiente seguro</small>
                                    </p>
                                    <Wallet initialization={{ preferenceId: pId, redirectMode: 'self'}} />
                                    <p style={{fontSize: '.75rem', marginTop: '2rem'}}>Pagamentos aceitos:<br /><img src="/images/payment.jpg?1" alt="Pague com:" /></p>
                                    <p className='text-center'>Você poderá verificar seus extratos de pagamento e vigência de contratação, acessando <a href='/conta' target='_self'><strong>Minha Conta</strong></a> a qualquer momento.</p>
                                </>
                            )}
                        </Col>
                    </Row>
                )}
                
            </Container>
        </div>
    )
}

export default Plain;