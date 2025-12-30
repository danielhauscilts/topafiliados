import { Container, Row, Col, Button } from 'react-bootstrap';
import "yet-another-react-lightbox/styles.css";

import './Home.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

const Home = () => {

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
                    <Col xs={9}><input type='text' /></Col>
                </Row>
                <Row>
                    <Col xs={3}>E-mail</Col>
                    <Col xs={9}><input type='text' /></Col>
                </Row>
                <Row>
                    <Col xs={3}>Celular</Col>
                    <Col xs={9}><input type='text' /></Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Button style={{width: '100%'}}>Cadastre-se</Button>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Home;