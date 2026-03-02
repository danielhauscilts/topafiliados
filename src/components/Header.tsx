import { useEffect, useState } from 'react';
import { Container, Button, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

// Assets
import logo from '../assets/logo.png';

// Icons
import { RiLoginBoxFill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";

import './Header.scss'

const Header = (props: {logged: any, user: any, setShow: any, signout: any}) => {

    const location = useLocation();
    const [bioP, setBioP] = useState<boolean>(false);

    const logged = props.logged;
    const user = props.user;
    const setShow = props.setShow;
    const signout = props.signout;

    useEffect(()=>{
      if(location.pathname.indexOf('/b/') === -1) {
        setBioP(true);
      } else {
        setBioP(false);
      }
    }, []);

    return (
      <>
        {bioP && (

          <div className='header-restrict'>
            <Navbar expand="lg" className='navbar-light'>
              <Container>
                <Navbar.Brand href="/" style={{ padding: '10px 0'}}><img src={logo} alt="Stories que Bombam" /></Navbar.Brand>
                {!logged && (
                  <Button className='btn btn-primary d-lg-none' id='login' onClick={()=>{setShow(true)}}>Logar <RiLoginBoxFill /></Button>
                )}
                {logged && (
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                )}
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                  <Nav>
                    {logged && (user.type === 'u' || user.type === 'a') && (
                      <>
                        <Nav.Item>
                          <Link to="/produtos">Produtos</Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Link to="/bio">Página personalizada</Link>
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
                    <Nav.Item className='text-end'>
                      {logged && (
                        <>
                          <Button onClick={(e)=>{e.preventDefault();if(confirm('Deseja realmente deslogar?')){signout()}}}>Deslogar <RiLogoutBoxRFill /></Button>
                        </>
                      )}
                      {!logged && (
                        <Button className='btn btn-primary d-xs-none d-md-block' id='login' onClick={()=>{setShow(true)}}>Logar <RiLoginBoxFill /></Button>
                      )}
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        )}
      </>
    )
}

export default Header;