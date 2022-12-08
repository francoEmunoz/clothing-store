import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import WebsiteLayout from './layouts/WebsiteLayout';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Details from './pages/Details';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './features/loggedSlice';
import { useSignInTokenMutation } from './features/usersAPI';
import ScrollToTop from './components/ScrollToTop';

function App() {

  const [signInToken] = useSignInTokenMutation();
  const dispatch = useDispatch();
  async function verifyToken() {
    try {
      let res = await signInToken(localStorage.getItem('token'));
      if (res.data?.success) {
        localStorage.setItem('token', res.data.response.token)
        dispatch(setUser(res.data?.response.user));
      } else {
        console.log(res)
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.log(error);
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
          </Routes>
        </WebsiteLayout>
    </BrowserRouter>
  );
}

export default App;
