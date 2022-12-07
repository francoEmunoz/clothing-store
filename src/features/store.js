import { configureStore } from '@reduxjs/toolkit'
import usersAPI from './usersAPI'
import loggedSlice from './loggedSlice'
import productsAPI from './productsAPI'
export const store = configureStore({
    reducer: {
        logged: loggedSlice,
        [usersAPI.reducerPath]: usersAPI.reducer,
        [productsAPI.reducerPath]: productsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersAPI.middleware).concat(productsAPI.middleware)
})