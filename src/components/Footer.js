import React from 'react';
import { Link as LinkRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import '../styles/Footer.css';

export default function Footer() {

  const user = useSelector((state) => state.logged.user);

  const [scrollToTop, setScrollToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrollToTop(true)
      } else {
        setScrollToTop(false)
      }
    })
  }, [])

  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className='container-footer-main'>
      <div className='container-footer'>
        <div className='container-logo-pages'>
          <div>
            <img src="logo.png" alt="" width="150px"></img>
          </div>
          <div className='footer-pages'>
            <LinkRouter to="/">Home</LinkRouter>
            <LinkRouter to="/products">Products</LinkRouter>
            <LinkRouter to="/contact">Contact</LinkRouter>
            {user ? null
              : (
                <>
                  <LinkRouter to="/signin">Login</LinkRouter>
                  <LinkRouter to="/signup">Sign Up</LinkRouter>
                </>
              )}
          </div>
        </div>
        <div className='container-networks'>
          <img src="https://cdn-icons-png.flaticon.com/512/3670/3670209.png" alt="" width="35px" height="35px"></img>
          <img src="https://cdn-icons-png.flaticon.com/512/4138/4138126.png" alt="" width="35px" height="35px"></img>
          <img src="https://cdn-icons-png.flaticon.com/512/145/145802.png" alt="" width="35px" height="35px"></img>
          <img src="https://cdn-icons-png.flaticon.com/512/4494/4494488.png" alt="" width="35px" height="35px"></img>
        </div>
      </div>
      <p>© 2022 Dripping, Inc. All rights reserved.</p>
      {scrollToTop && (
        <div>
          <img className='scroll' src="https://cdn-icons-png.flaticon.com/512/892/892682.png" alt="scrolltopage" onClick={scroll}></img>
        </div>
      )}
    </div>
  )
}
