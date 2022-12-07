import React from 'react';
import '../styles/ProductCard.css'

export default function ProductCard(props) {
  return (
    <div className='container-card'>
      <div className='img-card'>
        <img src={props.photo} alt=""></img>
      </div>
      <div className='card-description'>
        <h5>{props.name}</h5>
        <p>$ {props.price}</p>
      </div>
    </div>
  )
}
