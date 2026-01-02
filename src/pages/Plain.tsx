import { Container, Row, Col } from 'react-bootstrap';
import "yet-another-react-lightbox/styles.css";

import './Plain.scss';
import '../assets/zoom-styles.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

const Plain = () => {

    return (
        <>
        <div className='plain'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list'>
                        Planos
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Plain;