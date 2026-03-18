import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

// Icons
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
// import { FaYoutube } from "react-icons/fa";
// import { AiFillTikTok } from "react-icons/ai";

import './Footer.scss';

const Footer = () => {

    const location = useLocation();
    const [bioP, setBioP] = useState<boolean>(false);

    useEffect(()=>{
      if(location.pathname.indexOf('/b/') === -1) {
        setBioP(true);
      } else {
        setBioP(false);
      }
    }, []);

    return (
      <>
        { bioP && (

          <div className='footer'>
            <Container>
              <Row>            
                <Col md={6}>
                  <p style={{margin: '1rem 0', fontSize: '1.25rem'}}><strong>Ficou com alguma dúvida?</strong><br /> Teremos o prazer em te atender
                  </p>
                  <p style={{fontSize: '1rem'}}>
                    <a href="mailto:atendimento@afilipro.com.br"><MdEmail /> atendimento@storiesquebombam.com.br</a><br />
                    <a href="https://wa.me/5511937751045?text=AfiliPRO"><IoLogoWhatsapp /> +55 (11) 9 3775.1045</a>
                  </p>
                </Col>
                <Col md={6}>
                  <ul className='social'>
                    <li><strong style={{color: '#ED1E79'}}>Siga-nos nas redes</strong></li>
                    <li>
                      <a href="https://www.instagram.com/stories_que_bombam" target='_blank'>
                        <AiFillInstagram /> @stories_que_bombam
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col md={12}>
                  <p style={{fontSize: '.75rem', marginTop: '1rem', textAlign: 'center'}}>
                    <strong>Stories que Bombam</strong> é um produto de<br /><strong>Cilts Serviços para Internet</strong> <br />CNPJ: 14.512.150/0001-99
                  </p>
                </Col>
              </Row>
            </Container>
        </div>
        )}
      </>
    )
}

export default Footer;