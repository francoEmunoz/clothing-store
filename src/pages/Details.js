import React, { useState, useEffect } from 'react';
import { Link as LinkRouter, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../features/productsAPI';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function Details() {

    const { id } = useParams()
    const user = useSelector((state) => state.logged.user)
    const {data: product} = useGetProductQuery(id)

    // useEffect(()=>{
    //     getProduct(id).then(res => {
    //         if(res.data?.success){
    //             setProduct(res.data?.response)
    //         }
    //     }).catch(error=> console.log(error))
    // }, [reload])

    return (
        <div className='detail'>
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
            <div className='image'>
                <img src={product?.photo} alt={product?.name} />
            </div>
            <div className='info-p'>
                <p className='category'>{product?.category}</p>
                <p className='name-p'>{product?.name}</p>
                <p className='description'>{product?.description}</p>
                <h3 className='price'>${product?.price}</h3>
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
