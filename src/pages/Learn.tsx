import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import env from '../utils/env';

import './Learn.scss';

import tutorial_video from "../assets/video/tutorial-video.mp4";

const Learn = () => {

    const access = (btn:any, pg:any) => {

        axios.post(`${env}/api/access`, {
            button: btn,
            page: pg
        }).then(()=>{

        })
    }

    useEffect(() => {
        access('pg_tutorial', 'tutoriais');
    }, []);

    return (
        <>
        <div className='learn content' style={{ padding: '2rem 0'}}>
            <Container>
                <Row>
                    <Col md={12} className='text-center'>
                        <video height="720" controls={true} autoPlay={true} style={{border: 'solid 2px #999', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0,0,0,.2)'}}>
                            <source src={tutorial_video} type="video/mp4"></source>
                        </video>
                    </Col>
                </Row>
            </Container>
            <div>
                <p style={{textAlign: 'center', fontWeight: 'bold', margin: '2rem 0 0'}}>
                    <a href="/" target='_self'>Voltar para o início</a>
                </p>
            </div>
        </div>
        </>
    )
}

export default Learn;