import { useState, useEffect } from 'react'
import { Container, Row, Col, Modal, Button, Navbar, Nav } from 'react-bootstrap'
import Login from './components/Login'
import './App.scss'
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import ProtectRoute from './utils/ProtectedRoute';
import env from './utils/env';

// Routes
import Home from './pages/Home';
import About from './pages/About';
import Client from './pages/Client';
import Clients from './pages/Clients';
import Admin from './pages/Admin';
import Corretor from './pages/Corretor';
import Financeiro from './pages/Financeiro';
import Imprensa from './pages/Imprensa';
import Register from './pages/Register';
import Unidade from './pages/Unidade';
import Unidades from './pages/Unidades';

// Assets
import LogoRBV from './assets/logo-res_bella_vista.svg';
import LogoAKT from './assets/logo-AKT_branco.svg';
import BgHeaderGreen from './assets/bg_green.jpg';

class User {
  name?: string;
  type?: string;
  phone?: string;
  id?: string;
  date?: string;
}

function App() {

  const [show, setShow] = useState(false);
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState<User>({});

  const handleClose = () => {
    if ( window.localStorage.getItem('user') !== '') {
      let user:any = window.localStorage.getItem('user');
      setUser(JSON.parse(user));
      setLogged(true);
    }

    setShow(false);
  }

  const signout = () => {
    const token = window.localStorage.getItem('token');

    axios.get(`${env}api/signout`,
        {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
      ).then(() => {
          setLogged(false);
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('user');
          window.open('/resbellavista/', '_self');
      })
  }

  useEffect(() => {

    const token = window.localStorage.getItem('token');

    if (token) {

      axios.get(`${env}api/validate-token`,
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
    <BrowserRouter basename={window.location.href.indexOf('localhost') > -1 ? '' : '/resbellavista'}>
      <div className='header'>
        <Container>
          <Row>
            <Col md={12}>
              <div className='header-content text-center'>
                <img src={`/resbellavista/${LogoRBV}`} alt="Residêncial Bella Vista" height='90' style={{cursor: 'pointer'}} onClick={()=>{window.open('/resbellavista','_self')}} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className='header-restrict' style={{backgroundImage: `url(${BgHeaderGreen})`}}>
        <Container>
            <Row>
              <Col md={12}>
                <Navbar expand="lg" className="justify-content-end">
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                      <Nav>
                          {/* Área Pública */}
                          {logged && user?.type === 'adm' && 
                            <>
                            {/* Área do Admin */}
                            <Nav.Item><Link to="/admin">Administradores</Link></Nav.Item>
                            <Nav.Item><Link to="/clientes">Clientes</Link></Nav.Item>
                            <Nav.Item><Link to="/cadastro">Corretores</Link></Nav.Item>
                            <Nav.Item><Link to="/unidades">Unidades</Link></Nav.Item>
                            </>
                          }
                          {logged && user?.type === 'crt' && 
                            <>
                            {/* Área do Corretor */}
                            <Nav.Item><Link to="/imprensa">Imprensa</Link></Nav.Item>
                            <Nav.Item><Link to="/cadastro">Clientes</Link></Nav.Item>
                            <Nav.Item><Link to="/corretor">Corretor</Link></Nav.Item>
                            </>
                          }
                          {logged && user?.type === 'clt' && 
                            <>
                            {/* Área do Cliente */}
                            <Nav.Item><Link to="/financeiro">Financeiro</Link> |{" "}</Nav.Item>
                            </>
                          }
                          {logged &&
                            <>
                            {/* Deslogar */}
                            <Nav.Item><Link to='/' onClick={(e)=>{e.preventDefault(); if(confirm('Deseja realmente deslogar?')){signout()}}}>Deslogar</Link></Nav.Item>
                            </>
                          }
                          {!logged &&
                            <Nav.Item><Button onClick={()=>{setShow(true)}}>Área restrita</Button></Nav.Item>
                          }
                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>
                </Col>
            </Row>
          </Container>
        </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectRoute children={<Outlet />} isAuthenticated={logged} />}>
          {/* Rotas logadas */}
          <Route path="/sobre" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cliente/:id_user" element={<Client />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/corretor/:id_corretor" element={<Corretor />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/imprensa" element={<Imprensa />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/unidades" element={<Unidades />} />
          <Route path="/unidade/:id_unidade" element={<Unidade />} />
        </Route>
      </Routes>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
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
            <Col md={6}>
              <ul>
                <li>
                  <a href='http://grupoakt.com.br' target='_blank'>
                    <img src={'.' + LogoAKT} alt="Grupo AKT" height="40" />
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={6} className='text-end' style={{alignContent: 'center'}}>
              Portal desenvolvido por <a href='https://danielhaus.com.br' target='_blank' style={{fontWeight: 'bold'}}>Danielhaus</a>
            </Col>
          </Row>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
