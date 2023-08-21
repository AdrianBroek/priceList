import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PriceList from "../components/priceList";
import { SinglePriceList } from "../components/types/SinglePriceList";

interface PriceList {
    priceTable: SinglePriceList[]
}

const initialState: PriceList = {
    priceTable: []
}

const priceListSlice = createSlice({
    name: "priceTable",
    initialState,
    reducers: {
        addPriceList: (state, action: PayloadAction<SinglePriceList[]>) => {
            state.priceTable = [
                ...state.priceTable,
                ...action.payload,
            ]
        },
        removePriceList: (state, action: PayloadAction<number>) => {
            state.priceTable = state.priceTable.filter(item => item.id != action.payload);
        }
    }
})

export const { addPriceList, removePriceList } = priceListSlice.actions;
export default priceListSlice.reducer;