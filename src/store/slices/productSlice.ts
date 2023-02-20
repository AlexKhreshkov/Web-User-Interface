import { BASE_URL } from "../../constants/baseUrl";
import { IProduct } from "../../types/IProduct";
import axios from "axios";
import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProductState {
    products: IProduct[]
    isLoading: boolean
    error: string
}

const initialState: IProductState = {
    products: [],
    isLoading: false,
    error: "",
}

export const fetchProducts = createAsyncThunk<IProduct[], void, { rejectValue: string }>(
    "product/fetchProducts",
    async function (_, { rejectWithValue }) {
        try {
            const productsResponse = await axios.get<IProduct[]>(`${BASE_URL}/product`)
            const products = productsResponse.data
            return products
        } catch (error) {
            return rejectWithValue("Failed to fetch products")
        }
    },
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.isLoading = false
                state.error = ""
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
})

export const productReducer = productSlice.reducer

function isError(action: AnyAction) {
    return action.type.endsWith("rejected");
}