import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductQuery } from '../features/productsAPI';
import { addToCart } from '../features/cartSlice';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comments/Comments';
import { showSuccessAlert } from '../utils/alertsUtils';
import '../styles/Details.css';

export default function Details() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data: product, isLoading, isError } = useGetProductQuery(id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error al cargar el producto.</div>;
    }

    if (!product) {
        return <div>Producto no encontrado.</div>;
    }

    const { name, photo, price, category, stock } = product;

    const handleAddToCart = () => {
        const newItem = {
            id: product.ID,
            name: product.name,
            price: product.price,
            imageUrl: product.photo,
            quantity: 1
        };
        dispatch(addToCart(newItem));
        showSuccessAlert('Product added to cart')
    };

    return (
        <>
            <div className='detail-body'>
                <div className='image-detail'>
                    <img src={photo} alt={name} />
                </div>
                <div className='info-detail'>
                    <div className='container-detail'>
                        <p className='name-p'>{name}</p>
                        <h3 className='price'>${price}</h3>
                        <p className='category'>{category}</p>
                    </div>
                    <div className='add-to-cart'>
                        <p>{stock} Available</p>
                        <button type='button' onClick={handleAddToCart}>Add to cart</button>
                    </div>
                    <LinkRouter to='/products'>Return to the store</LinkRouter>
                </div>
                <Comments ID= {id} />
            </div>
        </>
    );
}