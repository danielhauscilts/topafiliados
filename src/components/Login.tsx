import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import './Login.scss';

function Login() {

    const sendSms = () => {
        axios.post(
            'http://localhost:8080/api/login'
        ).then((e)=>{
            console.log('Envio do SMS: ', e);
        }).catch((error) => {
            console.log('Falhs no envio', error);
        })
    }

    return (
        <div className="login-container">
            <form className="login-form">
                <Container>
                    <Row>
                        <Col md={12}>
                            <h2>Área restrita</h2>
                        </Col>
                        <Col md={8}>
                            <input type="text" style={{width: '100%'}} id="phone" name="phone" placeholder='11900000000' value="5511962601113" required />
                        </Col>
                        <Col md={4}>
                            <button type="submit" style={{width: '100%'}} onClick={(e) => {e.preventDefault; sendSms()}} className="login-button">Logar</button>
                        </Col>
                    </Row>
                </Container>
            </form>
        </div>
    );
}

export default Login;