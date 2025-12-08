import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
import env from '../utils/env';

import './Register.scss';

const Register = () => {

    const Navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [users, setUsers] = useState([]);
    const [imobiliaria, setImobiliaria] = useState('');
    const [imobiliarias, setImobiliarias] = useState([]);

    const register = () => {

        axios.post(`${env}api/user`,
            {
                name: name,
                phone: phone.replace(/\D/g, ""),
                type: 'crt',
                imobiliaria: imobiliaria
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            }
        ).then(()=>{
            listUsers();
        }).catch((err)=>{
            console.log('Error: ', err);
        })
    }

    const listUsers = () => {
        axios.get(`${env}api/users`)
            .then((e)=>{
                console.log('Corretores ', e);
                setUsers(e.data)
            }).catch((err)=>{
                setUsers([]);
                console.log('Error: ', err);
            })
    }

    const listImobiliarias = () => {
        axios.get(`${env}api/imobiliaria`)
            .then((e)=>{
                setImobiliarias(e.data)
            }).catch((err)=>{
                setImobiliarias([]);
                console.log('Error: ', err);
            })
    }

    const removeUser = (id:any) => {
        axios.delete(`${env}api/user/${id}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            }
        ).then(()=>{
            listUsers();
        })
    }

    useEffect(() => {
        listUsers();
        listImobiliarias();
    }, []);

    return (
        <div className='register'>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3>Cadastrar Corretor</h3>
                    </Col>
                    <Col md={12}>
                        <div className='glass-box form-register'>
                            <Container>
                                <Row>
                                    <Col md={12}><strong>Nome</strong></Col>
                                    <Col md={12}>
                                        <Form.Control
                                            type='text'
                                            id='name'
                                            placeholder='Nome'
                                            onChange={(e)=>{setName(e.target.value)}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}><strong>Telefone</strong></Col>
                                    <Col md={12}>
                                        <Form.Control
                                            type='text'
                                            id='phone'
                                            placeholder='5511900000000'
                                            onChange={(e)=>{setPhone(e.target.value)}} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}><strong>Imobiliária</strong></Col>
                                    <Col md={12}>
                                        <Form.Select
                                            id='imobiliaria'
                                            onChange={(e)=>{setImobiliaria(e.target.value)}}>
                                            <option value="">Selecione</option>
                                            <option value="">Autonomo</option>
                                            { imobiliarias?.length > 0 && 
                                                imobiliarias.map((e:any, i) => (
                                                    <option value={e.id} key={i}>{e.nome}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className='text-end'>
                                        <Button onClick={(e)=>{e.preventDefault(); register(); }}>Cadastrar</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    {users?.length > 0 &&
                        <Col md={12} className='user-list'>
                            <h3>Corretores</h3>
                            <ul>
                                {
                                    users.map((e:any, i) => (
                                        <li key={i} className='glass-box'>
                                            <Container>
                                                <Row>
                                                    <Col md={6} style={{alignContent: "center"}}>
                                                        <strong>{e.name}</strong>
                                                    </Col>
                                                    <Col md={3} style={{alignContent: "center"}}>
                                                        {e.imobiliaria && <> <strong>Imobiliária</strong> {e.imobiliaria}</>}
                                                    </Col>
                                                    <Col md={3} className='text-end' style={{alignContent: "center"}}>
                                                    <Button onClick={(ev)=>{ev.preventDefault(); Navigate(`/corretor/${e.id}`)}}>Ver detalhes</Button>&nbsp;
                                                        <Button onClick={(ev)=>{ev.preventDefault(); if(confirm(`Deseja remover ${e.name}?`)) {removeUser(e.id)}}}>Remover</Button>
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

export default Register;