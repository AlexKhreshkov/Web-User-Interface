import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalsState {
    isLoginModal: boolean,
    isSignUpModal: boolean,
    isCart: boolean
}

const initialState: ModalsState = {
    isLoginModal: false,
    isSignUpModal: false,
    isCart: false,
}

const modalsSlice = createSlice({
    name: "modalsSlice",
    initialState,
    reducers: {
        setLoginModal(state, action: PayloadAction<boolean>) {
            state.isLoginModal = action.payload
        },
        setSignUpModal(state, action: PayloadAction<boolean>) {
            state.isSignUpModal = action.payload
        },
        setCartModal(state, action: PayloadAction<boolean>) {
            state.isCart = action.payload
        },
    },
})

export const {
    setLoginModal,
    setSignUpModal,
    setCartModal,
} = modalsSlice.actions

export const modalsReducer = modalsSlice.reducer