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
import tutorial_video from '../assets/video.mp4';
import tutorial_video_cover from '../assets/video.jpg';

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
                        <h3 style={{textAlign: 'center', margin: '1rem 0 2rem', fontSize: '2.25rem', color: 'orangered', fontWeight: 'bold'}}>SEJA UM AFILIADO<br />DE SUCESSO A PARTIR DE HOJE!</h3>
                        <p style={{textAlign: 'center', fontSize: '1.5rem', lineHeight: '2.25rem', marginBottom: '2rem', backgroundColor: '#ededed', borderRadius: '10px', padding: '1rem 0'}}>
                            <strong style={{fontSize: '1.5rem'}}>1 ano de acesso</strong><br />
                            <span style={{color: '#999'}}>de R$ 159,90</span><br />
                            <strong style={{fontSize: '2.5rem', color: 'orangered'}}>⭐por R$ 29,90⭐</strong><br />
                            <small>promoção válida até 01/04</small>
                        </p>
                        <p>
                            <a href="#know" style={{color: '#000', fontWeight: 'bold', fontSize: '1.25rem'}}>👉 Conheça mais sobre a solução!</a>
                        </p>
                        <div id="plains">
                            <Register />
                        </div>
                        <h3 style={{textAlign: 'center', margin: '1rem 0 2rem', fontSize: '1.25rem'}}><strong>Instagram <span style={{fontWeight: 'bold', color: 'orangered'}}>+</span> Shopee Vídeo <span style={{fontWeight: 'bold', color: 'orangered'}}>+</span> Tiktok</strong></h3>
                        <h3 style={{textAlign: 'center', margin: '1rem 0 1rem', fontSize: '1.5rem', backgroundColor: '#ededed', padding: '.5rem 0', borderRadius: '10px'}}><span style={{fontWeight: 'bold', color: '#ED1E79'}}>👉</span> Pack de Vídeos Virais</h3>
                        <h3 style={{textAlign: 'center', margin: '1rem 0 1rem', fontSize: '1.5rem', backgroundColor: '#ededed', padding: '.5rem 0', borderRadius: '10px'}}><span style={{fontWeight: 'bold', color: '#ED1E79'}}>👉</span> Gerador de Link Comissionado</h3>
                        <h3 style={{textAlign: 'center', margin: '1rem 0 1rem', fontSize: '1.5rem', backgroundColor: '#ededed', padding: '.5rem 0', borderRadius: '10px'}}><a href="https://link-sqb.shop/b/Storiesquebombam" target='_blank'>🔗 Seu Site Personalizado<br />
                        <small style={{fontSize: '1rem'}}>[clique aqui para ver]</small></a></h3>
                        <h3 style={{textAlign: 'center', margin: '1rem 0 1rem', fontSize: '1.5rem', backgroundColor: 'green', color: '#FFF', padding: '.5rem 0', borderRadius: '10px'}}><span style={{fontWeight: 'bold', color: '#ED1E79'}}>👉</span> Link para Grupo do Whatsapp</h3>
                        <p style={{textAlign: 'center', fontSize: '1.25rem', margin: '2rem 0 0rem', fontWeight: 'bold'}} id='know'>Conheça nossa plataforma e promova + de <span style={{color: 'orangered'}}>2.500 produtos</span> como estes no ano</p>
                        <p style={{fontSize: '2rem'}}>👇</p>
                        <video width="100%" controls={true} autoPlay={false} style={{border: 'solid 2px #999', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,.2)'}} poster={tutorial_video_cover}>
                            <source src={tutorial_video} type="video/mp4"></source>
                        </video>
                        <p className='text-center' style={{marginTop: '1rem', marginBottom: '2rem'}}>
                            <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('comece_agora_mesmo', 'home');location.href = '#plains'}}>Comece agora mesmo <FaArrowRight /></Button>
                        </p>
                        <div style={{backgroundColor: 'yellow', padding: '1rem', borderRadius: '10px', margin: '2rem 0'}}>
                            <p style={{fontSize: '1.5rem', margin: '0 0 1rem', color: 'orangered'}}><strong>Cansado de ser BANIDO?</strong></p>
                            <p style={{margin: '1rem 0'}}><strong>Packs convencionais</strong>, podem te <span style={{color: 'red', textDecoration: 'line-through'}}>BANIR DA PLATAFORMA</span> quando os produtos não condizem com o link, por isso nosso vídeos diários são fiéis aos produtos que representam e removidos do catálogo quando não possuem mais estoque!</p>
                        </div>
                        <p style={{margin: '2rem 0', fontSize: '1.5rem'}}><center><strong><span style={{color: 'orangered'}}>Vídeos virais</span> editados nas principais tendências das Mídias Sociais</strong></center></p>
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
                <Row style={{textAlign: 'center', margin: '1rem 0 2rem'}}>
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
                <Row>
                    <Col>
                        <p className='text-center' style={{marginTop: '1rem', marginBottom: '1rem'}}>
                            <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('libere_seu_acesso', 'home');location.href = '#plains'}}>Libere seu acesso agora <FaArrowRight /></Button>
                        </p>
                    </Col>
                </Row>
            </Container>
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
            <div id='bio' className='bio' style={{marginBottom: '0', padding: '2rem 0 2rem'}}>
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