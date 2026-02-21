import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Slider from "react-slick";
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

// icons
import { FaArrowRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

import { FaCopy } from "react-icons/fa6";
// import { AiFillPicture } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { IoIosOpen } from "react-icons/io";

// import tutorial_video from "../assets/video/tutorial-video.mp4";
import gifVideos from "../assets/produtos.gif";
import achaDani from "../assets/depoimentos/br-11134233-81z1k-mi7tjwlq21vn1a.jpg";
import bia from "../assets/depoimentos/bianca.webp";
import valeria from "../assets/depoimentos/valeria.webp";
import gaby from "../assets/depoimentos/gaby.webp";
import imgBio from "../assets/bio.png";

const Home = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        mobileFirst:true,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const Navigate = useNavigate();

    const [produtos, setProdutos] = useState<any[]>([]);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

    const getProdutos = () => {

        setLoadingProducts(true);

        axios.get(`${env}/api/produtos/home`)
            .then((e)=>{
                console.log('total: ', e.data.total);
                setProdutos(e.data.items);
                setLoadingProducts(false);
            }).catch(()=>{
                setProdutos([]);
                setLoadingProducts(false);
            })
    }

    useEffect(() => {
        getProdutos();
    }, [])

    return (
        <>
        <div className='home'>
            <Container>
                <Row className='call'>
                    <Col md={12}>
                        <p style={{alignContent: 'start', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', lineHeight: '2.25rem'}}>
                            Venda todos os dias como <span className='gradient-text'>Afiliado Shopee</span>, mesmo começando do ZERO<br />
                        </p>
                        <p style={{margin: '1rem 0 0'}}>Essa é a solução completa para vender todos os dias na Shopee sem aparecer e economizando horas do seu dia</p>
                        <p style={{fontWeight: 'bold', margin: '1rem 0 0', fontSize: '1.5rem'}}>Menos de R$ 1,10 por dia!</p>
                        <p>
                            <ul className='hd-list'>
                                <li><span>+</span> Vídeos prontos</li>
                                <li><span>+</span> Página para Bio</li>
                                <li><span>+</span> Links rastreados</li>
                                <li><span>+</span> Suporte Whatsapp</li>
                            </ul>
                        </p>
                        <p className='text-center' style={{marginTop: '2rem', marginBottom: '0rem'}}>
                            <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); location.href = '#plains'}}>Quero começar agora <FaArrowRight /></Button>
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <div className='depoimments'>
                            <p style={{fontSize: '2rem', color: '#000', lineHeight: '2.25rem', marginBottom: '2rem'}}><strong>Veja depoimentos<br />de quem usa!</strong></p>
                            <Slider {...settings}>
                                <div className='dp-item'>
                                    <img src={gaby} alt="Caixinha de Ofertas" onClick={()=>{window.open('https://shopee.com.br/gabyggaspar', '_blank')}} />
                                    <p>Atuo com trafego pago e links trackeados, consegui mais tempo depois de postar vídeos pela <strong>AfiliPRO</strong></p>
                                    <div><img src={depGaby} alt="Vendas" width="100%" /></div>
                                </div>
                                <div className='dp-item'>
                                    <img src={achaDani} alt="AchaDANI" onClick={()=>{window.open('https://shopee.com.br/danielpintcsherbatista', '_blank')}} />
                                    <p>
                                        Após ser banido, voltei a vender em 2 dias postando vídeos <strong>AfiliPRO</strong>.
                                    </p>
                                    <div><img src={dep} alt="Vendas" width="100%" /></div>
                                </div>
                                <div className='dp-item'>
                                    <img src={bia} alt="Bianca" onClick={()=>{window.open('https://shopee.com.br/bianca.cozzati', '_blank')}} />
                                    <p>Quase desisti de ser afiliada por gastar muito tempo e não faturar, depois do <strong>AfiliPRO</strong> levo 10 minutos para postar 10 vídeos, então continuei e já estou vendendo.</p>
                                </div>
                                <div className='dp-item'>
                                    <img src={valeria} alt="Valéria" onClick={()=>{window.open('https://shopee.com.br/valeriarabello', '_blank')}} />
                                    <p>Gerencio 3 contas e com <strong>AfiliPRO</strong> posto gasto 1 hora para postar vídeos em todas.</p>
                                </div>
                            </Slider>
                        </div>
                        <p className='text-center' style={{marginTop: '1rem', marginBottom: '2rem'}}>
                            <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); location.href = '#plains'}}>Me convenceu vamos <FaArrowRight style={{color: '#ea580c'}} /></Button>
                        </p>
                    </Col>
                </Row>
            </Container>
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
                                <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); location.href = '#plains'}}>Contrate agora mesmo <FaArrowRight /></Button>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{padding: '1rem', backgroundColor: '#ededed'}}>
                <Container>
                    <Row>
                        <Col md={12}>
                            <p style={{alignContent: 'start', textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold', lineHeight: '3rem', color: '#000', margin: '2rem 0 1rem'}}>Poste um vídeo agora <span className='gradient-text'>MESMO</span>!</p>
                            <p style={{fontSize: '.75rem', marginBottom: '0rem', color: '#555'}}>* É necessário que você já tenha cadastro ativo como Afiliado Shopee, caso não seja <a href='https://shopee.com.br/m/afiliados' target='_self'>clique aqui</a> e aguarde seu e-mail de confirmação.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{ padding: '1rem 1rem 2rem', backgroundColor: '#ededed'}}>
                <Container style={{marginBottom: '2rem', backgroundColor: '#FFF', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,.2)', overflow: 'hidden'}}>
                    <Row>
                        <Col md={4} style={{backgroundColor: '#555'}}>
                            <p style={{margin: '1rem 0 1rem', color: '#FFF'}}><strong>Assista ao nosso tutorial <Link to="/tutoriais">clicando aqui</Link></strong></p>
                            <Container style={{padding: ' 0 1rem'}}>
                                <Row>
                                    {produtos && produtos.length > 0 && !loadingProducts && produtos.map((e, i) => (
                                        <Col key={i} xs={12} sm={12} md={12} lg={12} id={`${i}_${e.id}`}>
                                            <div className={JSON.parse(window.localStorage.getItem('posted') || '[]').indexOf(e.id) > -1 ? 'produto posted' : 'produto'} style={{boxShadow: '0px 10px 10px rgba(0,0,0,.2)', marginBottom: '2rem'}}>
                                                <div className='titulo' style={{ padding: '.25rem 0'}}>{e.titulo}</div>
                                                {/* <div className='text-left' style={{marginBottom: '1rem', fontSize: '.75rem'}}>Postado em {e.data ? e.data.split('-')[2]+'/'+e.data.split('-')[1]+'/'+e.data.split('-')[0]:''}</div> */}
                                                <div className='midias'>
                                                    {/* 
                                                    <div className='capa'>
                                                        <img src={`${env.indexOf('localhost')>-1?env:'/api'}/${e.capa}`} width='100%' alt="Baixar" />
                                                        <AiFillPicture />
                                                    </div>
                                                    */}
                                                    <div className='video'>
                                                        <video width="100%" controls  poster={e.capa ? `${env.indexOf('localhost')>-1?env:'/api'}/${e.capa}` : ''}>
                                                            <source src={`${env.indexOf('localhost')>-1?env:'/api'}/${e.video}`} type="video/mp4"></source>
                                                        </video>
                                                        <FaVideo />
                                                    </div>
                                                </div>
                                                <div className='downloads'>
                                                    {/* <a href={`${env.indexOf('localhost')>-1?env:'/api'}/${e.capa}`} title="ImageName" download={e.capa}>
                                                        Baixar Capa <FaFileDownload />
                                                    </a> */}
                                                    <a href={`${env.indexOf('localhost')>-1?env:'/api'}/${e.video}`} title="ImageName" download={e.video}>
                                                        Baixar Vídeo <FaFileDownload />
                                                    </a>
                                                </div>
                                                <div className='texto' onClick={()=>{
                                                        navigator.clipboard.writeText(e.titulo + " " + e.texto).then(() => {
                                                            // Optional: Provide user feedback
                                                            alert('#Hashtags copiadas com sucesso!');
                                                        });
                                                    }}>
                                                    <p>Copiar Título e #hashtags</p>
                                                    <span>{e.titulo} {e.texto}</span>
                                                    <FaCopy />
                                                </div>
                                                <div className='link' onClick={()=>{
                                                        window.open(e.link, '_blank');
                                                    }}>
                                                    <p>Link 1</p>
                                                    <span>{e.link}</span>
                                                    <IoIosOpen />
                                                </div>
                                                {e.link_2 && (
                                                    <div className='link' onClick={()=>{
                                                        window.open(e.link_2, '_blank');
                                                    }}>
                                                    <p>Link 2</p>
                                                    <span>{e.link_2}</span>
                                                    <IoIosOpen />
                                                </div>
                                                )}
                                                {e.link_3 && (
                                                    <div className='link' onClick={()=>{
                                                        window.open(e.link_3, '_blank');
                                                    }}>
                                                    <p>Link 3</p>
                                                    <span>{e.link_3}</span>
                                                    <IoIosOpen />
                                                </div>
                                                )}
                                            </div>
                                        </Col>
                                        )
                                    )}
                                    {produtos && produtos.length === 0 && !loadingProducts && (
                                        <Col className='text-center'>
                                            <span style={{color:'#FFF'}}>Não existem produtos para essa pesquisa.</span>
                                        </Col>
                                    )}
                                    {loadingProducts && (
                                        <Col className='text-center'>
                                            <span style={{color:'#FFF'}}>Carregando produtos.</span>
                                        </Col>
                                    )}
                                </Row>
                            </Container>
                        </Col>
                        <Col md={8} style={{backgroundColor: '#999'}}>
                            <ul className='how' style={{borderRadius: '5px', padding: '1rem', margin: '1rem 0'}}>
                                <li><p>Clique em <strong>Baixar Vídeo</strong></p></li>
                                <li><p>Depois clique sobre as <strong>#hashtags</strong> para copiar para o navegador</p></li>
                                <li><p>Então clique no link do produto para ser direcionado para a <strong>Shopee</strong></p></li>
                                <li><p>Ao abrir a página, clique sobre o titulo do produto e depois em <strong>curtir</strong>, no coração ao lado direito do numero de vendidos, junto com o preço do produto</p></li>
                                <li><p>Retorne a sua página de aviliados e clique em <strong>Meus Likes</strong>, ícone de coração</p></li>
                                <li><p>Localize o produto e clique sobre o título</p></li>
                                <li><p>Depois em compartilhar na seta no canto superior direito e depois em <strong>Shopee Vídeo</strong></p></li>
                                <li><p>Na galeria de videos, clique em vídeo na parte inferior e em sua galeria ao lado direito do botão gravar</p></li>
                                <li><p>Selecione o video baixado na <strong>AfiliPRO</strong> e em próximo e no seu video próximo novamente</p></li>
                                <li><p>Em adicionar legenda, clique e seguro sobre "Adicionar legendas para seus videos" e cole as #hastags copiadas no <strong>AfiliPRO</strong></p></li>
                                <li><p>Clique em Postar na parte inferior e pronto, volte para o site da <strong>AfiliPRO</strong> e marque seu produto como <strong>Postado.</strong></p></li>
                                <li><p>Siga para o próximo produto.</p></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
                <p className='text-center' style={{marginTop: '1rem', marginBottom: '0rem'}}>
                    <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); location.href = '#plains'}}>Quero mais PRODUTOS <FaArrowRight style={{color: '#ea580c'}} /></Button>
                </p>
            </div>
            <div id='bio' className='bio' style={{backgroundColor: '#ffebff', marginBottom: '0', padding: '2rem 0'}}>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{color: "#000", marginBottom: '1rem', fontWeight: 'bold', fontSize: '2rem', lineHeight: '2.25rem'}}>Veja como será sua<br />página da Bio!</h1>
                            <p>Somente na AfiliPRO, você cria uma página própria com os produtos de nosso catálogo já com Links rastreáveis para você divulgar nas suas redes sociais.</p>
                            <p><strong>Veja o exemplo:</strong><br /><a href="https://afilipro.com.br/b/sualoja" target='_blank'>https://afilipro.com.br/b/sualoja</a></p>
                            <p style={{padding: '1rem'}}>
                                <img src={imgBio} alt="Bio" width="100%" style={{border: 'solid 1px #999', boxShadow: '0px 2px 5px rgba(0,0,0,.2)'}} />
                            </p>
                            <p className='text-center' style={{marginTop: '1rem', marginBottom: '1rem'}}>
                                <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); location.href = '#plains'}}>Quero minha página <FaArrowRight style={{color: '#ea580c'}} /></Button>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* <div className='dor' style={{backgroundColor: '#ffe0e0'}}>
                <Container>
                    <Row>
                        <Col md={12}>
                            <p style={{alignContent: 'start', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', lineHeight: '2.25rem', marginBottom: '2rem'}}>Você já tentou ganhar dinheiro com <br /><strong>Shopee Vídeo</strong>, mas...</p>
                        </Col>
                        <Col md={6}>
                            <div className='box'>
                                <div className='svg'><RiCloseCircleLine /></div> <span>Perde tempo procurando produto</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='box'>
                                <div className='svg'><RiCloseCircleLine /></div> <span>Posta e não vende</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='box'>
                                <div className='svg'><RiCloseCircleLine /></div> <span>É banido por vídeo falso</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='box'>
                                <div className='svg'><RiCloseCircleLine /></div> <span>Usa grupos bagunçados cheios de spam</span>
                            </div>
                        </Col>
                        <Col md={12}>
                            <p style={{color: 'red', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem'}}>Resultado: desânimo e zero consistência.</p>
                            <p className='text-center' style={{marginTop: '1rem', marginBottom: '1rem'}}>
                                <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); location.href = '#plains'}}>Não tenho tempo <FaArrowRight style={{color: '#ea580c'}} /></Button>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='check'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <p style={{alignContent: 'start', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', lineHeight: '2.25rem'}}>Nós organizamos tudo pra você.</p>
                            <p style={{marginBottom: '3rem', fontSize: '1.5rem'}}>Em um lugar só</p>
                        </Col>
                        <Col md={6}>
                            <div className='box'>
                                <div className='svg'><IoCheckmarkCircleOutline /></div> <span>Produtos que já estão vendendo</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='box'>
                                <div className='svg'><IoCheckmarkCircleOutline /></div> <span>Vídeos prontos para Shopee Vídeo</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='box'>
                                <div className='svg'><IoCheckmarkCircleOutline /></div> <span>Legendas e hashtags copiáveis</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='box'>
                                <div className='svg'><IoCheckmarkCircleOutline /></div> <span>Conteúdo novo todos os dias</span>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className='paste'><FaHandPointRight /> <span>Você só copia, posta e vende</span></div>
                        </Col>
                    </Row>
                </Container>
            </div>
            */}
            <div style={{backgroundColor: '#efefef', padding: '2rem 1.5rem'}}>
                <Container>
                    <Row>
                        <Col>
                            <strong style={{fontSize: '2rem', lineHeight: '2rem', color: '#000'}}>Quanto você gastaria<br />sem AfiliPRO?</strong>
                            <table style={{textAlign: 'left', margin: '2rem 0'}} width="100%">
                                <tr>
                                    <td>Pack de Vídeos Validados</td>
                                    <td width="80px">R$ 40,00</td>
                                </tr>
                                <tr>
                                    <td>Hospedagem de site</td>
                                    <td>R$ 200,00</td>
                                </tr>
                                <tr>
                                    <td>Curso de Afiliado</td>
                                    <td>R$ 160,00</td>
                                </tr>
                            </table>
                            <p><strong style={{fontSize: '1.5rem', color: '#000'}}>Total: + de R$ 400,00 /ano</strong></p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{backgroundColor: '#FFF', paddingTop: '2rem'}}>
                <Container>
                    <Row>
                        <Col>
                            <h1 id='plains' style={{margin: '1rem 0 2rem', color: '#000', fontWeight: 'bold', fontSize: '2.5rem'}}>Então, qual plano<br />você quer?</h1>
                            <div className='plains'>
                                <div className='price one'>
                                    <p style={{alignContent: 'start', textAlign: 'center', fontSize: '3rem', fontWeight: 'bold', lineHeight: '3.25rem', color: 'rgb(97, 160, 255)', marginBottom: '0'}}>Mensal</p>
                                    <p style={{marginBottom: '0'}}>Use 30 dias, por apenas</p>
                                    <p style={{fontSize: '3rem', fontWeight: 'bold'}}>R$ 29<small>,90</small></p>
                                    <p><Button onClick={()=>{Navigate('/plano/20')}} style={{backgroundColor: 'orangered', borderColor: 'orangered'}}>Contrate Mensal <FaArrowRight style={{color:"#FFF"}} /></Button></p>
                                </div>
                                <div className='price two'>
                                    <p style={{alignContent: 'start', textAlign: 'center', fontSize: '3rem', fontWeight: 'bold', lineHeight: '3.25rem', color: 'rgb(255, 174, 43)', marginBottom: '0'}}>Anual</p>
                                    <p style={{marginBottom: '0'}}>Use 1 ano, por apenas</p>
                                    <p style={{fontSize: '3rem', fontWeight: 'bold'}}>R$ 197<small>,90</small></p>
                                    <p><Button onClick={()=>{Navigate('/plano/120')}} style={{backgroundColor: 'orangered', borderColor: 'orangered'}}>Contrate Anual <FaArrowRight style={{color:"#FFF"}} /></Button></p>
                                </div>
                            </div>
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
                                <p style={{backgroundColor: 'yellow', textAlign: 'center', color: '#000', margin: '0 0 2rem', padding: '.5rem 1rem', borderRadius: '5px', border: 'solid 3px darkyellow', fontSize: '1.25rem', boxShadow: '1px 1px 3px rgba(0,0,0,.5)'}}><strong>Garantia</strong><br />Usou por 7 dias e não gostou?<br /> Devolvemos seu dinheiro!</p>
                                <strong style={{display: 'block', marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center', borderRadius: '10px', backgroundColor: '#FFF', padding: '1rem'}}>A solução de Afiliado mais barata do mercado</strong>
                                <strong style={{display: 'block', marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center', borderRadius: '10px', backgroundColor: '#FFF', padding: '1rem'}}>Mais fácil de utilizar</strong>
                                <strong style={{display: 'block', marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center', borderRadius: '10px', backgroundColor: '#FFF', padding: '1rem'}}>Maior número de ferramentas para você!</strong>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        </>
    )
}

export default Home;