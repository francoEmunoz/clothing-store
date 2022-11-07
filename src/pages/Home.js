import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
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
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="Accesorios.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
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
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="Accesorios.jpg"
                        alt="Third slide"
                        width="33%"
                    />
                    <img
                        className="d-block w-100"
                        src="Accesorios.jpg"
                        alt="Third slide"
                        width="33%"
                    />
                    <img
                        className="d-block w-100"
                        src="Accesorios.jpg"
                        alt="Third slide"
                        width="33%"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <img src="img-main.jpg" alt="" width="88%"></img>
            <div className='our-products'>
                <h2>Our Products</h2>
            </div>
        </div>
    )
}
