import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdditionalType } from "../components/types/AdditionalType";


const initialState: AdditionalType = {
    sizes: {
        sizeA: 100,
        sizeB: 100,
        sizeC: 100
    }

}

const additionalSizesSlice = createSlice({
    initialState,
    name: "additionalSize",
    reducers: {
        setAdditionalSizes: (state, action: PayloadAction<AdditionalType["sizes"]>) => {
            state.sizes = action.payload
        },
    }
})

export const {setAdditionalSizes} = additionalSizesSlice.actions;
export default additionalSizesSlice.reducer;