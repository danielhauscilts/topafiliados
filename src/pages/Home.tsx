import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "yet-another-react-lightbox/styles.css";

import './Home.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

//images
// import phone from '../assets/phone-image.webp';
import call from '../assets/call.png';
import whats from '../assets/whats.png';

import tutorial_video from "../assets/video/tutorial-video.mp4";

const Home = () => {

    const Navigate = useNavigate();

    return (
        <>
        <div className='home'>
            <Container>
                <Row className='call'>
                    <Col md={6} style={{alignContent: 'center'}}>
                        <p><img src={call} alt="A melhor plataforma para Afiliados Shopee Vídeo" width='100%' /></p>
                        <p className='text-center' style={{marginTop: '1rem'}}><Button onClick={(e)=>{e.preventDefault(); Navigate('/cadastro')}}>Cadastre-se agora!</Button></p>
                        <p style={{margin: '2rem 0'}}><img src={whats} alt="Tire suas dúvidas!" width='100%' /></p>
                    </Col>
                    <Col md={6} className='text-center'>
                        <p style={{fontSize: '1rem'}} className='text-left'>Assista como cadastrar produtos em<br />menos de <strong>1 minuto</strong> com <strong>AfiliPRO</strong>.</p>
                        <video height="720" controls style={{border: 'solid 10px #555', borderRadius: '10px'}}>
                            <source src={tutorial_video} type="video/mp4"></source>
                        </video>
                    </Col>
                    <Col md={12}>
                        <h2 style={{marginTop: '1rem'}}>Quem somos?</h2>
                        <p>Economize horas do seu dia, contando com nossos <strong>consultores especialistas</strong> que buscam diariamente os melhores produtos para você postar na <strong>Shopee Vídeo</strong> e não se preocupar com edições complexas ou escolha de hashtags, tudo para que <strong>você</strong> copie as informações e em poucos passos ter seu anúncio publicado!</p>
                        <h2>Qual nosso diferêncial?</h2>
                        <p>Packs de milhares de produtos perdem sua validade de venda em poucos dias, assim nossas indicações estão sempre fresquinhas, seguido o método de ondas, isso significa, produtos que estão se destacando mas com poucos Afiliados, colocando você na frente!</p>
                        <p><strong>Te auxiliamos de A a Z para transformar seu canal Shopee Vídeo em uma vitrine de vendas</strong></p>
                        <h2>Como funciona?</h2>
                        <ol className='feature-list'>
                            <li><span onClick={(e)=>{e.preventDefault();Navigate('/cadastro')}}>Cadastre-se <strong style={{color: 'orangered'}}>aqui!</strong></span></li>
                            <li><span>Contrate seu plano por R$ 20,00 para usar a plataforma por 30 dias, depois renove se quiser!</span></li>
                            <li><span>Nossos consultores experientes publicam produtos diariamente para você anunciar com facilidade, em poucos passos.</span></li>
                            <li><span>Acompanhe a performance de suas vendas na sua central de Afiliados</span></li>
                        </ol>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Home;