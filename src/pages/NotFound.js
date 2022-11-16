import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../styles/NotFound.css'

function NotFound() {
    return (
        <div className='container-body-not-found'>
            <div className='container-not-found'>
                <img src="https://cdn-icons-png.flaticon.com/128/8943/8943442.png" alt=""></img>
                <p>The page you are looking for not available!</p>
                <LinkRouter to="/"><Button variant="warning" className='btn-action'>Go to Home</Button></LinkRouter>
            </div>
        </div>
    )
}

export default NotFound