import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AlertType {
    text: string;
    type: string;
    id: number | string;
}

interface AlertContainerType {
    alertList: AlertType[];
}

const initialState: AlertContainerType = {
    alertList: []
}

const alertSlice = createSlice({
    name: "alertList",
    initialState,
    reducers: {
        callAlert: (state, action: PayloadAction<AlertType[]>) => {
            state.alertList = [
                ...state.alertList,
                ...action.payload
            ]
        },
        clearAlert: (state, action: PayloadAction<AlertType>) => {
            return {
                ...state,
                alertList: state.alertList.filter((alert: AlertType) => alert.id !== action.payload.id)
            };
        }
    }
})

export const {callAlert,clearAlert} = alertSlice.actions;
export default alertSlice.reducer;