import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
import env from '../utils/env';

import './Unidades.scss';

const Unidades = () => {

    const Navigate = useNavigate();

    const [unidades, setUnidades] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [corretores, setCorretores] = useState<any[]>([]);
    const [unit, setUnit] = useState<any>(null);
    const [client, setClient] = useState<any>(null);
    const [corretor, setCorretor] = useState<any>(null);
    const userType:any = window.localStorage.getItem('user');

    const registerUnit = () => {

        axios.post(`${env}api/unit`,
            {
                unit: unit,
                id_client: client,
                id_corretor: corretor,
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            }).then(()=>{
                getUnits();
            }).catch((err)=>{
                console.log('error: ', err);
            })
    }

    const getUnits = () => {
        axios.get(`${env}api/units`)
            .then((e)=>{
                setUnidades(e.data);
            }).catch((err)=>{
                setUnidades([]);
                console.log('Error: ', err);
            })
    }

    useEffect(() => {

        getUnits();

        axios.get(`${env}api/clients`)
        .then((e)=>{
            setClients(e.data);
        }).catch((err)=>{
            console.log('error: ', err);
        })

        axios.get(`${env}api/users`)
        .then((e)=>{
            setCorretores(e.data);
        }).catch((err)=>{
            console.log('error: ', err);
        })

    }, []);

    return (
        <div className='unidades'>
            <Container>
                <Row>
                    <Col md={12} className='user-list'>
                        <h3>Unidades</h3>
                        <ul>
                            {JSON.parse(userType).type === 'adm' && 
                                <li className='glass-box' style={{marginBottom: '2rem'}}>
                                    <Container>
                                        <Row>
                                            <Col md={2} style={{alignContent: 'center'}}><strong>Cadastrar nova unidade</strong></Col>
                                            <Col md={1} style={{alignContent: 'center'}} className='text-end'>Unidade</Col>
                                            <Col md={2} style={{alignContent: 'center'}}>
                                                <Form.Control 
                                                    type='text'
                                                    name='data'
                                                    placeholder='000'
                                                    onChange={(e)=>{setUnit(e.target.value)}}/>
                                            </Col>
                                            <Col md={1} style={{alignContent: 'center'}} className='text-end'>Cliente</Col>
                                            <Col md={2} style={{alignContent: 'center'}}>
                                                <Form.Select 
                                                    name='data'
                                                    onChange={(e)=>{setClient(e.target.value)}}>
                                                        <option value="">Selecione</option>
                                                        {clients?.length && clients.map((e, i)=> (
                                                            <option key={i} value={e.id}>{e.name}</option>
                                                        ))}
                                                </Form.Select>
                                            </Col>
                                            <Col md={1} style={{alignContent: 'center'}} className='text-end'>Corretor</Col>
                                            <Col md={2} style={{alignContent: 'center'}}>
                                                <Form.Select 
                                                    name='data'
                                                    onChange={(e)=>{setCorretor(e.target.value)}}>
                                                        <option value="">Selecione</option>
                                                        {corretores?.length && corretores.map((e, i)=> (
                                                            <option key={i} value={e.id}>{e.name} - {e.imobiliaria}</option>
                                                        ))}
                                                </Form.Select>
                                            </Col>
                                            <Col md={1} className='text-end' style={{alignContent: 'center'}}>
                                                <Button onClick={(e)=>{e.preventDefault();registerUnit()}}>Cadastrar</Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </li>
                            }
                            <ul>
                                {unidades?.map((e:any, i:number) => (
                                    <li key={i} className='glass-box'>
                                        <Container>
                                            <Row>
                                                <Col md={2} style={{alignContent: "center"}}><a style={{cursor:'pointer'}} onClick={(ev)=>{ev.preventDefault();Navigate(`/unidade/${e.id}`)}}><strong>Unidade: </strong>{e.unidade}</a></Col>
                                                <Col md={4} style={{alignContent: "center"}}><a style={{cursor:'pointer'}} onClick={(ev)=>{ev.preventDefault();Navigate(`/cliente/${e.cliente_id}`)}}><strong>Cliente: </strong>{e.cliente_nome}</a></Col>
                                                <Col md={4} style={{alignContent: "center"}}><a style={{cursor:'pointer'}} onClick={(ev)=>{ev.preventDefault();Navigate(`/corretor/${e.corretor_id}`)}}><strong>Corretor: </strong>{e.corretor_nome} de {e.corretor_imobiliaria}</a></Col>
                                                <Col md={2} className='text-end'>
                                                    <Button onClick={(ev)=>{ev.preventDefault(); Navigate(`/unidade/${e.id}`)}}>Ver detalhes</Button>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </li>
                                ))}
                            </ul>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Unidades;