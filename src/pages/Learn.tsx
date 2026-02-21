import { Container, Row, Col } from 'react-bootstrap';

import './Learn.scss';

import tutorial_video from "../assets/video/tutorial-video.mp4";

const Learn = () => {

    return (
        <>
        <div className='learn content' style={{ padding: '2rem 0'}}>
            <Container>
                <Row>
                    <Col md={6} className='laser-list text-center text-md-end'>
                        <h1 style={{ fontSize: '4rem', lineHeight: '4rem'}}>Como cadastrar<br /> os <strong style={{color: 'orangered'}}>VÍDEOS</strong> usando <strong style={{color: 'orangered'}}>AfiliPRO</strong>?</h1>
                        <p style={{fontWeight: 'bold', fontSize: '2rem', color: '#999', marginBottom: '2rem'}}>A forma de cadastrar na Shopee Vídeos em menos de 1 minuto?</p>
                    </Col>
                    <Col md={6} className='text-center'>
                        <video height="720" controls autoPlay loop style={{border: 'solid 2px #999', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,.2)'}}>
                            <source src={tutorial_video} type="video/mp4"></source>
                        </video>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Learn;