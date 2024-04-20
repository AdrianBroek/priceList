import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sortOptions } from "../components/types/SortType";

const initialState: sortOptions = {
    value: 'area'
}

const sortReducer = createSlice({
    name: "sortOptions",
    initialState,
    reducers: {
        sort: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
})

export const {sort} = sortReducer.actions;
export default sortReducer.reducer;