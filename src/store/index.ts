import { userReducer } from "./slices/userSlice";
import { productReducer } from "./slices/productSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch