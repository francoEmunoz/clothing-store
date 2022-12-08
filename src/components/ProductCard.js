import React from 'react';
import { Link as LinkRouter } from "react-router-dom";
import '../styles/ProductCard.css';

export default function ProductCard(props) {
  return (
    <div className='container-card'>
      <div className='img-card'>
        <LinkRouter to={`/products/${props.id}`} className="name">
          <img src={props.photo} alt=""></img>
        </LinkRouter>
      </div>
      <div className='card-description'>
        <LinkRouter to={`/products/${props.id}`} className="name">
          <h5>{props.name}</h5>
        </LinkRouter>
        <p>US$ {props.price}</p>
      </div>
    </div>
  )
}
