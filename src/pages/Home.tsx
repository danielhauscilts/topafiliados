import { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import env from '../utils/env';

import "yet-another-react-lightbox/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './Home.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

//images
// import phone from '../assets/phone-image.webp';
// import call from '../assets/call.png';
import dep from '../assets/prova.jpg';
import depGaby from '../assets/prova-gaby.jpg';
import seller from '../assets/seller.jpg';

// icons
import { FaArrowRight } from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";

// import tutorial_video from "../assets/video/tutorial-video.mp4";
import achaDani from "../assets/depoimentos/br-11134233-81z1k-mi7tjwlq21vn1a.jpg";
import bia from "../assets/depoimentos/bianca.webp";
import valeria from "../assets/depoimentos/valeria.webp";
import gaby from "../assets/depoimentos/gaby.webp";
import imgBio from "../assets/bio.png";

const Home = () => {

    const Navigate = useNavigate();

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
        <img src={seller} width='100%' alt="Afiliada" />
        <div className='home'>
            <Container>
                <Row className='call'>
                    <Col md={12}>
                        <h3 style={{margin: '0 0 2rem'}}>Poste na Shopee Vídeo, Insta e TikTok, com página de Bio e link rastreável, gastando apenas <span style={{color: 'orangered'}}>10 minutos</span> do seu dia!</h3>
                        <p style={{margin: '2rem 0'}}>
                            <a href="/tutoriais" target='_self' style={{color: '#000', display: 'flex', width: '100%', flexDirection: 'row', backgroundColor: '#ffd000', border: 'solid 5px rgb(255, 243, 163)', boxShadow: '2px 2px 4px rgba(0,0,0,.5)', borderRadius: '10px', padding: '1rem', fontWeight: 'bold'}}>
                                <div style={{fontSize: '3rem', lineHeight: '2.5rem'}}><IoIosVideocam style={{color: '#000'}} /></div>
                                <div style={{textAlign: 'left', paddingLeft: '1rem', fontSize: '1.25rem', lineHeight: '1.5rem'}}>Clique e assista agora como funciona!</div>
                            </a>
                        </p>
                        <p style={{margin: '2rem 0', fontWeight: 'bold'}}>Manha, tarde ou noite, postar 2, 3 ou 10 produtos, você adapta à sua possibilidade.</p>
                        <p className='text-center' style={{marginTop: '1rem', marginBottom: '2rem'}}>
                            <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('quero_fazer_parte', 'home');location.href = '#plains'}}>Otimize seu tempo <FaArrowRight style={{color: '#ea580c'}} /></Button>
                        </p>
                        <ul style={{margin: '1rem 0 0', padding:'0 2rem', color: '#000', textAlign: 'left'}}>
                            <li style={{marginBottom: '1rem'}}>Poste nossos vídeos na Shopee Vídeo</li>
                            <li style={{marginBottom: '1rem'}}>Inclua os produtos que quiser em seu Site personalizado, criado na plataforma</li>
                            <li style={{marginBottom: '1rem'}}>Gere links rastreáveis e poste em suas Redes Sociais</li>
                            <li style={{marginBottom: '1rem'}}>
                                <p>Sabe aquele amigo que gostou de um produto? Copie o link gerado e mande para ele também, assim você também ganha!</p>
                            </li>
                        </ul>
                        <p style={{marginBottom: '2rem'}}><strong>Você ganha sempre!</strong></p>
                    </Col>
                </Row>
            </Container>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div className='plains'>
                                <h1 id='plains' style={{ width: '100%', margin: '0 0 1rem', color: '#000', fontWeight: 'bold', fontSize: '1.5rem', paddingTop: '0'}}>Planos</h1>
                                <div className='price one' style={{marginBottom: '0'}}>
                                    <p style={{alignContent: 'start', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '2rem', color: 'rgb(97, 160, 255)', marginBottom: '0'}}>Acesso mensal</p>
                                    <p style={{fontSize: '1.25rem', fontWeight: 'bold'}}>R$ 29<small>,90</small></p>
                                    <p><Button onClick={()=>{access('plain20', 'home'); Navigate('/plano/20')}} style={{backgroundColor: 'orangered', borderColor: 'orangered', fontSize: '1rem'}}>Contratar <FaArrowRight style={{color:"#FFF"}} /></Button></p>
                                </div>
                                <p style={{margin: '1rem 0', fontSize: '1.5rem'}}>ou</p>
                                <div className='price two'>
                                    <p style={{alignContent: 'start', textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', lineHeight: '2rem', color: 'rgb(255, 174, 43)', marginBottom: '0'}}>Acesso anual</p>
                                    <p style={{fontSize: '1.25rem', fontWeight: 'bold'}}>R$ 197<small>,90 (45% off)</small></p>
                                    <p><Button onClick={()=>{access('plain120', 'home'); Navigate('/plano/120')}} style={{backgroundColor: 'orangered', borderColor: 'orangered', fontSize: '1rem'}}>Contratar <FaArrowRight style={{color:"#FFF"}} /></Button></p>
                                    <div className='melhor'>melhor escolha</div>
                                </div>
                            </div>
                            <p>
                                <ul style={{margin: '2rem 0', padding:'0 2rem', color: '#000', textAlign: 'left'}}>
                                    <li>Produtos novos todos os dias</li>
                                    <li>Acesso imediato</li>
                                    <li>Página personalizada para link na Bio</li>
                                    <li>Gerador de Link rastreavel de 7 dias</li>
                                    <li>Renove quando quiser</li>
                                    <li>Suporte dedicado por whatsapp</li>
                                    <li>Navegue por categorias</li>
                                    <li>Marque os produtos já postados</li>
                                </ul>
                            </p>
                            <p style={{backgroundColor: '#ff8400', textAlign: 'center', color: '#FFF', margin: '0 0 2rem', padding: '.5rem 1rem', borderRadius: '5px', border: 'solid 3px darkyellow', fontSize: '1rem', lineHeight: '1.25rem', boxShadow: '1px 1px 3px rgba(0,0,0,.5)'}}><strong>Garantia de 7 dias</strong><br />Se náo se adaptar, devolvemos<br />seu dinheiro!</p>
                        </Col>
                    </Row>
                </Container>
            </div>  
            <Container>
                <Row>
                    <Col>
                        <div className='depoimments'>
                            <div><p><strong>Veja abaixo, depoimentos de quem já utiliza a plataforma.</strong></p></div>
                            <div className='dp-item'>
                                <img src={gaby} alt="Caixinha de Ofertas" onClick={()=>{window.open('https://shopee.com.br/gabyggaspar', '_blank')}} />
                                <p>Me chamo Gabriela e depois de ter tentando de tudo, desde doces no iFood, até decorações em crochê, representar produtos na Shopee foi o que me trouxe mais retorno, sou mãe e só posto quando não estou atarefada com meus filhos.</p>
                                <div style={{marginBottom: '1rem', color: 'orangered'}}><strong>Comissões mensais</strong></div>
                                <div><img src={depGaby} alt="Vendas" width="100%" /></div>
                            </div>
                            <div className='dp-item'>
                                <img src={achaDani} alt="AchaDANI" onClick={()=>{window.open('https://shopee.com.br/danielpintcsherbatista', '_blank')}} />
                                <p>
                                    Sou Daniel e precisava de uma renda extra, mas trabalho o dia todo, por isso posto produtos somente à noite.
                                </p>
                                <div style={{marginBottom: '1rem', color: 'orangered'}}><strong>Comissões da semana</strong></div>
                                <div><img src={dep} alt="Vendas" width="100%" /></div>
                            </div>
                            <div className='dp-item'>
                                <img src={bia} alt="Bianca" onClick={()=>{window.open('https://shopee.com.br/bianca.cozzati', '_blank')}} />
                                <p>Já era afiliada e quase desisti por gastar muito tempo e ter baixas comissões, agora levo 10 minutos para postar 10 vídeos, continuei e estou vendendo.</p>
                            </div>
                            <div className='dp-item'>
                                <img src={valeria} alt="Valéria" onClick={()=>{window.open('https://shopee.com.br/valeriarabello', '_blank')}} />
                                <p>Me chamo Valéria e gerencio 3 contas na Shopee após meu marido perder o emprego, gasto 1 hora para postar vídeos em todas e sustento minha casa com comissões.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>          
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div className='benefits'>
                                <p><span>+</span>de <strong>130</strong> produtos ativos agora.</p>
                                <p><span>+</span>de <strong>300</strong> vídeos cadastrados esse ano.</p>
                            </div>
                            <p className='text-center' style={{marginTop: '2rem', marginBottom: '2rem'}}>
                                <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('btn3', 'home');location.href = '#plains'}}>Contrate agora mesmo <FaArrowRight /></Button>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div id='bio' className='bio' style={{marginBottom: '0', padding: ' 0 0 2rem'}}>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{color: "#000", marginBottom: '1rem', fontWeight: 'bold', fontSize: '2rem', lineHeight: '2.25rem'}}>Página da Bio!</h1>
                            <p>Somente na AfiliPRO, você cria uma página própria com os produtos de nosso catálogo já com Links rastreáveis para você divulgar nas suas redes sociais.</p>
                            <p><strong>Veja o exemplo:</strong><br /><a href="https://afilipro.com.br/b/sualoja" target='_blank'>https://afilipro.com.br/b/sualoja</a></p>
                            <p style={{padding: '1rem'}}>
                                <img src={imgBio} alt="Bio" width="100%" style={{border: 'solid 1px #999', boxShadow: '0px 2px 5px rgba(0,0,0,.2)'}} />
                            </p>
                            <p className='text-center' style={{marginTop: '1rem', marginBottom: '1rem'}}>
                                <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('nao_deixe_amanha', 'home'); location.href = '#plains'}}>Não deixe para amanhã <FaArrowRight style={{color: '#ea580c'}} /></Button>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{padding: '0 0 2rem'}}>
                <Container>
                    <Row>
                        <Col>
                            <strong style={{fontSize: '2rem', lineHeight: '2rem', color: '#000'}}>Quanto você gastaria<br />sem AfiliPRO?</strong>
                            <table style={{textAlign: 'left', margin: '2rem 0'}} width="100%">
                                <tr>
                                    <td>Pack de Vídeos Validados</td>
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
                            <p><strong style={{fontSize: '1.5rem', color: '#000'}}>Total: + de R$ 12.400,00 /ano</strong></p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        </>
    )
}

export default Home;