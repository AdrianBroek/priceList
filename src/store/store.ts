// store.js
import { configureStore, MiddlewareArray  } from '@reduxjs/toolkit';

// reducers
import counterReducer from './counterSlice';
import productReducer from './productSlice';
import priceReducer from './priceSlice';
import productsWithPriceReducer from './productsWithPriceSlice'
import themeReducer from './themeSlice'
import userReducer from './userSlice'
import importPriceListReducer from './fetchPriceListSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productReducer,
    priceList: priceReducer,
    productsWithPrice: productsWithPriceReducer,
    theme: themeReducer,
    userData: userReducer,
    priceListToUser: importPriceListReducer,
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store