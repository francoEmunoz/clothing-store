import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCreateProductMutation } from '../../features/productsAPI';
import { showErrorAlert, showSuccessAlert } from '../../utils/alertsUtils';
import '../../styles/Products.css'

export default function CreateProduct({ show, handleClose, onProductCreated }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState('');
    const [stock, setStock] = useState('');
    const [createProduct] = useCreateProductMutation();

    const handleSave = async () => {
        try {
            const newProduct = { name, price: parseInt(price), category, stock: parseInt(stock), photo };
            const result = await createProduct(newProduct).unwrap();
            onProductCreated(result);
            handleClose();
            showSuccessAlert('Product successfully added');
        } catch (error) {
            showErrorAlert('Failed to create product');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Product</Modal.Title>
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
                            required
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
                            required
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
                            required
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
                            required
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
                            required
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary btn-sm" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary btn-product btn-sm" onClick={handleSave}>
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};