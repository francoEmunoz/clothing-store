import React from 'react';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity, clearCart } from '../features/cartSlice';
import { showSuccessAlert, showErrorAlert } from '../utils/alertsUtils';
import '../styles/Cart.css'

export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const user = useSelector((state) => state.logged.user);
    const navigate = useNavigate()

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, quantity) => {
        dispatch(updateCartQuantity({ id, quantity }));
    };

    const handlePay = () => {
        if (!user) {
            navigate(`/signin?returnTo=/cart`);
            showErrorAlert('Login to make the purchase')
        } else {
            dispatch(clearCart());
            showSuccessAlert('Your purchase has been successful');
        }
    };

    return (
        <div className='container-cart'>
            <div className="container py-5">
                <h2 className="mb-5 fw-bolder">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <>
                        <p className='cart-empty mb-5'>Your cart is empty :(</p>
                        <button className='btn'>
                            <LinkRouter to='/products' className='btn-return'>Return to the store</LinkRouter>
                        </button>
                    </>
                ) : (
                    <div className="row">
                        <div className="col-lg-8">
                            <ul className="list-group mb-4">
                                {cartItems.map(item => (
                                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="img-thumbnail"
                                            />
                                            <div className="ms-3">
                                                <h5>{item.name}</h5>
                                                <p className="mb-0">US$ {item.price}</p>
                                                <small className="text-muted">Amount: {item.quantity}</small>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                                    className="form-control mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Order summary</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Total
                                            <span>US$ {calculateTotal()}</span>
                                        </li>
                                    </ul>
                                    <button className="btn btn-primary btn-block mt-3" onClick={() => handlePay()}>Pay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}