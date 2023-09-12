import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PriceList from "../components/priceList";
import { SinglePriceList } from "../components/types/SinglePriceList";
import { Dispatch } from 'redux';


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
        removePriceList: (state, action: PayloadAction<number[]>) => {
            const idToDelete = action.payload
            state.priceTable = state.priceTable.filter(item => !idToDelete.includes(item.id))
        },
        resetPriceList: (state) => {
            return initialState
        }
    }
})

export const { addPriceList, removePriceList, resetPriceList } = priceListSlice.actions;
export default priceListSlice.reducer;