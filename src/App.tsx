import { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Login from './components/Login'
import './App.scss'
import axios from 'axios';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ProtectRoute from './utils/ProtectedRoute';
import env from './utils/env';

// Routes
import Home from './pages/Home';
import Mae from './pages/Home_mae';
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
import Bio from './pages/Bio';
import Validate from './pages/Validate';
import BioPage from './pages/BioPage';
import Review from './pages/Review';
import Footer from './components/Footer';

// Components
import Header from './components/Header';


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
      <Header logged={logged} user={user} setShow={setShow} signout={signout} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mae" element={<Mae />} />
        <Route path="/link" element={<Validate />} />
        <Route path="/duvidas" element={<About />} />
        <Route path="/plano" element={<Plain />} />
        <Route path="/review" element={<Review />} />
        <Route path="/b/:nick" element={<BioPage />} />
        <Route path="/plano/:plainId" element={<Register />} />
        <Route element={<ProtectRoute children={<Outlet />} />}>
          <Route path="/conta" element={<Count />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:page" element={<Produtos />} />
          <Route path="/produtos/:categoria/:page" element={<Produtos />} />
          <Route path="/pagamento/sucesso" element={<Sucesso />} />
          <Route path="/pagamento/falha" element={<Falha />} />
          <Route path="/pagamento/pendente" element={<Pendente />} />
          <Route path="/usuarios" element={<Users />} />
        </Route>
        {/* Rotas logadas */}
        <Route path="/tutoriais" element={<Learn />} />
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

      <Footer />
    </BrowserRouter>
  )
}

export default App
