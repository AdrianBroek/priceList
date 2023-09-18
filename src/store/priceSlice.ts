import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PriceList from "../components/priceList";
import { SinglePriceList, SinglePriceListArea } from "../components/types/SinglePriceList";
import { Dispatch } from 'redux';
import { EditInputState } from "../components/types/EditPricelist";

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
        editPriceListField: (state, action: PayloadAction<EditInputState>) => {
            const editedPriceList = action.payload;
            state.priceTable.map((price:any) => {
               if(price.id == editedPriceList.priceId){
                price[editedPriceList.inputName] = editedPriceList.newValue;
               }
               return price;
            });            

        },
        resetPriceList: (state) => {
            return initialState
        }
    }
})

export const { addPriceList, removePriceList, resetPriceList, editPriceListField } = priceListSlice.actions;
export default priceListSlice.reducer;