import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Theme {
    mode: string
}

const initialState: Theme = {
    mode: 'light'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themeLight: state => {
            state.mode = 'light'
        },
        themeDark: state => {
            state.mode = 'dark'
        }
    }
})

export const {themeLight, themeDark} = themeSlice.actions;
export default themeSlice.reducer;