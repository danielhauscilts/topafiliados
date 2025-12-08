import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import './Home.scss';
import '../assets/zoom-styles.min.css';

import planta_1 from '../assets/planta_1.jpg';
import planta_2 from '../assets/planta_2.jpg';
import local from '../assets/foto-local.jpg';
import plantaTorre from '../assets/planta-torre.jpg';
import laser from '../assets/laser.jpg';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import photo1 from '../assets/pictures/1.jpg';
import photo2 from '../assets/pictures/2.jpg';
import photo3 from '../assets/pictures/3.jpg';
import photo4 from '../assets/pictures/4.jpg';
import photo5 from '../assets/pictures/5.jpg';
import photo6 from '../assets/pictures/6.jpg';
import photo7 from '../assets/pictures/7.jpg';
import photo8 from '../assets/pictures/8.jpg';
import photo9 from '../assets/pictures/9.jpg';
import photo10 from '../assets/pictures/10.jpg';
import photo11 from '../assets/pictures/11.jpg';
import photo12 from '../assets/pictures/12.jpg';

// icons
import { FaBicycle } from "react-icons/fa6";
import { BiSolidDrink } from "react-icons/bi";
import { FaTableTennisPaddleBall } from "react-icons/fa6";
import { IoIosFitness } from "react-icons/io";
import { MdToys } from "react-icons/md";
import { GiKidSlide } from "react-icons/gi";
import { BsDiamondFill } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";

const Home = () => {

    const [open, setOpen] = useState(false);
    const [zoomImage, setZoomImage] = useState('');
    
    const images = [
        {
            original: '.' + photo1,
            thumbnail: '.' + photo1
        },
        {
            original: '.' + photo2,
            thumbnail: '.' + photo2
        },
        {
            original: '.' + photo3,
            thumbnail: '.' + photo3
        },
        {
            original: '.' + photo4,
            thumbnail: '.' + photo4
        },
        {
            original: '.' + photo5,
            thumbnail: '.' + photo5
        },
        {
            original: '.' + photo6,
            thumbnail: '.' + photo6
        },
        {
            original: '.' + photo7,
            thumbnail: '.' + photo7
        },
        {
            original: '.' + photo8,
            thumbnail: '.' + photo8
        },
        {
            original: '.' + photo9,
            thumbnail: '.' + photo9
        },
        {
            original: '.' + photo10,
            thumbnail: '.' + photo10
        },
        {
            original: '.' + photo11,
            thumbnail: '.' + photo11
        },
        {
            original: '.' + photo12,
            thumbnail: '.' + photo12
        }
        ];

    const openImage = (e:any) => {
        setZoomImage(e.target.src);
        setOpen(true);
    }

    return (
        <>
        <div className='home'>
            <div className='head-local' style={{backgroundImage: `url(.${local})`}}></div>
            <Container>
                <Row className='laser'>
                    <Col md={12} className='laser-list'>
                        <ul>
                            <li><FaBicycle /> <span>Bicicletário</span></li>
                            <li><BiSolidDrink /> <span>Salão de festas</span></li>
                            <li><FaTableTennisPaddleBall /> <span>Salão de jogos</span></li>
                            <li><IoIosFitness /> <span>Fitness</span></li>
                            <li><MdToys /> <span>Brinquedoteca</span></li>
                            <li><GiKidSlide /> <span>Playgroung</span></li>
                        </ul>
                    </Col>
                    <Col md={12}>
                        <div className='head-laser' style={{backgroundImage: `url(.${laser})`}}></div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className='call'>
                        <span className='says'>"</span>
                        Localizado próximo ao Hospital Municipal da Brasilândia e à futura estação da Linha 6–Laranja, o <strong>Residencial Bella Vista</strong> é garantia de comodidade e valorização da região.
                        <span className='says'>"</span>
                    </Col>
                </Row>
                <Row className='pictures'>
                    <Col md={12}>
                        <ImageGallery thumbnailPosition='bottom' items={images} />
                    </Col>
                </Row>
            </Container>
            <Container className='units'>
                <Row className='torre'>
                    <Col md={12}>
                        <h1><BsDiamondFill />Sobre o Empreendimento</h1>
                    </Col>
                    <Col className='planta-torre' md={12}>
                        <img src={'.' + plantaTorre} width='100%' alt="Residencial Bella Vista - Planta da Torre" onClick={(e) => {openImage(e)}} />
                    </Col>
                    <Col md={12} className='torre-data' style={{paddingLeft: '1rem'}}>
                        <h3>Empreendimento Residencial EHMP</h3>
                        <p>270 Unidades<br />
                        3 Torres<br />
                        Área de Terreno: 3.002m2 (E)<br />
                        Área Total de Construção: 15.588m2<br />
                        Estrutura em Bloco Estrutural</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Container>
                            <Row>
                                <Col md={12}>
                                    <div className='title'>
                                        <h2>Planta 1</h2>
                                    </div>
                                </Col>
                                <Col md={6} className='unit-image first-floor'>
                                    <img src={'.' + planta_1} alt='Residencial Bella Vista - Planta 1' onClick={(e) => {openImage(e)}} />
                                </Col>
                                <Col md={6} className='unit-detail'>
                                    <ul>
                                        <li>47 m2</li>
                                        <li>2 Dormitórios</li>
                                        <li>Sala</li>
                                        <li>Cozinha</li>
                                        <li>Lavanderia</li>
                                        <li>Terraço</li>
                                    </ul>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col md={12}>
                        <Container>
                            <Row>
                                <Col md={12}>
                                    <div className='title'>
                                        <h2>Planta 2</h2>
                                    </div>
                                </Col>
                                <Col md={6} className='unit-image'>
                                    <img src={'.' + planta_2} alt="Residencial Bella Vista - Planta 2" onClick={(e) => {openImage(e)}} />
                                </Col>
                                <Col md={6} className='unit-detail'>
                                    <ul>
                                        <li>47 m2</li>
                                        <li>2 Dormitórios</li>
                                        <li>Sala</li>
                                        <li>Cozinha</li>
                                        <li>Lavanderia</li>
                                    </ul>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container className='contact'>
                <Row>
                    <Col md={12}>
                        <h1><BsDiamondFill />Fale conosco</h1>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type='text'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                type='text'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Motivo</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                            />
                        </Form.Group>
                        <div className='text-end'>
                            <Button>Enviar</Button>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='whatsapp'>
                            <p><strong>Se preferir utilize o whatsapp</strong></p>
                            <RiWhatsappFill /> <span>+55 (11) 90000.0000</span>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className='location'>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.644192127583!2d-46.70366737232707!3d-23.473295571524066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef999b01b72bf%3A0x118bb52ac88cbbc9!2sR.%20Raulino%20Galdino%20da%20Silva%2C%20585%20-%20Jardim%20Maristela%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2002807-000!5e0!3m2!1spt-BR!2sbr!4v1765194990531!5m2!1spt-BR!2sbr" 
                    width="100%" 
                    height="450" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                <Container>
                    <Row>
                        <Col md={12}>
                            <p style={{textAlign: 'center', margin: '2rem 0', color: '#555'}}>Rua Hilário Correia (Frente), Rua Raulino Galdino da Silva (Fundos) <br /><strong>Jardim Maristela – São Paulo/SP</strong></p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={[
            { src: zoomImage }
            ]}
        />
        </>
    )
}

export default Home;