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
import whats from '../assets/whats.png';

// icons
import { FaArrowRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

// import tutorial_video from "../assets/video/tutorial-video.mp4";
import gifVideos from "../assets/produtos.gif";
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

    return (
        <>
        <div className='home'>
            <Container>
                <Row className='call'>
                    <Col md={12}>
                        <p style={{alignContent: 'start', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', lineHeight: '2.25rem'}}>
                            Se você chegou até aqui veja como podemos te <span className='gradient-text'>AJUDAR</span>!
                        </p>
                        <h3 style={{margin: '2rem 0'}}>Nocê não precisa aparecer, apenas executará passos simples gastando <span style={{color: 'orangered'}}>10 minutos</span> do seu dia!</h3>
                        <p style={{backgroundColor: '#fff6c4', border: 'solid 2px #ffe499', padding: '1rem', borderRadius: '5px'}}>Nossa plataforma disponibiliza toda estrutura necessária para representar alguns produtos, onde, você recebrá uma comissões ilimitadas pela venda, são diversos produtos em nosso catalogo, onde você cadastrará em sua Shopee Vídeo e acompanhar suas vendas. <br /><strong>SIMPLES ASSIM!</strong></p>
                        <p style={{margin: '2rem 0'}}>
                            <a href="/tutoriais" style={{display: 'block', backgroundColor: '#ededed', borderRadius: '10px', padding: '1rem', fontWeight: 'bold'}}>Veja um vídeo explicativo<br />e faça um exercício</a>
                        </p>
                        <p style={{margin: '2rem 0'}}>Manha, tarde ou noite, postar 2, 3 ou 10 produtos, você adapta à sua possibilidade, quanto mais constante maiores comissões.</p>
                        <p className='text-center' style={{marginTop: '1rem', marginBottom: '2rem'}}>
                            <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('quero_fazer_parte', 'home');location.href = '#plains'}}>Quero fazer parte <FaArrowRight style={{color: '#ea580c'}} /></Button>
                        </p>
                        <p style={{margin: '3rem 0 2rem'}}>
                            <a href="https://wa.me/5511937751045" target='_blank'><img src={whats} width='100%' alt="Whatsapp" /></a>
                        </p>
                        <p><strong>Veja abaixo depoimentos de quem já utiliza a plataforma.</strong></p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <div className='depoimments'>
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
            <div style={{backgroundColor: '#FFF'}}>
                <Container>
                    <Row>
                        <Col>
                            <h1 id='plains' style={{margin: '0 0 2rem', color: '#000', fontWeight: 'bold', fontSize: '1.5rem'}}>Se não tem mais dúvidas, vamos ao seu acesso!</h1>
                            <div className='plains'>
                                <div className='price one'>
                                    <p style={{alignContent: 'start', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '2rem', color: 'rgb(97, 160, 255)', marginBottom: '0'}}>Acesso mensal</p>
                                    <p style={{fontSize: '1.5rem', fontWeight: 'bold'}}>R$ 29<small>,90</small></p>
                                    <p><Button onClick={()=>{access('plain20', 'home'); Navigate('/plano/20')}} style={{backgroundColor: 'orangered', borderColor: 'orangered', fontSize: '1rem'}}>Contratar <FaArrowRight style={{color:"#FFF"}} /></Button></p>
                                </div>
                                <div className='price two'>
                                    <p style={{alignContent: 'start', textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', lineHeight: '2rem', color: 'rgb(255, 174, 43)', marginBottom: '0'}}>Acesso anual</p>
                                    <p style={{fontSize: '1.5rem', fontWeight: 'bold'}}>R$ 197<small>,90</small></p>
                                    <p><Button onClick={()=>{access('plain120', 'home'); Navigate('/plano/120')}} style={{backgroundColor: 'orangered', borderColor: 'orangered', fontSize: '1rem'}}>Contratar <FaArrowRight style={{color:"#FFF"}} /></Button></p>
                                </div>
                            </div>
                            <p style={{backgroundColor: '#ff8400', textAlign: 'center', color: '#FFF', margin: '0 0 2rem', padding: '.5rem 1rem', borderRadius: '5px', border: 'solid 3px darkyellow', fontSize: '1rem', lineHeight: '1.25rem', boxShadow: '1px 1px 3px rgba(0,0,0,.5)'}}><strong>Garantia</strong><br />Usou por 7 dias e não gostou?<br /> Devolvemos seu dinheiro!</p>
                            <p>
                                <ul style={{margin: '1rem 0 2rem', padding:'0 2rem', color: '#000', textAlign: 'left'}}>
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
                            <div style={{textAlign: 'left', margin: '0 0 2rem', color: '#000', padding: '0 1rem'}}>
                                <strong style={{display: 'block', marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center', borderRadius: '10px', backgroundColor: '#fffac7', padding: '1rem'}}>A plataforma mais barata do mercado</strong>
                                <strong style={{display: 'block', marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center', borderRadius: '10px', backgroundColor: '#fffac7', padding: '1rem'}}>Mais fácil de utilizar</strong>
                                <strong style={{display: 'block', marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center', borderRadius: '10px', backgroundColor: '#fffac7', padding: '1rem'}}>Maior número de ferramentas para você!</strong>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>            
            <div style={{backgroundColor: '#FFF'}}>
                <Container>
                    <Row>
                        <Col>
                            <p style={{fontSize: '1rem', color: '#000', marginTop: '2rem'}}><strong style={{fontSize: '2rem', lineHeight: '2.25rem'}}>Conheça nosso<br />catálogo de Vídeos!</strong></p>
                            <p>Poste um produto na Shopee Vídeo<br />em menos de 1 minuto</p>
                            <img src={gifVideos} width="300" alt="Plataforma" style={{border: 'solid 5px #FFF', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,.5)'}} />
                            <Container className='tips'>
                                <Row>
                                    <Col md={6} className='tips-items'>
                                        <div>Vídeos novo todos os dias</div>
                                        <FaStar />
                                    </Col>
                                    <Col md={6} className='tips-items'>
                                        <div>Somente produtos ativos e validados</div>
                                        <FaStar />
                                    </Col>
                                    <Col md={6} className='tips-items'>
                                        <div>Suporte por Whatsapp</div>
                                        <FaStar />
                                    </Col>
                                    <Col md={6} className='tips-items'>
                                        <div>Postagem de vídeos simplificada</div>
                                        <FaStar />
                                    </Col>
                                    <Col md={6} className='tips-items'>
                                        <div>Navegue por categorias</div>
                                        <FaStar />
                                    </Col>
                                    <Col md={6} className='tips-items'>
                                        <div>Marque os vídeos já postados</div>
                                        <FaStar />
                                    </Col>
                                </Row>
                            </Container>
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
            <div id='bio' className='bio' style={{marginBottom: '0', padding: '2rem 0'}}>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{color: "#000", marginBottom: '2rem', fontWeight: 'bold', fontSize: '2rem', lineHeight: '2.25rem'}}>Página da Bio!</h1>
                            <p>Somente na AfiliPRO, você cria uma página própria com os produtos de nosso catálogo já com Links rastreáveis para você divulgar nas suas redes sociais.</p>
                            <p><strong>Veja o exemplo:</strong><br /><a href="https://afilipro.com.br/b/sualoja" target='_blank'>https://afilipro.com.br/b/sualoja</a></p>
                            <p style={{padding: '1rem'}}>
                                <img src={imgBio} alt="Bio" width="100%" style={{border: 'solid 1px #999', boxShadow: '0px 2px 5px rgba(0,0,0,.2)'}} />
                            </p>
                            <p className='text-center' style={{marginTop: '1rem', marginBottom: '1rem'}}>
                                <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('btn5', 'home'); location.href = '#plains'}}>Quero minha página <FaArrowRight style={{color: '#ea580c'}} /></Button>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{padding: ' 0 1.5rem 2rem'}}>
                <Container>
                    <Row>
                        <Col>
                            <strong style={{fontSize: '2rem', lineHeight: '2rem', color: '#000'}}>Quanto você gastaria<br />sem AfiliPRO?</strong>
                            <table style={{textAlign: 'left', margin: '2rem 0'}} width="100%">
                                <tr>
                                    <td>Pack de Vídeos Validados</td>
                                    <td width="80px">R$ 40,00/ano</td>
                                </tr>
                                <tr>
                                    <td>Edição dos vídeos</td>
                                    <td width="80px">R$ 1000,00/mês</td>
                                </tr>
                                <tr>
                                    <td>Hospedagem de site</td>
                                    <td>R$ 200,00/ano</td>
                                </tr>
                                <tr>
                                    <td>Curso de Afiliado</td>
                                    <td>R$ 160,00/ano</td>
                                </tr>
                            </table>
                            <p><strong style={{fontSize: '1rem', color: '#000'}}>Total: + de R$ 12.400,00 /ano</strong></p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        </>
    )
}

export default Home;