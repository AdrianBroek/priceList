// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import productReducer from './productSlice';
import priceReducer from './priceSlice';
import productsWithPriceReducer from './productsWithPriceSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productReducer,
    priceList: priceReducer,
    productsWithPrice: productsWithPriceReducer,
  },
});

export default store;
