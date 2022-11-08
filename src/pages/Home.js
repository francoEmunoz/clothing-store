import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { Link as LinkRouter } from "react-router-dom";
import '../styles/Home.css';

export default function Home() {
    return (
        <div className='home-body'>
            <Carousel className='carousel-home'>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="dripping.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="shoes.png"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>SHOES</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="Accesorios.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>JACKETS</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className='call-to-action'>
            <LinkRouter to="/products"><Button variant="warning" className='btn-action'>Go to Products</Button></LinkRouter>
            </div>
        </div>
    )
}
