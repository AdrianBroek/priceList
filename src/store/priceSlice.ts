import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SinglePriceList, SinglePriceListArea } from "../components/types/SinglePriceList";
import { EditInputState } from "../components/types/EditPricelist";

interface PriceListState {
    priceTable: SinglePriceList[];
}

const initialState: PriceListState = {
    priceTable: []
}

// Akcja asynchroniczna dodawania cennika
export const addPriceList = createAsyncThunk(
    'priceList/addPriceListAsync',
    async (payload: SinglePriceList[]) => {
        return payload;
    }
);

const priceListSlice = createSlice({
    name: "priceList",
    initialState,
    reducers: {
        removePriceList: (state, action: PayloadAction<number[]>) => {
            const idToDelete = action.payload;
            state.priceTable = state.priceTable.filter(item => !idToDelete.includes(item.id));
        },
        editPriceListField: (state, action: PayloadAction<EditInputState>) => {
            const editedPriceList = action.payload;
            console.log(state)
            state.priceTable.forEach(price => {
                if (price.id === editedPriceList.priceId) {
                    price[editedPriceList.inputName] = editedPriceList.newValue;
                    const newArea = parseFloat(((2 * (price.depth * price.width + price.depth * price.height + price.width * price.height)) / price.quantity).toFixed(2));
                    price.area = newArea;
                }
            });
        },
        resetPriceList: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addPriceList.fulfilled, (state, action) => {
            state.priceTable = [
                ...state.priceTable,
                ...action.payload,
            ];
        });
    }
});

// Wyeksportowanie akcji reduktora i reduktora
export const { removePriceList, resetPriceList, editPriceListField } = priceListSlice.actions;
export default priceListSlice.reducer;
