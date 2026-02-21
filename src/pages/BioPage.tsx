import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import './BioPage.scss';

import env from '../utils/env';

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
        <div className='content bio-page'>
            {bio && (
                <>
                    <Container>
                        <Row style={{alignItems: 'end'}}>
                            <Col md={12}>
                                <div className='title'>
                                    <h1>{bio.name}</h1>
                                    <p className='descricao'>{parse(bio.descricao)}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
            <Container>
                <Row>
                    {products.length > 0 && products.map((e, i) => (
                        <Col xs={6} md={3} key={i}>
                            <div className='produto_detail'>
                                <a href={`${e.link}`} target='_blank'>
                                    <div className='img'>
                                        <img src={`https://afilipro.com.br/api/${e.capa}`} alt={e.titulo} width="100%" />
                                        <strong className='img-title'>{e.titulo}</strong>
                                    </div>
                                </a>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
        <div className='bio-footer'>
            Página gerada pela plataforma <a href='https://afilipro.com.br' target='_blank'>AfiliPRO</a>
        </div>
        </>
    )
}

export default BioPage;