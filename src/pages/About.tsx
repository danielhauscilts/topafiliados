import { Container, Row, Col } from 'react-bootstrap';

import './About.scss';

const About = () => {

    return (
        <div className='about'>
            <Container>
                <Row>
                    <Col md={12}>
                        About
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About;