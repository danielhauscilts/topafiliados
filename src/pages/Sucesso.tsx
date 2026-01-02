import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import env from '../utils/env';

//icons
import { FaCheckCircle } from "react-icons/fa";

import './Sucesso.scss';

const Sucesso = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const transaction_id = searchParams.get('preference_id');

    useEffect(()=>{

        // Save o sucesso no BD
        axios.put(`${env}/api/pagamento`,{
            "id_pagamento": transaction_id
        }).then(()=>{

        })

    }, []);

    return (
        <>
        <div className='about'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list'>
                        <div className='titulo text-center' style={{padding: '2rem 0'}}>
                            <p style={{fontSize: '5rem', color: 'green'}}><FaCheckCircle /></p>
                            <h1>Pagamento com sucesso</h1>
                            <p>Agora você pode aproveitar todos os recursos do AfiliPRO por 30 dias, caso deseje continuar, realize uma nova compra!</p>
                            <p><Link to="/tutoriais">Conheça como usar!</Link></p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Sucesso;