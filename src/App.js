import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import WebsiteLayout from './layouts/WebsiteLayout';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Details from './pages/Details';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Cart from './pages/Cart';

import ScrollToTop from './components/ScrollToTop';

import { setUser, setToken } from './features/loggedSlice';
import { useSignInTokenMutation } from './features/usersAPI';

function App() {

  const [signInToken] = useSignInTokenMutation();
  const dispatch = useDispatch();

  async function verifyToken() {
    try {
      let res = await signInToken(localStorage.getItem('token'));
      if (res.data?.success) {
        localStorage.setItem('token', res.data.response.token)
        dispatch(setToken(res.data?.response.token));
        dispatch(setUser(res.data?.response.user));
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      localStorage.removeItem('token');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      verifyToken();
    }
  }, []);

  const user = useSelector((state) => state.logged.user);

  return (
    <BrowserRouter>
      <ScrollToTop />
        <WebsiteLayout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/*' element={<NotFound />} />
            <Route path='/signin' element={!user ? <SignIn /> : <Home />} />
            <Route path='/signup' element={!user ? <SignUp /> : <Home />} />
            <Route path='/products/:id' element={<Details />} />
            <Route path='/profile/:id' element={!user ? <NotFound /> : <Profile />} />
            <Route path='/admin' element={user?.role === 'admin'? <AdminPanel /> : <NotFound />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </WebsiteLayout>
    </BrowserRouter>
  );
}

export default App;
