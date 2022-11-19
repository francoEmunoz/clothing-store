import React from 'react';
import Footer from '../components/Footer';
import '../styles/Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from "react-redux";
import SignOut from '../components/SignOut';
import 'bootstrap/dist/css/bootstrap.min.css';

function WebsiteLayout(props) {

  const user = useSelector((state) => state.logged.user);

  return (
    <>
      <div>
        <Navbar className='container-navbar' expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img src="logo.png" alt="" width="150px"></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/" className='font-navbar'>Home</Nav.Link>
                <Nav.Link href="/products" className='font-navbar'>Products</Nav.Link>
                <Nav.Link href="/contact" className='font-navbar'>Contact</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="#memes">
                  <img src="https://cdn-icons-png.flaticon.com/512/7878/7878683.png" alt="" height="35px"></img>
                </Nav.Link>
              </Nav>
              <Nav>
                {user ? (
                  <SignOut/>
                ) : (
                  <Nav.Link href="/signin" className='font-navbar'>Login</Nav.Link>
                )
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {props.children}
      <Footer />
    </>
  )
}

export default WebsiteLayout

