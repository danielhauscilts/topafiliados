import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import './BioPage.scss';

import env from '../utils/env';
import { RiWhatsappFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { SiShopee } from "react-icons/si";
import { PiTiktokLogoFill } from "react-icons/pi";


const BioPage = () => {

    const [bio, setBio] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);

    const { nick } = useParams()

    const getBio = () => {
        axios.get(`${env}/api/bio/page/${nick}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            }
        )
        .then((e)=>{
            setBio(e.data);
            setProducts(e.data.produtos);
        }).catch(()=>{
            setBio(null);
            setProducts([]);
        })
    }

    useEffect(()=>{
        getBio();
    }, []);

    return (
        
        <>
        {bio && (
            <>
            <div className='content bio-page' style={(bio && bio.cor !== null && bio.cor !== '') ? {backgroundColor: bio.cor} : {}}>
                {bio && (
                    <>
                        <Container>
                            <Row style={{alignItems: 'end'}}>
                                <Col md={12}>
                                    <div className='title'>
                                        <h1>@{bio.name.replace(/g/gi, '_')}_</h1>
                                        <p className='descricao'>{parse(bio.descricao)}</p>
                                    </div>
                                    <div className='links'>
                                        {bio.grupo_whatsapp && (
                                            <a className='whatsapp' href={`https://chat.whatsapp.com/${bio.grupo_whatsapp}`} target='_blank'><RiWhatsappFill /> GRUPO DE PROMOÇÕES</a>
                                        )}
                                        {bio.shopee && (
                                            <a className='shopee' href={`https://shopee.com.br/${bio.shopee}`} target='_blank'><SiShopee /> @{bio.shopee}</a>
                                        )}
                                        {bio.instagram && (
                                            <a className='instagram' href={`https://instagram.com/${bio.instagram}`} target='_blank'><AiFillInstagram /> @{bio.instagram}</a>
                                        )}
                                        {bio.tiktok && (
                                            <a className='tiktok' href={`https://tiktok.com/${bio.tiktok}`} target='_blank'><PiTiktokLogoFill /> @{bio.tiktok}</a>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </>
                )}
                <Container>
                    <Row>
                        <Col md={12}>
                        <p style={{textAlign: 'center', color: '#FFF', fontWeight: 'bold', fontSize: '1.25rem', margin: '0'}}>Os links estão aqui 👇</p>
                        <div className='products'>
                            <Container>
                                <Row>
                                    {products.length > 0 && products.map((e, i) => (
                                        <Col xs={6} md={3} key={i}>
                                            <div className='produto_detail'>
                                                <a href={`${e.link}`} target='_blank'>
                                                    <div className='img'>
                                                        <img src={`https://afilipro.com.br/api/${e.capa}`} alt={e.titulo} width="100%" />
                                                        <strong className='img-title'>{e.titulo.length >= 40 ? e.titulo.slice(0, 40) + '...' : e.titulo}</strong>
                                                    </div>
                                                </a>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='bio-footer'>
                Página gerada por <a href='https://storiesquebombam.com.br' target='_blank'>Stories que Bombam</a>
            </div>
            </>
        )}
        </>
    )
}

export default BioPage;