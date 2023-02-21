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

export const fetchProduct = createAsyncThunk<IProduct, string, { rejectValue: string }>(
    "product/fetchProduct",
    async function (productSku, { rejectWithValue }) {
        try {
            const productResponse = await axios.get<IProduct[]>(`${BASE_URL}/product/?sku=${productSku}`)
            const product = productResponse.data[0]
            return product
        } catch (error) {
            return rejectWithValue("Failed to fetch product")
        }
    },
)

// json server error without pk (added id pk to IPost istead sku/ sku(pk, fk) => id(pk), sku(fk))
export const changeProfuctInfo = createAsyncThunk<IProduct, IProduct, { rejectValue: string }>(
    "product/changeProfuctInfo",
    async function (data, { rejectWithValue }) {
        const url = `${BASE_URL}/product/${data.id}`
        try {
            const productResponse = await axios.patch<IProduct>(url, {
                price: data.price,
                description: data.description,
                name: data.name,
            })
            const product = productResponse.data
            return product
        } catch (error) {
            return rejectWithValue("Failed to update product info")
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
            .addCase(changeProfuctInfo.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(changeProfuctInfo.fulfilled, (state, action) => {
                const changedProduct = action.payload
                let product = state.products.find(product => product.sku === changedProduct.sku)
                if (product) {
                    product = changedProduct
                }
                state.isLoading = false
                state.error = ""
            })
            .addCase(fetchProduct.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(fetchProduct.fulfilled, (state) => {
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