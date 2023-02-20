import { userReducer } from "./slices/userSlice";
import { productReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";
import { modalsReducer } from "./slices/modalsSlice";
import { orderReducer } from "./slices/orderSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        modals: modalsReducer,
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch