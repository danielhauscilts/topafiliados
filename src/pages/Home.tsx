import { Container, Row, Col } from 'react-bootstrap';
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
                        <h1>Como funciona?</h1>
                        <ol>
                            <li>Cadastre-se</li>
                            <li>Faça sua assinatura</li>
                            <li>Escolha entre diversos produtos cadastrados</li>
                            <li>Poste em seu Shopee Vídeo</li>
                            <li>Fature $$$$$</li>
                        </ol>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Home;