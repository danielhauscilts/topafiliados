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
import covers from '../assets/covers.jpg';

// icons
import { FaArrowRight } from "react-icons/fa";

import gaby from "../assets/depoimentos/gaby.webp";

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
            <h3 style={{textAlign: 'center', margin: '2rem 0', fontSize: '1.25rem', color: '#000'}}>A solução definitiva para Afiliados,<br />com <strong style={{color: '#ED1E79'}}>Pack de Vídeos que Viralizam</strong>, gerador de <strong style={{color: '#ED1E79'}}>Links rastreados</strong> e seu próprio <strong style={{color: '#ED1E79'}}>Site para Bio</strong>!</h3>
            <p>
                <img src={covers} alt="Capas" width='100%' />
            </p>
            <p style={{margin: '2rem 0 2rem', backgroundColor: '#ED1E79', color: '#FFF', padding: '.5rem 1.5rem', fontSize: '1.25rem', lineHeight: '1.5rem', borderRadius: '10px', position: 'relative', transform: 'rotate(-2deg)', boxShadow: '2px 2px 2px rgba(0,0,0,.5)'}}><strong>Pare de gastar tempo e dinheiro com várias ferramentas e tenha tudo em um único lugar</strong><span className='starts' style={{position: 'absolute', top: '-10px', right: '-15px', fontSize: '3rem', transform: 'rotate(-15deg)'}}>⭐</span></p>
            <p style={{fontSize: '2rem', margin: '2rem 0 0'}}><strong>Tudo o que você leva!</strong></p>
            <p>pagando uma única vez por um ano!</p>
            <p style={{fontSize: '2rem'}}>👇</p>
            <p style={{fontWeight: 'bold', padding: '0 1rem 1rem', borderBottom: 'dashed 1px #CCC', margin: '0 0 1rem'}}>
                <span style={{color: '#ED1E79', fontSize: '1.25rem'}}>👉 VIDEOS VIRAIS</span>
                <br />+ de 2000 vídeos virais no ano,<br />postados semanalmente
            </p>
            <p style={{fontWeight: 'bold', margin: '0 0 1rem', padding: '0 1rem 1rem', borderBottom: 'dashed 1px #CCC'}}>
                <span style={{color: '#ED1E79', fontSize: '1.25rem'}}>👉 SITE PARA BIO</span>
                <br />Seus site personalizado com produtos do calatogo e seu grupo de Whatsapp, vendendo sempre! Veja o exemplo:
                    <br /><a href="https://link-sqb.shop/b/Storiesquebombam" style={{fontSize: '.75rem'}} target='_blank'>(https://link-sqb.shop/b/Storiesquebombam)</a>
            </p>
            <p style={{fontWeight: 'bold', margin: '0 0 1rem', padding: '0 1rem 1rem'}}>
                <span style={{color: '#ED1E79', fontSize: '1.25rem'}}>👉 LINKS RASTREADOS</span>
                <br />Todos os links na plataforma e site para Bio, já estarão rastreados com seu ID Shopee
            </p>
            <p className='text-center' style={{marginTop: '1rem', marginBottom: '1rem'}}>
                <Button className='gradient' style={{fontSize: '1.25rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('garanta_seu_acesso_hoje', 'home');location.href = '#plains'}}>Garanta seu acesso hoje! <FaArrowRight style={{color: '#ED1E79'}} /></Button>
            </p>
            <p style={{margin: '2rem 0', fontSize: '2rem'}}>👇 <strong>Como funciona</strong> 👇</p>
            <video width="100%" controls={true} autoPlay={false} style={{border: 'solid 2px #999', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,.2)'}} poster={tutorial_video_cover}>
                <source src={tutorial_video} type="video/mp4"></source>
            </video>
            <Container>
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
            </Container>
            <p className='text-center' style={{marginTop: '1rem', marginBottom: '1rem'}}>
                <Button className='gradient' style={{fontSize: '1.25rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('comece_a_gerar_seus_resultados', 'home');location.href = '#plains'}}>Comece a gerar seus resultados! <FaArrowRight style={{color: '#ED1E79'}} /></Button>
            </p>
            <div className='depoimments'>
                <p style={{margin: '2rem 0', fontSize: '1.5rem'}}><strong>Veja um depoimento de quem já fatura usando a plataforma.</strong></p>
                <div className='dp-item'>
                    <img src={gaby} alt="Caixinha de Ofertas" onClick={()=>{window.open('https://shopee.com.br/gabyggaspar', '_blank')}} />
                    <p>Atingi esse resultado e diminui meu tempo de postagem usando este Pack Interativo</p>
                    <div style={{marginBottom: '1rem', color: 'orangered'}}><strong>Comissões mensais</strong></div>
                    <div><img src={depGaby} alt="Vendas" width="100%" /></div>
                </div>
            </div>
            <p id="plains" style={{margin: '1rem 0 2rem', paddingTop: '1rem',  fontSize: '2rem'}}><strong>Corra e garanta seu acesso agora mesmo!</strong></p>
            <div style={{textAlign: 'center', marginBottom: '1rem', backgroundColor: '#ededed', borderRadius: '10px', padding: '1rem 0'}}>
                <strong style={{fontSize: '1.25rem'}}>1 ano por apenas</strong><br />
                <strong style={{fontSize: '2.25rem', color: '#ED1E79'}}>⭐ R$ 29,90 ⭐</strong><br />
                <small>válido até 01/04, depois R$ 159,90</small>
                <div>
                    <Register />
                </div>
            </div>
            <p style={{margin: '0 0 1rem'}}><strong>Garantia de 7 dias</strong><br />não se adaptou devolvemos seu dinheiro!</p>
        </div>
        </>
    )
}

export default Home;