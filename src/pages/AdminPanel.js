import React, { useState, useEffect } from 'react';
import { useGetAllProductsQuery } from '../features/productsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, updateProduct, deleteProduct, addProduct } from '../features/productsSlice';
import CreateProduct from '../components/ProductCard/CreateProduct';
import EditProduct from '../components/ProductCard/EditProduct';
import DeleteProduct from '../components/ProductCard/DeleteProduct';
import '../styles/Products.css';

export default function AdminPanel() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleCreate = () => setShowCreateModal(true);
    const handleCloseCreate = () => setShowCreateModal(false);
    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };
    const handleCloseEdit = () => setShowEditModal(false);
    const handleDelete = (productId) => {
        setSelectedProduct({ ID: productId });
        setShowDeleteModal(true);
    };
    const handleCloseDelete = () => setShowDeleteModal(false);

    const [orderBy, setOrderBy] = useState('');
    const [product, setProduct] = useState('');
    const [category, setCategory] = useState('');

    const { data } = useGetAllProductsQuery({
        category: category,
        name: product,
        orderBy: orderBy,
    });

    useEffect(() => {
        if (data) {
            dispatch(setProducts(data));
        }
    }, [data, dispatch]);

    const handleProductUpdated = (updatedProduct) => {
        dispatch(updateProduct(updatedProduct));
        handleCloseEdit();
    };

    const handleProductDeleted = (deletedProductId) => {
        dispatch(deleteProduct(deletedProductId));
        handleCloseDelete();
    };

    const handleProductCreated = (newProduct) => {
        dispatch(addProduct(newProduct));
    };

    return (
        <div className='products-body'>
            <h2 className='text-center mb-3 fw-bolder'>Admin Panel</h2>
            <div className='filters'>
                <div className='selects'>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value=''>All categories</option>
                        <option value='Shoes'>Shoes</option>
                        <option value='T-shirts'>T-shirts</option>
                        <option value='Jackets'>Jackets</option>
                    </select>
                </div>
                <div className='selects'>
                    <select
                        value={orderBy}
                        onChange={(e) => setOrderBy(e.target.value)}>
                        <option disabled value='empty' selected>
                            Order by
                        </option>
                        <option value='price_asc'>Lowest price</option>
                        <option value='price_desc'>Highest price</option>
                    </select>
                </div>
                <div className='search-box'>
                    <input
                        type='text'
                        placeholder='Search here'
                        id='searchbar'
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                    />
                </div>
            </div>
            <div className='container'>
                <div className='d-flex flex-column align-items-center w-100'>
                    <div className='d-flex w-100'>
                        <button type="button" className="btn btn-primary btn-sm btn-product mt-2" onClick={handleCreate}>Create product</button>
                    </div>

                    <table className='table bg-body mt-3'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((item) => (
                                <tr key={item.ID}>
                                    <td>{item.ID}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td>{item.stock}</td>
                                    <td>
                                        <button className="btn-product btn btn-warning btn-sm me-2" onClick={() => handleEdit(item)}>Edit</button>
                                        <button className="btn-product btn btn-danger btn-sm" onClick={() => handleDelete(item.ID)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products?.length === 0 && <p className='no-results'>No results</p>}
                </div>
            </div>
            <CreateProduct
                show={showCreateModal}
                handleClose={handleCloseCreate}
                onProductCreated={handleProductCreated}
            />
            {selectedProduct && (
                <>
                    <EditProduct
                        show={showEditModal}
                        handleClose={handleCloseEdit}
                        product={selectedProduct}
                        onProductUpdated={handleProductUpdated}
                    />
                    <DeleteProduct
                        show={showDeleteModal}
                        handleClose={handleCloseDelete}
                        productId={selectedProduct.ID}
                        onProductDeleted={handleProductDeleted}
                    />
                </>
            )}
        </div>
    );
}