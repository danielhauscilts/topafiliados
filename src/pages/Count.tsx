import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import "yet-another-react-lightbox/styles.css";

import './Count.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

import env from '../utils/env';

// Inicialize o Mercado Pago com seu Public Key 
initMercadoPago('APP_USR-dcb56cc7-c12a-402e-9571-2c772da07096');

const Count = () => {

    const userId:any = window.localStorage.getItem('user');
    const [pId, setPId] = useState<any>(null);

    const getPreferenceId = () => {
        axios.post(`${env}/api/pagamento`,
            {
                "user": JSON.parse(userId)?.id
            }
        ).then((e:any)=>{
            setPId(e.data.id);
        })
    }

    useEffect(()=>{
        getPreferenceId();
    }, []);

    return (
        <>
        <div className='about'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list'>
                        {pId && (
                            <>Pagamento: <Wallet initialization={{ preferenceId: pId }} /></>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Count;