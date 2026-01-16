import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import './Users.scss';

import env from '../utils/env';

const Users = () => {

    const [users, setUsers] = useState<any[]>([]);

    const setStatus = (st:any) => {
        
        let status = '';

        switch(st) {
            case 'a':
                status = 'Administrador';
                break;
            case 'u':
                status = 'Usuário';
                break;
            case 'p':
                status = 'Pendente';
                break;
        }

        return status;
    }

    useEffect(()=>{
        axios.get(`${env}/api/users`,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            }
        )
        .then((e)=>{
            setUsers(e.data);
        }).catch(()=>{
            setUsers([]);
        })
    }, []);

    return (
        <>
        <div className='content count'>
            <Container>
                <Row>
                    <Col><h1>Usuários</h1></Col>
                </Row>
            </Container>
            <Container>
                {users && users.length > 0 && users.map((e, i) => (
                    <Row key={i} style={{borderBottom: 'solid 1px #CCC', margin: '.5rem .25rem', padding: '0 0 .5rem'}}>
                        <Col xs={12} sm={6} md={6} lg={3}><strong>{e.name}</strong></Col>
                        <Col xs={12} sm={6} md={6} lg={3}>{e.mail}</Col>
                        <Col xs={12} sm={4} md={4} lg={2}>{e.phone}</Col>
                        <Col xs={12} sm={4} md={4} lg={2}>{e.date.split('-')[2]}/{e.date.split('-')[1]}/{e.date.split('-')[0]}</Col>
                        <Col xs={12} sm={4} md={4} lg={2}>{setStatus(e.type)}</Col>
                    </Row>
                ))}
            </Container>
        </div>
        </>
    )
}

export default Users;