import { useState, useEffect } from 'react'
import { Container, Row, Col, Modal, Button, Nav, Navbar } from 'react-bootstrap'
import Login from './components/Login'
import './App.scss'
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import ProtectRoute from './utils/ProtectedRoute';
import env from './utils/env';

// Routes
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Register from './components/Register';
import About from './pages/About';
import Learn from './pages/Learn';
import Count from './pages/Count';
import Sucesso from './pages/Sucesso';
import Falha from './pages/Falha';
import Pendente from './pages/Pendente';
import Users from './pages/Users';
import Plain from './pages/Plain';

// Assets
import logo from './assets/logo_full.svg';

// Icons
import { RiLoginBoxFill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";


class User {
  name?: string;
  type?: string;
  phone?: string;
  id?: string;
  date?: string;
}

function App() {

  const [show, setShow] = useState(false);
  const [logged, setLogged] = useState<boolean>(false);
  const [user, setUser] = useState<User>({});

  const handleClose = () => {
    console.log(window.localStorage.getItem('user'));
    if ( window.localStorage.getItem('user') !== null) {
      let user:any = window.localStorage.getItem('user');
      setUser(JSON.parse(user));
      setLogged(true);
      window.open('/conta', '_self')
    } else {
      setUser({});
      setLogged(false);
    }

    setShow(false);
  }

  const signout = () => {
    const token = window.localStorage.getItem('token');

    axios.get(`${env}/api/signout`,
        {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
      ).then(() => {
          setLogged(false);
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('user');
          window.open('/', '_self');
      })
  }

  useEffect(() => {

    const token = window.localStorage.getItem('token');

    if (token) {

      axios.get(`${env}/api/validate-token`,
        {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
      ).then(() => {
          setLogged(true);
          let userData = JSON.parse(window.localStorage.getItem('user') || '{}');
          setUser(userData);
      }).catch(() => {
        setLogged(false);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
      })
    }
  }, [])

  return (
    <BrowserRouter>
      <div className='header-restrict'>
        <Navbar expand="lg" className='navbar-dark'>
          <Container>
            <Navbar.Brand href="/" style={{ padding: '10px 0'}}><img src={logo} alt="AfiliPRO" height={30} /></Navbar.Brand>
            {!logged && (
              <Button className='btn btn-primary' id='login' onClick={()=>{setShow(true)}}>Logar <RiLoginBoxFill /></Button>
            )}
            {logged && (
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            )}
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
              <Nav>
                {logged && (
                    <>
                      <span style={{color: '#FFF', display: 'block', margin: '1rem 0 .5rem'}}>Olá, {user.name}</span>
                    </>
                  )}
                <Nav.Item>
                  <Link to="/">Início</Link>
                </Nav.Item>
                {logged && (user.type === 'u' || user.type === 'a') && (
                  <>
                    <Nav.Item>
                      <Link to="/produtos">Produtos</Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link to="/conta">Minha conta</Link>
                    </Nav.Item>
                  </>
                )}
                {logged && user.type === 'a' && (
                  <>
                    <Nav.Item>
                      <Link to="/usuarios">Usuários</Link>
                    </Nav.Item>
                  </>
                )}
                {logged && user.type === 'p' && (
                  <>
                    <Nav.Item>
                      <Link to="/conta">Minha conta</Link>
                    </Nav.Item>
                  </>
                )}
                {!logged && (
                  <>
                    <Nav.Item>
                      <Link to="/cadastro">Cadastre-se</Link>
                    </Nav.Item> 
                  </>
                )}
                {user?.type !== 'a' && (
                  <>
                    <Nav.Item>
                          <Link to="/tutoriais">Como cadastrar os produtos?</Link>
                        </Nav.Item>
                    <Nav.Item>
                      <Link to="/duvidas">Dúvidas?</Link>
                    </Nav.Item>
                  </>
                )}
                <Nav.Item className='text-end'>
                  {logged && (
                    <>
                      <Button onClick={(e)=>{e.preventDefault();if(confirm('Deseja realmente deslogar?')){signout()}}}>Deslogar <RiLogoutBoxRFill /></Button>
                    </>
                  )}
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/duvidas" element={<About />} />
        <Route path="/conta" element={<Count />} />
        <Route path="/plano" element={<Plain />} />
        <Route element={<ProtectRoute children={<Outlet />} />}>
          <Route path="/produtos" element={<Produtos />} />
        </Route>
        {/* Rotas logadas */}
        <Route path="/tutoriais" element={<Learn />} />
        <Route path="/pagamento/sucesso" element={<Sucesso />} />
        <Route path="/pagamento/falha" element={<Falha />} />
        <Route path="/pagamento/pendente" element={<Pendente />} />
        <Route path="/usuarios" element={<Users />} />
      </Routes>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login show={show} setShow={setShow} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='footer'>
        <Container>
          <Row>            
            <Col md={4}>
              <p style={{margin: '1rem 0', fontSize: '1.25rem', color: 'orangered'}}><strong>Ficou com alguma dúvida?</strong><br /> Teremos o prazer em te atender
              </p>
              <p style={{fontSize: '1rem'}}>
                <a href="mailto:atendimento@afilipro.com.br"><MdEmail style={{color: 'orangered'}} /> atendimento@afilipro.com.br</a><br />
                <a href="https://wa.me/5511937751045?text=AfiliPRO"><IoLogoWhatsapp style={{color: 'orangered'}} /> +55 (11) 9 3775.1045</a>
              </p>
            </Col>
            <Col md={4}>
              <ul className='social'>
                <li><strong>Siga-nos nas redes</strong></li>
                <li>
                  <a href="https://www.instagram.com/afilipro_oficial" target='_blank'>
                    <AiFillInstagram style={{color: 'orangered'}} /> @afilipro_ocifial
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com/@afilipro_oficial" target='_blank'>
                    <AiFillTikTok style={{color: 'orangered'}} /> @afilipro_ocifial
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/@afilipro_oficial" target='_blank'>
                    <FaYoutube style={{color: 'orangered'}} /> @afilipro_ocifial
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={4}>
              <p style={{fontSize: '.75rem', marginTop: '1rem'}}><strong>AfiliPRO</strong> é um produto de <strong style={{color: 'orangered'}}>Cilts Serviços para Internet</strong> <br />CNPJ: 14.512.150/0001-99</p>
            </Col>
          </Row>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
