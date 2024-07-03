import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useGetAllCommentsQuery, useCreateCommentMutation, useEditCommentMutation } from '../../features/commentsAPI';
import { setComments, addComment, updateComment, deleteComment } from '../../features/commentsSlice';
import DeleteComment from './DeleteComment';
import { showErrorAlert } from '../../utils/alertsUtils';
import { calculateTimeAgo } from '../../utils/timeUtils';
import '../../styles/Comment.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Comments(props) {
    const { data } = useGetAllCommentsQuery();
    const user = useSelector((state) => state.logged.user);
    const product_id = parseInt(props.ID)

    const [createComment] = useCreateCommentMutation();
    const [updateCommentMutation] = useEditCommentMutation();
    const [content, setContent] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const handleDelete = (commentId) => {
        setCommentToDelete(commentId);
        setShowDeleteModal(true);
    };

    const handleCloseDelete = () => {
        setShowDeleteModal(false);
        setCommentToDelete(null);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            dispatch(setComments(data));
        }
    }, [data, dispatch]);

    const handleCommentCreated = (newComment) => {
        dispatch(addComment(newComment));
    };

    const handleCommentDeleted = (deletedCommentId) => {
        dispatch(deleteComment(deletedCommentId));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate(`/signin?returnTo=/products/` + product_id);
            showErrorAlert('You must log in to comment')
        }
        try {
            const newComment = {
                content,
                user_id: user?.ID,
                product_id: product_id,
                created_at: new Date().toISOString()
            };
            const result = await createComment(newComment).unwrap();
            handleCommentCreated(result);
            setContent('');
        } catch (error) {
            console.error('Failed to create comment:', error);
        }
    };

    const handleEditSave = async (e, commentId) => {
        e.preventDefault();
        try {
            const updatedComment = {
                ID: commentId,
                content: editContent,
                user_id: user?.ID,
                product_id: product_id,
                updated_at: new Date().toISOString()
            };
            const result = await updateCommentMutation(updatedComment).unwrap();
            dispatch(updateComment(result));
            setEditingCommentId(null);
            setEditContent('');
        } catch (error) {
            showErrorAlert('Failed to update comment');
        }
    };

    const filteredComments = useSelector((state) => {
        const comments = state.comments?.items?.filter((item) => item.product_id === product_id) ?? [];
        return comments.map(comment => ({
            ...comment,
            timeAgo: calculateTimeAgo(comment.CreatedAt),
            edited: comment.UpdatedAt !== comment.CreatedAt
        }));
    });

    return (
        <div className='bg-body-tertiary container mt-5'>
            <h3 className='text-comment mb-5'>Product Feedback</h3>
            <div className='card'>
                <div className='card-body'>
                    <form onSubmit={handleSave}>
                        <div className='mb-3'>
                            <label htmlFor='comment' className='form-label text-comment'>Leave your feedback</label>
                            <textarea
                                id='comment'
                                className='form-control'
                                rows='1'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>
                        <button type='submit' className='btn btn-primary btn-sm btn-comment'>Comment</button>
                    </form>
                </div>
            </div>
            <div className='mt-4'>
                {filteredComments.length > 0 ? (
                    filteredComments.map((item) => (
                        <div className='card mb-2' key={item.ID}>
                            <div className='card-body py-2'>
                                {editingCommentId === item.ID ? (
                                    <form onSubmit={(e) => handleEditSave(e, item.ID)}>
                                        <div className='mb-3'>
                                            <textarea
                                                className='form-control'
                                                rows='1'
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <button type='submit' className='btn btn-primary btn-sm me-2 btn-comment'>Save</button>
                                        <button onClick={() => setEditingCommentId(null)} className='btn btn-secondary btn-sm'>Cancel</button>
                                    </form>
                                ) : (
                                    <>
                                        <p className='text-muted mb-2' style={{ fontSize: '15px' }}>
                                            {item.user.name} {item.user.lastname} {item.edited && "(edited)"} - {item.timeAgo} ago
                                        </p>
                                        <p className='card-text mb-2' style={{ fontSize: '15px' }} >{item.content}</p>
                                        {user?.ID === item.user_id && (
                                            <div className='btn-group'>
                                                <button onClick={() => {
                                                    setEditingCommentId(item.ID);
                                                    setEditContent(item.content);
                                                }} className="btn btn-warning btn-sm me-2 btn-comment">Edit</button>
                                                <button onClick={() => handleDelete(item.ID)} className="btn btn-danger btn-sm">Delete</button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-comment'>There are no comments yet</p>
                )}
            </div>
            {commentToDelete && (
                <DeleteComment
                    show={showDeleteModal}
                    handleClose={handleCloseDelete}
                    commentId={commentToDelete}
                    onCommentDeleted={handleCommentDeleted}
                />
            )}
        </div>
    );
}