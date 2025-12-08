import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import env from '../utils/env';

import './Admin.scss';

const Admin = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [users, setUsers] = useState([]);

    const register = () => {

        axios.post(`${env}api/user`,
            {
                name: name,
                phone: phone.replace(/\D/g, ""),
                type: 'adm',
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
        axios.get(`${env}api/admin`)
            .then((e)=>{
                setUsers(e.data);
            }).catch((err)=>{
                setUsers([]);
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
    }, []);

    return (
        <div className='admin'>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3>Cadastrar administrador</h3>
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
                                    <Col md={12} className='text-end'>
                                        <Button onClick={(e)=>{e.preventDefault(); register(); }}>Cadastrar</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    {users?.length > 0 &&
                        <Col md={12} className='user-list'>
                            <h3>Administradores</h3>
                            <ul>
                                {
                                    users.map((e:any, i) => (
                                        <li key={i} className='glass-box'>
                                            <Container>
                                                <Row>
                                                    <Col md={5} style={{alignContent: "center"}}><strong>{e.name}</strong></Col>
                                                    <Col md={5} style={{alignContent: "center"}}><strong>Telefone: </strong>{e.phone}</Col>
                                                    <Col md={2} style={{alignContent: "center"}} className='text-end'>
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

export default Admin;