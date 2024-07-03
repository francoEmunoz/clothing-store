import React from 'react';
import Footer from '../components/Footer';
import '../styles/Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from "react-redux";
import SignOut from '../components/SignOut';
import 'bootstrap/dist/css/bootstrap.min.css';

function WebsiteLayout(props) {

  const user = useSelector((state) => state.logged.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div>
        <Navbar className='container-navbar' expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img src="/logo.png" alt="" width="150px"></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/" className='font-navbar'>Home</Nav.Link>
                <Nav.Link href="/products" className='font-navbar'>Products</Nav.Link>
                <Nav.Link href="/contact" className='font-navbar'>Contact</Nav.Link>
                {user ? (
                  <><Nav.Link href="/admin" className='font-navbar'>Admin Panel</Nav.Link></>
                ) : null}
              </Nav>
              <Nav>
                <Nav.Link href="/cart" className='cart-icon'>
                <img src="https://cdn-icons-png.flaticon.com/512/7878/7878683.png" alt="" height="35px"></img>
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </Nav.Link>
              </Nav>
              <Nav>
                {user ? (
                  <>
                    <Nav.Link href={`/profile/${user?.ID}`} className='font-navbar'>Profile</Nav.Link>
                    <SignOut />
                  </>
                ) : (
                  <Nav.Link href="/signin" className='font-navbar'>Login</Nav.Link>
                )}
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

