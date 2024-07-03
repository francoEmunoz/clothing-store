import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useEditProductMutation } from '../../features/productsAPI';
import { showErrorAlert, showSuccessAlert } from '../../utils/alertsUtils';
import '../../styles/Products.css'

export default function EditProduct({ show, handleClose, product, onProductUpdated }) {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);
    const [photo, setPhoto] = useState(product.photo);
    const [stock, setStock] = useState(product.stock);
    const [editProduct] = useEditProductMutation();

    useEffect(() => {
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setPhoto(product.photo);
        setStock(product.stock);
    }, [product]);

    const handleSave = async () => {
        try {
            const updatedProduct = { ID: product.ID, name, price: parseInt(price), category, stock: parseInt(stock), photo };
            const result = await editProduct(updatedProduct).unwrap();
            console.log(result)
            onProductUpdated(result);
            handleClose();
            showSuccessAlert('Product successfully updated');
        } catch (error) {
            showErrorAlert('Failed to edit product');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="productPrice"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productCategory" className="form-label">Product category</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productCategory"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPhoto" className="form-label">Photo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productPhoto"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productStock" className="form-label">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            id="productStock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary btn-sm" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary btn-product btn-sm" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}