import { Container, Row, Col } from 'react-bootstrap';

import './Learn.scss';

const Learn = () => {

    return (
        <>
        <div className='about'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list'>
                        Tutoriais
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Learn;