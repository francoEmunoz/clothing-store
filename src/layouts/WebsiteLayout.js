import React from 'react';
import Footer from '../components/Footer';
import '../styles/Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function WebsiteLayout(props) {

  return (
    <>
      <div>
        <Navbar className='container-navbar'>
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home" className='font-navbar'>Home</Nav.Link>
                <Nav.Link href="#products" className='font-navbar'>Products</Nav.Link>
                <Nav.Link href="#contact" className='font-navbar'>Contact</Nav.Link>
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

