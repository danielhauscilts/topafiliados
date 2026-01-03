import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Falha.scss';

// icons
import { BiSolidErrorAlt } from "react-icons/bi";

const Falha = () => {

    return (
        <>
        <div className='falha'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list'>
                        <div className='titulo text-center' style={{padding: '2rem 0'}}>
                            <p style={{fontSize: '5rem', color: 'green'}}><BiSolidErrorAlt /></p>
                            <h1>Houve uma falha em seu pagamento!</h1>
                            <p>Tente novamente ou contate sua instituição financeira</p>
                            <p><Link to="/conta">Ir para o <strong>Minha conta!</strong></Link></p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Falha;