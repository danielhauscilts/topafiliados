import { Container, Row, Col } from 'react-bootstrap';

import './Learn.scss';

import tutorial_video from "../assets/video/tutorial-video.mp4";

const Learn = () => {

    return (
        <>
        <div className='learn content'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list'>
                        <h1>Tutorial</h1>
                    </Col>
                </Row>
            </Container>
            <div style={{backgroundColor: '#000'}} className='text-center'>
                <video height="720" controls>
                    <source src={tutorial_video} type="video/mp4"></source>
                </video>
            </div>
        </div>
        </>
    )
}

export default Learn;