import { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

import env from '../utils/env';

import "yet-another-react-lightbox/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './Home.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

//images
import depGaby from '../assets/prova-gaby.jpg';
import imgInstagram from '../assets/icons/instagram.png';
import imgShopee from '../assets/icons/shopee.png';
import imgTiktok from '../assets/icons/tiktok.png';
import imgCovers from '../assets/covers.jpg';

// icons
import { FaArrowRight } from "react-icons/fa";

import gaby from "../assets/depoimentos/gaby.webp";
import imgBio from "../assets/bio.png";

import Register from '../components/Register';

const Home = () => {

    const access = (btn:any, pg:any) => {

        axios.post(`${env}/api/access`, {
            button: btn,
            page: pg
        }).then(()=>{

        })
    }

    useEffect(()=>{
        access('acesso_home', 'home');
    }, []);

    return (
        <>
        <div className='home'>
            <Container>
                <Row>
                    <Col xs={12}>
                        <h3 style={{textAlign: 'center', margin: '1rem 0 0', fontSize: '1.5rem', color: 'orangered'}}>PACK DE VÍDEOS INTERATIVO</h3>
                        <h3 style={{textAlign: 'center', margin: '0 0 1rem', fontSize: '1.5rem'}}>Plataforma <span style={{fontWeight: 'bold', color: '#ED1E79'}}>+</span> Telegram</h3>
                        <p style={{textAlign: 'center', margin: '0 0 1rem'}}>+ de <span style={{color: 'orangered'}}>2.500 vídeos</span> como estes no ano</p>
                        <p style={{textAlign: 'center', margin: '0 0 2rem'}}><a href='/tutoriais' target='_self'>Assista aqui um video da plataforma</a></p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <img src={imgCovers} width='100%' alt="Afiliada" style={{marginBottom: '2rem'}} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <p><center><strong>Vídeos virais editados nas principais tendências das Mídias Sociais</strong></center></p>
                        <p style={{marginBottom: '0'}}>
                            <ul className='list-mais'>
                                <li><span>+</span> Seus links já rastreados em seu ID Shopee;</li>
                                <li><span>+</span> Site personalizado pela plataforma</li>
                                <li><span>+</span> Hashtags para postar na Shopee Vídeos</li>
                                <li><span>+</span> Faça tudo em um único lugar</li>
                                <li><span>+</span> Validamos links para não ser banido</li>
                            </ul>
                        </p>
                    </Col>
                </Row>
                <Row style={{textAlign: 'center'}}>
                    <Col xs={4}>
                        <img height={60} src={imgInstagram} alt="Instagram" />
                    </Col>
                    <Col xs={4}>
                        <img height={60}src={imgTiktok} alt="Tiktok" />
                    </Col>
                    <Col xs={4}>
                        <img height={60} src={imgShopee} alt="Shopee" />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className='call'>
                    <Col md={12}>
                        <p style={{marginTop: '2rem'}}>Além do <strong style={{color: '#ED1E79'}}>PACK</strong>, a plataforma converte os <strong style={{color: 'orangered'}}>links rastreados</strong> dos produtos já com seu ID Shopee e um <strong style={{color: 'orangered'}}>site personalizado</strong> com seu nome e link para seu <strong>Grupo de Whatsapp</strong>!</p>
                    </Col>
                </Row>
            </Container>
            <Register />
            <Container>
                <Row>
                    <Col>
                        <div className='depoimments'>
                            <p style={{marginBottom: '2rem'}}><strong>Veja abaixo, depoimentos de quem já utiliza a plataforma.</strong></p>
                            <div className='dp-item'>
                                <img src={gaby} alt="Caixinha de Ofertas" onClick={()=>{window.open('https://shopee.com.br/gabyggaspar', '_blank')}} />
                                <p>Atingi esse resultado e diminui meu tempo de postagem usando este Pack Interativo</p>
                                <div style={{marginBottom: '1rem', color: 'orangered'}}><strong>Comissões mensais</strong></div>
                                <div><img src={depGaby} alt="Vendas" width="100%" /></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <p className='text-center' style={{marginTop: '2rem', marginBottom: '2rem'}}>
                            <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('btn3', 'home');location.href = '#plains'}}>Contrate agora mesmo <FaArrowRight /></Button>
                        </p>
                    </Col>
                </Row>
            </Container>
            <div id='bio' className='bio' style={{marginBottom: '0', padding: ' 0 0 2rem'}}>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{color: "#000", marginBottom: '1rem', fontWeight: 'bold', fontSize: '2rem', lineHeight: '2.25rem'}}>Página personalizada!</h1>
                            <p>Tenha os melhores vídeos virais e ainda uma página como esta!</p>
                            <p><strong>Veja o exemplo:</strong><br /><a href="https://link-sqb.shop/b/Storiesquebombam" target='_blank'>https://link-sqb.shop/b/Storiesquebombam</a></p>
                            <p style={{padding: '1rem 0'}}>
                                <img src={imgBio} alt="Bio" width="100%" style={{border: 'solid 1px #999', boxShadow: '0px 2px 5px rgba(0,0,0,.2)', borderRadius: '10px'}} />
                            </p>
                            <p className='text-center' style={{marginTop: '1rem', marginBottom: '1rem'}}>
                                <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('nao_deixe_amanha', 'home'); location.href = '#plains'}}>Comece agora mesmo <FaArrowRight style={{color: '#ea580c'}} /></Button>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{padding: '0 2rem 2rem'}}>
                <Container>
                    <Row>
                        <Col>
                            <strong style={{fontSize: '2rem', lineHeight: '2rem', color: '#000'}}>Quanto você gastaria sem Stories que bombam?</strong>
                            <table style={{textAlign: 'left', margin: '2rem 0'}} width="100%">
                                <tr>
                                    <td>Pack de Vídeos</td>
                                    <td width="40%">R$ 40,00/ano</td>
                                </tr>
                                <tr>
                                    <td>Edição dos vídeos</td>
                                    <td>R$ 1000,00/mês</td>
                                </tr>
                                <tr>
                                    <td>Hospedagem de site</td>
                                    <td>R$ 200,00/ano</td>
                                </tr>
                                <tr>
                                    <td>Curso de Afiliado</td>
                                    <td>R$ 160,00/ano</td>
                                </tr>
                                <tr>
                                    <td>Linktr.ee</td>
                                    <td>R$ 46,00/mês</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>R$ 384,00/ano</td>
                                </tr>
                            </table>
                            <p><strong style={{fontSize: '1.5rem', color: '#000'}}>Total: + R$ 12.400,00/ano</strong></p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        </>
    )
}

export default Home;