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
    } else {
      setUser({});
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
            <Col xs={6}>
              <div className='header-content'>
                <h1>Top Afiliados</h1>
              </div>
            </Col>
            <Col xs={6} className='text-end'>
              <Button className='btn btn-primary' onClick={()=>{setShow(true)}}>Área restrita</Button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className='header-restrict'>
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
          {/* <Route path="/admin" element={<Admin />} /> */}
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
            <Col xs={12}>
              Top Afiliados é um produto de <a href='https://danielhaus.com.br' target='_blank' style={{fontWeight: 'bold'}}>Cilts</a>
            </Col>
          </Row>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
