import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "yet-another-react-lightbox/styles.css";

import './Home.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

const Home = () => {

    const Navigate = useNavigate();

    return (
        <>
        <div className='home'>
            <Container>
                <Row className='call'>
                    <Col md={12}>
                        <h1>A melhor plataforma para afiliados Shopee vídeos que você já viu!</h1>
                    </Col>
                    <Col md={12}>
                        <p className='text-center' style={{marginTop: '1rem'}}><Button onClick={(e)=>{e.preventDefault(); Navigate('/cadastro')}}>Cadastre-se agora!</Button></p>
                        <p className='text-center' style={{marginBottom: '2rem'}}><strong>Por apenas R$ 20,00/mês!</strong></p>
                    </Col>
                    <Col md={12}>
                        <p style={{textAlign: 'center', margin: '0 0 2rem', fontSize: '1.25rem', backgroundColor: 'yellow', padding: '1rem', borderRadius: '10px', lineHeight: '1.5rem', boxShadow: '1px 2px 2px rgba(0,0,0,.5)'}}><strong>Faça parte de milhares de Afiliados que faturam mais de R$ 2.000,00 por mês, trabalhando de onde quiser e nos horários que quiser.</strong></p>
                    </Col>
                    <Col md={6}>
                        <h2>Quem somos?</h2>
                        <p>Uma plataforma que disponibiliza diariamente packs de vídeos de alta qualidade de produtos da Shopee, com links e #hashtags, organizados por categoria, facilitando e fortalecendo seu aparecimento nas buscas por produtos.</p>
                        <h2>Qual nosso diferêncial?</h2>
                        <p>Além de fornecer <strong>PACKS DE VÍDEOS</strong> e <strong>TUTORIAIS</strong> que vão te ajudar a faturar, oferecemos a forma mais simples e organizada de buscar vídeos de produtos para sua gestão. Diferente dos grupos de mensagens, onde a busca por produtos e os métodos de cópia são complexos e burocráticos.</p>
                    </Col>
                    <Col md={6}>
                        <h2>Como funciona?</h2>
                        <ol className='feature-list'>
                            <li><span onClick={(e)=>{e.preventDefault();Navigate('/cadastro')}}>Cadastre-se aqui!</span></li>
                            <li><span>Contrate seu plano por R$ 20,00 mensais e pare quando quiser!</span></li>
                            <li><span>Acesse a área de produtos, filtrando por categorias ou liste os produtos diários e siga o tutorial de postagem na Shopee Vídeo.</span></li>
                            <li><span>Acompanhe na sua central de Afiliados a performance de suas campanhas</span></li>
                            <li><span>Fature alto como diversos Afiliados!</span></li>
                        </ol>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Home;