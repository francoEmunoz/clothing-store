import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
    addProduct(state, action) {
        const newProduct = action.payload;
        state.items.unshift(newProduct);
      },
    updateProduct(state, action) {
      const updatedProduct = action.payload;
      const index = state.items.findIndex((p) => p.ID === updatedProduct.ID);
      if (index !== -1) {
        state.items[index] = updatedProduct;
      }
    },
    deleteProduct(state, action) {
      const deletedProductId = action.payload;
      state.items = state.items.filter((p) => p.ID !== deletedProductId);
    },
  },
});

export const { setProducts, updateProduct, deleteProduct, addProduct } = productsSlice.actions;

export default productsSlice.reducer;