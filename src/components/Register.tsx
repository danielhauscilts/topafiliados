import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

import env from '../utils/env';

import './Register.scss';

//icon
import { FaEye } from "react-icons/fa";

function Register() {

    const [name, setName] = useState<any>(null);
    const [mail, setMail] = useState<any>(null);
    const [phone, setPhone] = useState<any>(null);
    const [password, setPassword] = useState<any>(null);
    const [confPassword, setConfPassword] = useState<any>(null);
    const [error, setError] = useState<any>(null);

     const showPassword = (e:any) => {
        const attr = document.getElementById(e)?.getAttribute('type');

        if(attr=='password') {
            document.getElementById(e)?.setAttribute('type', 'text');
        } else {
            document.getElementById(e)?.setAttribute('type', 'password');
        }
    }

    const register = () => {

        if (password !== confPassword) {
            alert('As senhas não conferem!');
            return;
        }

        let cleanPhone = '';
        
        if (phone.indexOf('55') === -1) {
            cleanPhone = '55' + phone.replace(/\D/g, '');
        } else {
            cleanPhone = phone.replace(/\D/g, '');
        }

        axios.post(`${env}/api/user`,
            {
                'name': name,
                'mail': mail,
                'phone': cleanPhone,
                'password': password
            }
        ).then(()=>{
            alert('Usuário cadastrado com sucesso, realize seu login!');
            document.getElementById('login')?.click();
        }).catch((err)=>{
            setError(err.response.data.error);

            setTimeout(()=>{
                setError(null);
            }, 5000)
        })
    }

    return (
        <div className='Register'>
            <Container className='home-register'>
                <Row>
                    <Col>
                        <h1>Cadastre-se</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>Nome</Col>
                    <Col xs={9}>
                        <input 
                            type='text' 
                            id='name'
                            placeholder='Nome'
                            onChange={(e)=>{setName(e.target.value)}} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>E-mail</Col>
                    <Col xs={9}>
                        <input 
                            type='text' 
                            id='mail'
                            placeholder='seu@email.com'
                            onChange={(e)=>{setMail(e.target.value)}} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>Celular</Col>
                    <Col xs={9}>
                        <input 
                            type='text' 
                            id='phone'
                            placeholder='(**) 9****-****'
                            onChange={(e)=>{setPhone(e.target.value)}} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>Senha</Col>
                    <Col xs={9} className='password-field'>
                        <input 
                            type='password' 
                            id='password'
                            placeholder='******'
                            onChange={(e)=>{setPassword(e.target.value)}} />
                            <FaEye onClick={()=>{showPassword('password')}} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>Confirme a Senha</Col>
                    <Col xs={9} className='password-field'>
                        <input 
                            type='password' 
                            id='confPassword'
                            placeholder='******'
                            onChange={(e)=>{setConfPassword(e.target.value)}} />
                            <FaEye  onClick={()=>{showPassword('confPassword')}} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Button style={{width: '100%'}} onClick={(e)=>{e.preventDefault(); register()}}>Cadastre-se</Button>
                    </Col>
                </Row>
                {error && (
                    <Row className='error'><Col>{error}</Col></Row>
                )}
            </Container>
        </div>
    )
}

export default Register;