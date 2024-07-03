import React from 'react';
import { Link as LinkRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/ProductCard.css';

export default function ProductCard(props) {
  return (
    <div className='container-card card'>
      <div className='img-card card-img-top'>
        <LinkRouter to={`/products/${props.id}`} className="name">
          <img src={props.photo} alt="" className="img-fluid"></img>
        </LinkRouter>
      </div>
      <div className='card-body card-description'>
        <LinkRouter to={`/products/${props.id}`} className="name">
          <h5 className="card-title">{props.name}</h5>
        </LinkRouter>
        <p className="card-text">US$ {props.price}</p>
        <div className="card-actions d-flex justify-content-end">
        </div>
      </div>
    </div>
  );
}