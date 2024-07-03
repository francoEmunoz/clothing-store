import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDeleteCommentMutation } from '../../features/commentsAPI';
import { showErrorAlert, showSuccessAlert } from '../../utils/alertsUtils';

export default function DeleteComment({ show, handleClose, commentId, onCommentDeleted }) {
    const [deleteComment] = useDeleteCommentMutation();

    const handleDelete = async () => {
        try {
            const result = await deleteComment(commentId).unwrap();
            onCommentDeleted(result.ID);
            handleClose();
            showSuccessAlert('Comment has been deleted')
        } catch (error) {
            showErrorAlert('Failed to delete comment')
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
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