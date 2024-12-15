import { PayloadAction,createSlice } from "@reduxjs/toolkit";

type ExtensionList = {
    sku: string,
    priceListId: number
}

type Extension = {
    openExtensions: boolean,
    extensionList: ExtensionList[]
}

const initialState : Extension = {
    openExtensions: false,
    extensionList: []
}

const extensionReducer = createSlice({
    name: "Extension",
    initialState,
    reducers: {
        setOpenExtension: (state, action: PayloadAction<boolean>) => {
            state.openExtensions = action.payload
        },
        addExtension: (state, action: PayloadAction<ExtensionList[]>) => {
            state.extensionList = [
                ...state.extensionList,
                ...action.payload
            ]
        },
        removeExtension: (state, action: PayloadAction<string>) => {
            const updatedList = state.extensionList.filter(ex => ex.sku != action.payload);
            state.extensionList = updatedList
        },
        removeAllExtensions: (state) => {
            state.extensionList = []
        },
        addExtensionList: (state, action: PayloadAction<ExtensionList[]>) => {
            state.extensionList = [
                ...action.payload
            ]
        },
    }
})

export const {setOpenExtension,addExtension,removeExtension,removeAllExtensions,addExtensionList} = extensionReducer.actions;
export default extensionReducer.reducer;
