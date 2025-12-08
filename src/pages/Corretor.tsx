import { useEffect, useState } from 'react';
import { useParams, useNavigate  } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import env from '../utils/env';

import './Corretor.scss';

const Corretor = () => {

    const { id_corretor } = useParams();
    const [corretor, setCorretor] = useState<any>({});
    const Navigate = useNavigate();

    useEffect(() => {
        
        axios.get(`${env}api/corretor/${id_corretor}`)
            .then((e)=>{
                setCorretor(e.data);
            }).catch((err)=>{
                setCorretor({});
                console.log('Error: ', err);
            })

    }, []);

    return (
        <div className='corretor'>
            <Container>
                <Row>
                    <Col md={12}><h3>Corretor</h3></Col>
                    <Col md={12}>
                        <div className='glass-box'>
                            <Container>
                                <Row>
                                    <Col md={5}><strong>Nome:</strong> {corretor?.name}</Col>
                                    <Col md={4}><strong>Imobiliária:</strong> {corretor?.imobiliaria}</Col>
                                    <Col md={3} className='text-end'><strong>Telefone:</strong> {corretor?.phone}</Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    {corretor.clientes?.length > 0 &&
                        <Col md={12} className='user-list'>
                            <h3>Clientes de {corretor?.name}</h3>
                            <ul>
                                {
                                    corretor.clientes?.map((e:any, i:number) => (
                                        <li key={i} className='glass-box'>
                                            <Container>
                                                <Row>
                                                    <Col md={5} style={{alignContent: "center"}}>{e.name}</Col>
                                                    <Col md={5} style={{alignContent: "center"}}><strong>Telefone: </strong>{e.phone}</Col>
                                                    <Col md={2} className='text-end'>
                                                        <Button onClick={(ev)=>{ev.preventDefault(); Navigate(`/cliente/${e.id}`)}}>Ver unidades</Button>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </li>
                                    )) 
                                }
                            </ul>
                        </Col>
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Corretor;