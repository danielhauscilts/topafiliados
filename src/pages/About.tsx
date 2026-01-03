import { Container, Row, Col } from 'react-bootstrap';
import "yet-another-react-lightbox/styles.css";

import './About.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

const About = () => {

    return (
        <>
        <div className='about content'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list'>
                        <h1>Dúvidas</h1>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default About;