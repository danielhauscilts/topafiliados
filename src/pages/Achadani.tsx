import { useLayoutEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './Achadani.scss';

import { RiWhatsappFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";

const Achadani = () => {

    const products = [
        {
            title: 'Nintendo Switch 2',
            link: 'https://meli.la/27Ud4aw',
            cover: 'https://afilipro.com.br/capas/nintendo_switch_2.jpg'
        },
        {
            title: 'PS5 Slim Digital',
            link: 'https://meli.la/1E35bep',
            cover: 'https://afilipro.com.br/capas/ps5_slim_digital.jpg'
        },
        {
            title: 'Volante Logutech G29',
            link: 'https://meli.la/2UpRX2y',
            cover: 'https://afilipro.com.br/capas/volante_logitech.jpg'
        },
        {
            title: 'Cadeira Gamer',
            link: 'https://meli.la/2tc9p6q',
            cover: 'https://afilipro.com.br/capas/cadeira_gamer.jpg'
        },
        {
            title: 'Monitor LG 34" 180 hertz',
            link: 'https://meli.la/1DCzVCw',
            cover: 'https://afilipro.com.br/capas/monitor_lg_34.jpg'
        }
    ];

    useLayoutEffect(()=>{
        document.title = 'Stories que Bombam :: AchaDANI'
    }, []);

    return (
        
        <>
            <div className='content achadani' style={{backgroundColor: '#000'}}>
                <Container>
                    <Row style={{alignItems: 'end'}}>
                        <Col md={12}>
                            <div className='title'>
                                <p style={{textAlign: 'center'}}><img src='/logos/achadani.jpg' style={{height: '120px', borderRadius: '60px'}} /></p>
                                <p style={{fontSize: '1rem', lineHeight: '1.25rem'}}>Somente produtos que eu teria e<br /> você também vai gostar!</p>
                            </div>
                            <div className='links'>
                                    <a className='instagram' href={`https://instagram.com/acha_dani`} target='_blank'><AiFillInstagram /> @acha_dani</a>
                                    <a className='whatsapp' href={`https://chat.whatsapp.com/LNcVtPIPO4C7HXGdktI3WV`} target='_blank'><RiWhatsappFill /> GRUPO DE PROMOÇÕES</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col md={12}>
                        <p style={{textAlign: 'center', color: '#FFF', fontWeight: 'bold', fontSize: '1rem', margin: '0'}}>Veja o que divulgamos 👇</p>
                        <div className='products'>
                            <Container>
                                <Row>
                                    {products.length > 0 && products.map((e)=>(
                                        <Col xs={6} md={3}>
                                            <div className='produto_detail'>
                                                <a href={e.link} target='_blank'>
                                                    <div className='img'>
                                                        <img src={e.cover} alt={e.title} width="100%" />
                                                        <strong className='img-title'>{e.title}</strong>
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
    )
}

export default Achadani;