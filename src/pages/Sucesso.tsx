import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import env from '../utils/env';

//icons
import { FaCheckCircle } from "react-icons/fa";
import { BiSolidErrorAlt } from "react-icons/bi";

import './Sucesso.scss';

const Sucesso = () => {

    const [searchParams] = useSearchParams();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const preference_id = searchParams.get('preference_id');
    const payment_id = searchParams.get('payment_id');

    useEffect(()=>{

        // Save o sucesso no BD
        axios.put(`${env}/api/pagamento`,{
            "preference_id": preference_id,
            "payment_id": payment_id
        }).then((e)=>{
            setSuccess(true);
            setError(false);
            window.localStorage.setItem('user', JSON.stringify(e.data.user));
        }).catch(()=>{
            setSuccess(true);
            setError(true);
        })

    }, []);

    return (
        <>
        <div className='sucesso content'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list'>
                        {success && !error && (
                            <div className='titulo text-center' style={{padding: '2rem 0'}}>
                                <p style={{fontSize: '5rem', color: 'green'}}><FaCheckCircle /></p>
                                <h1>Pagamento com sucesso</h1>
                                <p>Agora você pode aproveitar todos os recursos do AfiliPRO por 30 dias, caso deseje continuar, realize uma nova compra!</p>
                                <p><a href="/tutoriais" target='_self'>Conheça como usar!</a></p>
                            </div>
                        )}

                        {success && error && (
                            <div className='titulo text-center' style={{padding: '2rem 0'}}>
                            <p style={{fontSize: '5rem', color: 'green'}}><BiSolidErrorAlt /></p>
                            <h1>Houve uma falha em seu pagamento!</h1>
                            <p>Tente novamente ou contate sua instituição financeira</p>
                            <p><Link to="/conta">Ir para o <strong>Minha conta!</strong></Link></p>
                        </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Sucesso;