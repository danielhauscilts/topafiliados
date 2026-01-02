import { Container, Row, Col } from 'react-bootstrap';

import './Pendente.scss';

const Pendente = () => {

    return (
        <>
        <div className='about'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list'>
                        Aguardando confirmação do pagamento
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Pendente;