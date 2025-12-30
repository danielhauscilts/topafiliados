import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import "yet-another-react-lightbox/styles.css";

import env from '../utils/env';

import './Home.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

const Home = () => {

    const [name, setName] = useState<any>(null);
    const [mail, setMail] = useState<any>(null);
    const [phone, setPhone] = useState<any>(null);
    const [password, setPassword] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const register = () => {
        axios.post(`${env}/api/user`,
            {
                'name': name,
                'mail': mail,
                'phone': phone,
                'password': password
            }
        ).then((e)=>{
            console.log(e);
        }).catch((err)=>{
            setError(err.response.data.error);

            setTimeout(()=>{
                setError(null);
            }, 5000)
        })
    }

    return (
        <>
        <div className='home'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list'>
                        <h1>Cansou do Telegram?</h1>
                        <h3>Aqui é mais fácil!</h3>
                        <p>Produtos categorizados, disponíveis sempre, com filtro e criação de listas</p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={12}>
                        <h1>Veja como funciona!</h1>
                        <ol>
                            <li>Cadastre-se</li>
                            <li>Escolha sua assinatura!</li>
                            <li>Esolha entre diversos produtos já cadastrados ou novos diariamente</li>
                            <li>Poste em seu Shopee Vídeo</li>
                            <li>Simples assim!</li>
                        </ol>
                    </Col>
                </Row>
            </Container>
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
                            onChange={(e)=>{setName(e.target.value)}} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>E-mail</Col>
                    <Col xs={9}>
                        <input 
                            type='text' 
                            id='mail'
                            onChange={(e)=>{setMail(e.target.value)}} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>Celular</Col>
                    <Col xs={9}>
                        <input 
                            type='text' 
                            id='phone'
                            onChange={(e)=>{setPhone(e.target.value)}} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>Senha</Col>
                    <Col xs={9}>
                        <input 
                            type='password' 
                            id='password'
                            onChange={(e)=>{setPassword(e.target.value)}} />
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
        </>
    )
}

export default Home;