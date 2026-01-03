import { Container, Row, Col } from 'react-bootstrap';

import './Learn.scss';

const Learn = () => {

    return (
        <>
        <div className='learn content'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list'>
                        <h1>Tutoriais</h1>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Learn;