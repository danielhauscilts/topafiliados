import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "yet-another-react-lightbox/styles.css";

import './Home.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

//images
// import phone from '../assets/phone-image.webp';
import call from '../assets/call.png';

import tutorial_video from "../assets/video/tutorial-video.mp4";

const Home = () => {

    const Navigate = useNavigate();

    return (
        <>
        <div className='home'>
            <Container>
                <Row className='call'>
                    <Col md={6} style={{alignContent: 'center'}}>
                        <p><img src={call} alt="A melhior plataforma para Afiliados Shopee Vídeo" width='100%' /></p>
                        <p className='text-center' style={{marginTop: '1rem'}}><Button onClick={(e)=>{e.preventDefault(); Navigate('/cadastro')}}>Cadastre-se agora!</Button></p>
                    </Col>
                    <Col md={6} className='text-center'>
                        <p style={{fontSize: '1rem'}} className='text-left'>Assista como cadastrar produtos em<br />menos de <strong>1 minuto</strong>.</p>
                        <video height="720" controls style={{border: 'solid 10px #555', borderRadius: '10px'}}>
                            <source src={tutorial_video} type="video/mp4"></source>
                        </video>
                    </Col>
                    <Col md={12}>
                        <h2 style={{marginTop: '1rem'}}>Quem somos?</h2>
                        <p>Nossos consultores buscam diariamente os melhors produtos para postar na Shopee Vídeo para você postar e não se preocupar com edições complexas ou escolha de hashtags, você apenas baixa o vídeo, copia as informações e em 3 passos seu anúncio está pronto, economizando horas do AFILIADO.</p>
                        <h2>Qual nosso diferêncial?</h2>
                        <p>Além de fornecer <strong>VÍDEOS</strong> dos melhores produtos, editados e narrados com forte possibilidade de venda, disponibilizamos <strong>TUTORIAIS</strong> que vão te ajudar a ser um afiliado, cadastrando produtos no seu canal <strong>Shopee Vídeo</strong> em menos de <strong>1 minutos</strong> por produto.</p>
                        <h2>Como funciona?</h2>
                        <ol className='feature-list'>
                            <li><span onClick={(e)=>{e.preventDefault();Navigate('/cadastro')}}>Cadastre-se <strong style={{color: 'orangered'}}>aqui!</strong></span></li>
                            <li><span>Contrate seu plano por R$ 20,00 mensais e pare quando quiser!</span></li>
                            <li><span>Transforme seu canal Shopee Vídeos em uma vitrine de vendas. Nossos consultores experientes publicam produtos diariamente para você anunciar com facilidade, em poucos passos.</span></li>
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