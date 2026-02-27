import { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import env from '../utils/env';

import "yet-another-react-lightbox/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './Home_mae.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

//images
import depGaby from '../assets/prova-gaby.jpg';
import family from '../assets/family.jpg';

// icons
import { FaArrowRight } from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";

import gaby from "../assets/depoimentos/gaby.webp";
import imgBio from "../assets/bio.png";

const Mae = () => {

    const Navigate = useNavigate();

    const access = (btn:any, pg:any) => {

        axios.post(`${env}/api/access`, {
            button: btn,
            page: pg
        }).then(()=>{

        })
    }

    useEffect(()=>{
        access('acesso_home_mae', 'home_mae');
    }, []);

    return (
        <>
        <img src={family} alt="Família" width='100%' />
        <div className='home_mae'>
            <h3 style={{color: '#000', fontSize: '2rem', lineHeight: '2.25rem', fontWeight: 'bold', margin: '1rem 0 2rem'}}>Você só precisa de 10 minutos do seu dia!</h3>
            <p style={{margin: '2rem 0 2rem', padding: '0 1rem'}}>
                <a href="/tutoriais" target='_self' style={{color: '#FFF',display: 'flex', width: '100%', flexDirection: 'row', backgroundColor: '#ff6e80', borderRadius: '10px', padding: '1rem', fontWeight: 'bold', border: 'solid 5px #ffb5bd', boxShadow: '2px 2px 4px rgba(0,0,0,.5)'}}>
                    <div style={{fontSize: '3rem', lineHeight: '2.5rem'}}><IoIosVideocam style={{color: '#fff'}} /></div>
                    <div style={{textAlign: 'left', paddingLeft: '1rem', fontSize: '1.25rem', lineHeight: '1.5rem'}}>Clique aqui e assista como é fácil e divertido!</div>
                </a>
            </p>
            <Container>
                <Row>
                    <Col>
                        <p>
                            <ul style={{textAlign: 'left', marginBottom: '2rem'}}>
                                <li style={{marginBottom: '1rem'}}>Copie 3 vídeos e hashtags da plataforma e poste na Shopee Vídeos</li>
                                <li style={{marginBottom: '1rem'}}>Adicionar produtos ao seu site personalizado criado na plataforma e divulgue nas Redes Sociais!</li>
                                <li style={{marginBottom: '0'}}><p>Sabe aquela amiga que gostou de um produto?</p><p>Copie o link da plataforma e mande para ela, você recebrá por isso!</p></li>
                            </ul>
                        </p>
                        <p className='text-center' style={{marginTop: '0rem', marginBottom: '1rem'}}>
                            <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('btn_comece_hoje', 'home_mae');location.href = '#plains'}}>Comece ainda hoje <FaArrowRight style={{color: '#ea580c'}} /></Button>
                        </p>
                        <p style={{margin: '2rem 0 2rem', fontWeight: 'bold'}}>Mais divertido que <strong style={{color: '#ff6e80'}}>ROLAR REELS</strong>, de manhã, tarde ou noite, você posta 2, 3 ou 10 produtos e começa a receber por isso em pouco tempo!</p>
                    </Col>
                </Row>
            </Container>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div className='plains'>
                                <h1 id='plains' style={{margin: '0 0 1rem', paddingTop: '0', fontWeight: 'bold', fontSize: '1.5rem', color: '#000'}}>Planos</h1>
                                <div className='price one' style={{marginBottom: '0'}}>
                                    <p style={{alignContent: 'start', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '2rem', color: 'rgb(97, 160, 255)', marginBottom: '0'}}>Mensal</p>
                                    <p style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '.25rem'}}>R$ 29<small>,90</small></p>
                                    <p><Button onClick={()=>{access('plain20', 'home_mae'); Navigate('/plano/20')}} style={{backgroundColor: 'orangered', borderColor: 'orangered', fontSize: '1rem'}}>Contratar <FaArrowRight style={{color:"#FFF"}} /></Button></p>
                                </div>
                                <p style={{fontSize: '1.5rem', margin: '.5rem 0'}}>ou</p>
                                <div className='price two'>
                                    <p style={{alignContent: 'start', textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', lineHeight: '2rem', color: 'rgb(255, 174, 43)', marginBottom: '0'}}>Anual</p>
                                    <p style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '.25rem'}}>R$ 197<small>,90 (45% off)</small></p>
                                    <p><Button onClick={()=>{access('plain120', 'home_mae'); Navigate('/plano/120')}} style={{backgroundColor: 'orangered', borderColor: 'orangered', fontSize: '1rem'}}>Contratar <FaArrowRight style={{color:"#FFF"}} /></Button></p>
                                </div>
                                <p style={{display: 'block', width: '100%', backgroundColor: '#ff8400', textAlign: 'center', color: '#FFF', margin: '0 0 2rem', padding: '.5rem 1rem', borderRadius: '5px', border: 'solid 3px darkyellow', fontSize: '1.25rem', lineHeight: '1.5rem', boxShadow: '1px 1px 3px rgba(0,0,0,.5)'}}><strong style={{ marginBottom: '.5rem', display: 'block'}}>Teste por 7 dias</strong>Se não se adaptar,<br />devolvemos seu dinheiro!</p>
                                <ul style={{margin: '0 0 1rem', padding:'0 2rem', color: '#000', textAlign: 'left'}}>
                                    <li style={{marginBottom: '1rem'}}>Não é assinatura, renove somente quando quiser</li>
                                    <li style={{marginBottom: '1rem'}}>Produtos novos toda semana</li>
                                    <li style={{marginBottom: '1rem'}}>Acesso imediato</li>
                                    <li style={{marginBottom: '1rem'}}>Página personalizada para link na Bio</li>
                                    <li style={{marginBottom: '1rem'}}>Gerador de Link rastreavel de 7 dias</li>
                                    <li style={{marginBottom: '1rem'}}>Suporte dedicado por Whatsapp</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div> 
            <Container>
                <Row>
                    <Col>
                        <div className='depoimments'>
                            <div className='dp-item'>
                                <div style={{fontSize: '1.5rem', lineHeight: '1.75rem', marginBottom: '2rem'}}><strong>Depoimento e resultado real de uma mãe.</strong></div>
                                <img src={gaby} alt="Caixinha de Ofertas" onClick={()=>{window.open('https://shopee.com.br/gabyggaspar', '_blank')}} />
                                <a href="https://shopee.com.br/gabyggaspar" target='_blank' style={{margin: '1rem 0', display: 'block'}}>@gabyggaspar</a>
                                <p>Me chamo Gabriela e deixei minha carreira em Departamento Pessoal após o nascimento do minha filha, depois de ter tentando de tudo, desde bolos de pote no iFood, até decorações em crochê, tudo dependia de muito tempo e era difícil de administrar, hoje posso contar com uma renda passiva e ter muito tempo para meus pequenos, sim hoje são 2.</p>
                                <div style={{marginBottom: '1rem', color: 'orangered'}}><strong>Comissões mensais</strong></div>
                                <div><img src={depGaby} alt="Vendas" width="100%" /></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>           
            <div style={{backgroundColor: '#FFF'}}>
                <Container>
                    <Row>
                        <Col>
                            <div className='benefits'>
                                <p><span>+</span>de <strong>130</strong> produtos ativos agora.</p>
                                <p><span>+</span>de <strong>300</strong> vídeos cadastrados esse ano.</p>
                            </div>
                            <p className='text-center' style={{marginTop: '2rem'}}>
                                <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('btn_contrate_agora_memso', 'home_mae');location.href = '#plains'}}>Não deixe pra depois <FaArrowRight /></Button>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div id='bio' className='bio' style={{marginBottom: '0', padding: '1rem 0 2rem'}}>
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{color: "#ff6e80", marginBottom: '1rem', fontWeight: 'bold', fontSize: '2rem', lineHeight: '2.25rem'}}>Esteja entre as PROFISSIONAIS!</h1>
                            <p>Você terá um lindo Site personalizado como este para divulgar no seu Instagram ou TikTok.</p>
                            <p><strong>Veja o exemplo:</strong><br /><a href="https://afilipro.com.br/b/sualoja" target='_blank'>https://afilipro.com.br/b/sualoja</a></p>
                            <p style={{padding: '1rem'}}>
                                <img src={imgBio} alt="Bio" width="100%" style={{border: 'solid 1px #999', boxShadow: '0px 2px 5px rgba(0,0,0,.2)'}} />
                            </p>
                            <p className='text-center' style={{marginTop: '1rem', marginBottom: '1rem'}}>
                                <Button className='gradient' style={{fontSize: '1.5rem', padding: '1rem 1.25rem', width: '100%'}} onClick={(e)=>{e.preventDefault(); access('btn_garanta_site', 'home_mae'); location.href = '#plains'}}>Garanta seu Site <FaArrowRight style={{color: '#ea580c'}} /></Button>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        </>
    )
}

export default Mae;