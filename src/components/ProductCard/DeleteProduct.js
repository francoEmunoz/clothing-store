import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDeleteOneProductMutation } from '../../features/productsAPI';
import { showErrorAlert, showSuccessAlert } from '../../utils/alertsUtils';

export default function DeleteProduct({ show, handleClose, productId, onProductDeleted }) {
    const [deleteOneProduct] = useDeleteOneProductMutation();

    const handleDelete = async () => {
        try {
            const result = await deleteOneProduct(productId).unwrap();
            onProductDeleted(result.ID);
            handleClose();
            showSuccessAlert('Product has been deleted');
        } catch (error) {
            showErrorAlert('Failed to delete product');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary btn-sm" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger btn-sm" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}