import { Container, Row, Col } from 'react-bootstrap';

import './Financeiro.scss';

const Financeiro = () => {

    return (
        <div className='financeiro'>
            <Container>
                <Row>
                    <Col md={12}>
                        Financeiro
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Financeiro;