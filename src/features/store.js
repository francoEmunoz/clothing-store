import { configureStore } from '@reduxjs/toolkit'
import usersAPI from './usersAPI'
import loggedSlice from './loggedSlice'
import productsAPI from './productsAPI'
import productsSlice from './productsSlice'
import commentsAPI from './commentsAPI'
import commentsSlice from './commentsSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
    reducer: {
        logged: loggedSlice,
        cart: cartReducer,
        products: productsSlice,
        comments: commentsSlice,
        [usersAPI.reducerPath]: usersAPI.reducer,
        [productsAPI.reducerPath]: productsAPI.reducer,
        [commentsAPI.reducerPath]: commentsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersAPI.middleware).concat(productsAPI.middleware).concat(commentsAPI.middleware)
})