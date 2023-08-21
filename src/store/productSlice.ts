// counterSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../components/types/Product';


interface ProductState {
    productList: Product[];
}

interface FetchProductsAction {
    quantity: string;
    payload: Product[];
}

const initialState: ProductState = {
    productList: []
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.productList = action.payload;
        },

    }
})


export const { fetchProductsSuccess } = productSlice.actions;
export default productSlice.reducer;