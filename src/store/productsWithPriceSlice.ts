import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { ProductsWithPriceList } from "../components/types/ProductsWithPrice";

const initialState: ProductsWithPriceList[] = []

const productsWithPriceSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        addProductsWithPrice: (state, action: PayloadAction<ProductsWithPriceList[]>) => {
            return action.payload
        }
    }
})

export const {addProductsWithPrice} = productsWithPriceSlice.actions
export default productsWithPriceSlice.reducer;