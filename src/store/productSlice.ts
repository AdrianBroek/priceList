// counterSlice.js
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../components/types/Product';

export const fetchProductFromUser = createAsyncThunk(
    'products/fetchProductFromUser',
    async(userId: number | string, thunkAPI)=>{
        const databaseURL = "https://tester-a7ca6-default-rtdb.europe-west1.firebasedatabase.app"
        const path = `/userId/${userId}/productList.json`; // Ścieżka do danych w bazie
        const res = await fetch(databaseURL+path)
        const items = await res.json()
        return items;
    }
)

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
        resetProducts: (state) => {
            state.productList = initialState.productList;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProductFromUser.pending, (state)=>{
            // console.log('pending')
        })
        .addCase(fetchProductFromUser.fulfilled,(state, action: any)=>{
            // console.log('fulfilled')
            // console.log(action.payload)
            state.productList = action.payload;
        })
        .addCase(fetchProductFromUser.rejected, (state)=> {
            // console.log('rejected')
        })
    }
})


export const { fetchProductsSuccess, resetProducts } = productSlice.actions;
export default productSlice.reducer;