import { BASE_URL } from "../../constants/baseUrl";
import { IOrder, IOrderProduct } from "../../types/IOrder";
import axios from "axios";
import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProductState {
    orders: IOrder[]
    isLoading: boolean
    error: string
}

const initialState: IProductState = {
    orders: [],
    isLoading: false,
    error: "",
}

export const fetchOrders = createAsyncThunk<IOrder[], void, { rejectValue: string }>(
    "order/fetchOrders",
    async function (_, { rejectWithValue }) {
        try {
            const ordersResponse = await axios.get<IOrder[]>(`${BASE_URL}/order`)
            const orders = ordersResponse.data
            return orders
        } catch (error) {
            return rejectWithValue("Failed to fetch orders")
        }
    },
)

export const fetchOrder = createAsyncThunk<IOrder, number, { rejectValue: string }>(
    "order/fetchOrder",
    async function (id, { rejectWithValue }) {
        try {
            const orderResponse = await axios.get<IOrder>(`${BASE_URL}/order/${id}`)
            const order = orderResponse.data
            return order
        } catch (error) {
            return rejectWithValue("Failed to fetch order")
        }
    },
)

export const createOrder = createAsyncThunk<IOrder, IOrder, { rejectValue: string }>(
    "order/createOrder",
    async function (data, { rejectWithValue }) {
        try {
            const orderResponse = await axios.post(`${BASE_URL}/order`, {
                ...data,
            })
            return orderResponse.data
        } catch (error) {
            return rejectWithValue("Failed to create order")
        }
    },
)

export const createOrderProduct = createAsyncThunk<IOrderProduct, IOrderProduct, { rejectValue: string }>(
    "order/createOrder",
    async function (data, { rejectWithValue }) {
        try {
            const orderProductResponse = await axios.post(`${BASE_URL}/order_product`, {
                ...data,
            })
            return orderProductResponse.data
        } catch (error) {
            return rejectWithValue("Failed to create order product relation")
        }
    },
)

export const fetchProductsToOrder = createAsyncThunk<IOrderProduct[], number, { rejectValue: string }>(
    "order/fetchProductsToOrder",
    async function (orderId, { rejectWithValue }) {
        try {
            const orderProductResponse = await axios.get(`${BASE_URL}/order_product/?order_id=${orderId}`)
            return orderProductResponse.data
        } catch (error) {
            return rejectWithValue("Failed to fetch order products")
        }
    },
)

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload
                state.isLoading = false
                state.error = ""
            })
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload)
                state.isLoading = false
                state.error = ""
            })
            .addCase(fetchOrder.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(fetchOrder.fulfilled, (state) => {
                state.isLoading = false
                state.error = ""
            })
            .addCase(fetchProductsToOrder.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(fetchProductsToOrder.fulfilled, (state) => {
                state.isLoading = false
                state.error = ""
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
})

export const orderReducer = orderSlice.reducer

function isError(action: AnyAction) {
    return action.type.endsWith("rejected");
}