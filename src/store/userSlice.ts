import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../components/types/User";

const initialState:User = {
    id: 0,
    accessToken: "",
    displayName: "",
    email: "",
    createdAt: 0,
    photoUrl: "",
    uid: "",
    logged: false
}

const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<User>) => {
            return action.payload
        },
        logoutUser: (state) => {
            return initialState
        } 
    }
})

export const {setUserData, logoutUser} = userSlice.actions;
export default userSlice.reducer
