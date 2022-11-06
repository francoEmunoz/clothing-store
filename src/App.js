import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WebsiteLayout from './layouts/WebsiteLayout';

function App() {
  return (
    <BrowserRouter>
      <WebsiteLayout>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </WebsiteLayout>
    </BrowserRouter>
  );
}

export default App;
