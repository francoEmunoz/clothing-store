import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.cartItems.unshift(newItem);
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        updateCartQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
    },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;