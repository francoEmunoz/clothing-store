import React, { useState } from 'react';
import { useGetAllProductsQuery } from '../features/productsAPI';
import ProductCard from '../components/ProductCard';
import '../styles/Products.css'

export default function Products() {

  const [sort, setSort] = useState('')
  const [product, setProduct] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const { data, isLoading } = useGetAllProductsQuery({ sort: sort, category: category, product: product, subcategory: subcategory })
  let products = data?.response.products



  return (
    <div className='products-body'>
      <div className='filters'>
        <div className='selects'>
          <select onChange={(e) => {
            setCategory(e.target.value)
            setSubcategory('')
          }
          }
          >
            <option value=''>Categories</option>
            <option value='Shoes'>Shoes</option>
            <option value='T-shirts'>T-shirts</option>
            <option value='Jackets'>Jackets</option>
          </select>
        </div>
        <div className='selects'>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value=''>Order by</option>
            <option value='1'>Lowest price</option>
            <option value='-1'>Highest price</option>
          </select>
        </div>
        <div className='search-box'>
          <input type="text" placeholder='Search here' id='searchbar' value={product} onChange={(e) => setProduct(e.target.value)} />
        </div>
      </div>
      <div className='cards-container'>
          <>
            <h2>{category === "" ? 'All products' : category}</h2>
            {
              products?.map(item =>
                <ProductCard key={item._id}
                  id={item._id}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  photo={item.photo}
                  stock={item.stock}
                />)
            }
            {
              products?.length === 0 && <p>No results</p>
            }
          </>
      </div>
    </div>
  )
}
