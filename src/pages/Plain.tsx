import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
        activePayment();
    }, []);

    return (
        <div className='content plain'>
            <Container>
                <Row>
                    <Col md={6} className='laser-list text-right' style={{margin: '0 0 2rem'}}>
                        {pId && (
                            <>
                                <p style={{fontSize: '1.5rem', textAlign: 'center'}}>
                                    Agora contrate por 30 dias,<br /><strong>por apenas R$ 20,00</strong>!
                                </p>
                                <p className='text-center'>
                                    <strong>Pedido {eId}</strong><br />
                                    <small>Clique no Mercado Pago para pagamento.</small>
                                </p>
                                <Wallet initialization={{ preferenceId: pId, redirectMode: 'self'}} />
                                <p style={{margin: '2rem 0'}} className='text-center'>Acesso imediato - Cancele quando quiser - Suporte dedicado</p>
                                <p style={{fontSize: '.75rem', marginTop: '2rem'}} className='text-center'>Formas de pagamentos aceitos:<br /><img src="/images/payment.jpg?1" alt="Pague com:" /></p>
                                <p className='text-center'>Você poderá verificar seus extratos de pagamento e vigência de contratação, acessando <a href='/conta' target='_self'><strong>Minha Conta</strong></a> a qualquer momento.</p>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Plain;