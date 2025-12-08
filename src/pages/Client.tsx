import { useEffect, useState } from 'react';
import { useParams, useNavigate  } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import env from '../utils/env';

import './Client.scss';

const Client = () => {

    const { id_user } = useParams();
    const [user, setCorretor] = useState<any>({});
    const Navigate = useNavigate();

    useEffect(() => {
        
        axios.get(`${env}api/client/${id_user}`)
            .then((e)=>{
                setCorretor(e.data);
            }).catch((err)=>{
                setCorretor({});
                console.log('Error: ', err);
            })

    }, []);

    return (
        <div className='client'>
            <Container style={{marginTop: '2rem'}}>
                <Row>
                    <Col md={12}><h3>Cliente</h3></Col>
                    <Col md={12}>
                        <div className='glass-box'>
                            <Container>
                                <Row>
                                    <Col md={8}><strong>Nome:</strong> {user?.name}</Col>
                                    <Col md={4} className='text-end'><strong>Telefone:</strong> {user?.phone}</Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    {user.unidades?.length > 0 &&
                        <Col md={12} className='user-list'>
                            <h3>Unidades de {user?.name}</h3>
                            <ul>
                                {
                                    user.unidades?.map((e:any, i:number) => (
                                        <li key={i} className='glass-box'>
                                            <Container>
                                                <Row>
                                                    <Col md={5} style={{alignContent: "center"}}><strong>Unidade: </strong>{e.unidade}</Col>
                                                    <Col md={5} style={{alignContent: "center"}}><strong>Corretor: </strong>{e.corretor}</Col>
                                                    <Col md={2} className='text-end'>
                                                        <Button onClick={(ev)=>{ev.preventDefault(); Navigate(`/unidade/${e.id}`)}}>Ver detalhes</Button>
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

export default Client;