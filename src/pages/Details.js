import React, { useState, useEffect } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { useGetProductQuery } from '../features/productsAPI';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/Details.css'

export default function Details() {

    const { id } = useParams()
    const user = useSelector((state) => state.logged.user)
    const { data: product } = useGetProductQuery(id)
    console.log(product)

    // useEffect(()=>{
    //     getProduct(id).then(res => {
    //         if(res.data?.success){
    //             setProduct(res.data?.response)
    //         }
    //     }).catch(error=> console.log(error))
    // }, [reload])

    return (
        <div className='detail-body'>
            {/* {user && user.role === "admin" && (
                <button className="options" onClick={() => setEdit(!edit)}>
                    <img src="/assets/icons/option.png" alt="icon" />
                </button>
            )}
            {edit && (
                <div className="modal-container" onClick={() => setEdit(!edit)}>
                    <EditProduct id={id} />
                    <DeleteProductButton id={id} />
                </div>
            )} */}
            <div className='image-detail'>
                <img src={product?.response.photo} alt={product?.name} />
            </div>
            <div className='info-detail'>
                <p className='category'>{product?.response.category}</p>
                <p className='name-p'>{product?.response.name}</p>
                <h3 className='price'>${product?.response.price}</h3>
                <LinkRouter to='/products'>Continue shopping!</LinkRouter>
            </div>
            {/* {modalEditProduct && (
                <Modal>
                    <EditFormProduct data={product} />
                </Modal>
            )}
            {modalDeleteProduct && (
                <Modal>
                    <DeleteProduct />
                </Modal>
            )} */}
        </div>
    )
}
