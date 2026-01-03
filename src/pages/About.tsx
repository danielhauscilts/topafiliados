import { Container, Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

import './About.scss';

const About = () => {

    return (
        <>
        <div className='about content'>
            <Container>
                <Row>
                    <Col md={12} className='laser-list' style={{marginBottom: '2rem'}}>
                        <h1>Dúvidas</h1>

                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Como me cadastro?</Accordion.Header>
                                <Accordion.Body>
                                    Clique neste <a href="/cadastro" target='_self'>link</a> e preencha o formulário, importante ser um e-mail e telefone válidos, você precisará deles para se logar!<br />
                                    Logo após você será direcionado(a) para uma área de login, preencha o usuário e senha cadastrados anteriormente e er´solicitado a inclusão de um código que será enviado por SMS no celular cadastrado.<br /> 
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Como contratar?</Accordion.Header>
                                <Accordion.Body>
                                Após o login, acesse <strong>Minha Conta | Contratação</strong> para revisar seus dados e fazer a contratação, o pagamento é através do Mercado Pago aceitando pagamentos por Pix, Boleto, Cartôes de Crédito e Débito em um ambiente seguro!<br />
                                Após o pagamento você será redirecionado ao site, onde estará habilitado os botões <strong>Produtos</strong> e <strong>Tutoriais</strong> para uso durante 30 dias.<br />
                                Em Minha Conte é informado a data de vigência do plano para contratar mais dias, realize uma nova compra após essa data.  
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Como pagar?</Accordion.Header>
                                <Accordion.Body>
                                O pagamento é realizado através da pataforma Mercado Pago com os meios Pix, Boleto, Cartões de Débito e Crédito, mesmo não possuindo cadastro no Mercado Pago. 
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Tive um problema com meu pagamento?</Accordion.Header>
                                <Accordion.Body>
                                Entre em contato através do e-mail <a href="mailto:pagamento@afilipro.com.br">pagamento@afilipro.com.br</a>, no assunto informar "Problema de pagamento - seu@email", no corpo do e-mail notificar o problema, espondemos em até 24h. 
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default About;