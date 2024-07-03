import React, { useState, useEffect } from 'react';
import { useGetAllProductsQuery } from '../features/productsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../features/productsSlice';
import ProductCard from '../components/ProductCard/ProductCard';
import '../styles/Products.css';

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

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

  return (
    <div className='products-body'>
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
      <div className='cards-container'>
        <>
          <h2>{category === '' ? 'All products' : category}</h2>
          <div className='d-flex flex-column align-items-center w-100'>
            <div className='container-cards'>
              {products?.map((item) => (
                <ProductCard
                  key={item.ID}
                  id={item.ID}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  photo={item.photo}
                  stock={item.stock}
                />
              ))}
            </div>
          </div>
          {products?.length === 0 && <p className='no-results'>No results :(</p>}
        </>
      </div>
    </div>
  );
}