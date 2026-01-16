import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import env from '../utils/env';

import './Pendente.scss';

//icons
import { FaCheckCircle } from "react-icons/fa";
import { BiSolidErrorAlt } from "react-icons/bi";

const Pendente = () => {

    const [searchParams] = useSearchParams();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const preference_id = searchParams.get('preference_id');
    const external_reference = searchParams.get('external_reference');
    const payment_id = searchParams.get('payment_id');

    useEffect(()=>{

        axios.get(`${env}/api/pagamento/${payment_id}`)
            .then((e)=>{
                if (e.data.status === 'approved') {
                    // Save o sucesso no BD
                    axios.put(`${env}/api/pagamento`,{
                            "preference_id": preference_id,
                            "payment_id": payment_id,
                            "external_reference": external_reference
                        }).then(()=>{
                            setSuccess(true);
                            setError(false);
                        }).catch(()=>{
                            setSuccess(true);
                            setError(true);
                        })
                } else {
                    setSuccess(true);
                    setError(true);
                }
            })
            .catch(()=>{
                setSuccess(true);
                setError(true);
            })

        }, []);

    return (
        <>
        <div className='about'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list'>
                        {success && !error && (
                            <div className='titulo text-center' style={{padding: '2rem 0'}}>
                                <p style={{fontSize: '5rem', color: 'green'}}><FaCheckCircle /></p>
                                <h1>Pagamento com sucesso</h1>
                                <p>Agora você pode aproveitar todos os recursos do Afilipro por 30 dias!</p>
                                <p><a href="/tutoriais" target='_self'>Conheça como usar!</a></p>
                            </div>
                        )}

                        {success && error && (
                            <div className='titulo text-center' style={{padding: '2rem 0'}}>
                            <p style={{fontSize: '5rem', color: 'orange'}}><BiSolidErrorAlt /></p>
                            <h1>Estamos validando seu pagamento!</h1>
                            <p>Aguarde a confirmação de seu PIX ou caso não tenha realizado o pagamento gere um novo pedido em <Link to="/conta"><strong>Minha conta</strong></Link>!</p>
                        </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Pendente;