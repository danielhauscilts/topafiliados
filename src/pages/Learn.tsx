import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import env from '../utils/env';

import './Learn.scss';

import tutorial_video from "../assets/video/tutorial-video.mp4";

import { FaCopy } from "react-icons/fa6";
// import { AiFillPicture } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { IoIosOpen } from "react-icons/io";

const Learn = () => {

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

    const access = (btn:any, pg:any) => {

        axios.post(`${env}/api/access`, {
            button: btn,
            page: pg
        }).then(()=>{

        })
    }

    useEffect(() => {
        getProdutos();
    }, [])

    return (
        <>
        <div className='learn content' style={{ padding: '2rem 0'}}>
            <Container>
                <Row>
                    <Col md={6} className='laser-list text-center text-md-end'>
                        <h1 style={{ fontSize: '2em', lineHeight: '2.25rem'}}>Como cadastrar<br /> os <strong style={{color: 'orangered'}}>VÍDEOS</strong> usando <strong style={{color: 'orangered'}}>AfiliPRO</strong>?</h1>
                        <p style={{fontWeight: 'bold', fontSize: '1.25rem', color: '#999', marginBottom: '2rem'}}>A forma de cadastrar na Shopee Vídeos em menos de 1 minuto?</p>
                    </Col>
                    <Col md={6} className='text-center'>
                        <video height="720" controls autoPlay loop style={{border: 'solid 2px #999', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,.2)'}}>
                            <source src={tutorial_video} type="video/mp4"></source>
                        </video>
                    </Col>
                </Row>
            </Container>
            <div style={{ marginTop: '2rem', padding: '1rem 1rem 2rem', backgroundColor: '#ededed'}}>
                <p style={{margin: '2rem 0', fontWeight: 'bold', textAlign: 'center', fontSize: '2rem'}}>Agora cadastre um produto você mesmo!</p>
                <Container style={{marginBottom: '2rem', backgroundColor: '#FFF', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,.2)', overflow: 'hidden'}}>
                    <Row>
                        <Col md={4} style={{backgroundColor: '#555'}}>
                            <p style={{margin: '1rem 0 1rem', color: '#FFF'}}><strong>Assista ao nosso tutorial <Link to="/tutoriais" onClick={()=>{access('tutorial', 'home');}}>clicando aqui</Link></strong></p>
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
                                                    <a href={`${env.indexOf('localhost')>-1?env:'/api'}/${e.video}`} onClick={()=>{access('donwload_video', 'home');}} target='_self' title="ImageName" download={e.video}>
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
                                                        access('link_test', 'home');
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
                <p style={{textAlign: 'center'}}>
                    <a href="/" target='_self'>Voltar para home</a>
                </p>
            </div>
        </div>
        </>
    )
}

export default Learn;