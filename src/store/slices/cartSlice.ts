import { BASE_URL } from "../../constants/baseUrl";
import { ICart, ICartProduct, ICartProductFull } from "../../types/ICart";
import { RootState } from "..";
import { IProduct } from "../../types/IProduct";
import axios from "axios";
import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
    cart: ICart | null
    cart_product: ICartProduct[]
    cartProducts: ICartProductFull[]
    isLoading: boolean
    error: string
}

const initialState: ICartState = {
    cart: null,
    cart_product: [],
    cartProducts: [],
    isLoading: false,
    error: "",
}

export const fetchUserCart = createAsyncThunk<ICart | null, void, { rejectValue: string, state: RootState }>(
    "cart/fetchUserCart",
    async function (_, { rejectWithValue, getState }) {
        const currentUserId = getState().user.user?.id
        try {
            const cartsResponse = await axios.get<ICart[]>(`${BASE_URL}/cart`)
            const carts = cartsResponse.data
            if (currentUserId) {
                const userCart = carts.find(cart => cart.user_id === currentUserId)
                return userCart ? userCart : null
            }
            return null
        } catch (error) {
            return rejectWithValue("Failed to fetch user cart")
        }
    },
)

export const fetchCartProducts = createAsyncThunk<ICartProduct[], void, { rejectValue: string, state: RootState }>(
    "cart/fetchCartProducts",
    async function (_, { rejectWithValue, getState }) {
        const cartId = getState().cart.cart?.id
        try {
            const cartsProductsResponse = await axios.get<ICartProduct[]>(`${BASE_URL}/cart_product`)
            const cartsProducts = cartsProductsResponse.data
            if (cartsProducts.length) {
                const cartProducts = cartsProducts.filter(cartProduct => cartProduct.cart_id === cartId)
                if (cartProducts.length) {
                    return cartProducts
                }
                return []
            }
            return []
        } catch (error) {
            return rejectWithValue("Failed to carts prodcuts")
        }
    },
)

export const fetchProductsToCart = createAsyncThunk<ICartProductFull[], void, { rejectValue: string, state: RootState }>(
    "product/fetchProductsToCart",
    async function (_, { rejectWithValue, getState }) {
        const cart_product = getState().cart.cart_product
        try {
            const products = (await axios.get<IProduct[]>(`${BASE_URL}/product`)).data
            const productsToCart: ICartProductFull[] = []
            for (const item of cart_product) {
                const sku = item.product_sku
                for (const product of products) {
                    if (product.sku === sku) {
                        productsToCart.push({
                            id: item.id,
                            cart_id: item.cart_id,
                            quantity: item.quantity,
                            product_sku: sku,
                            price: product.price,
                            name: product.name,
                            description: product.description,
                        })
                    }
                }
            }
            return productsToCart
        } catch (error) {
            return rejectWithValue("Failed to carts prodcuts")
        }
    },
)


interface ChangeProductQuantityProps {
    cart_itemId: number
    quantity: number
}

export const patchProductQuantity = createAsyncThunk<boolean, ChangeProductQuantityProps, { rejectValue: string }>(
    "cart/patchProductQuantity",
    async function (data, { rejectWithValue }) {
        try {
            await axios.patch(`${BASE_URL}/cart_product/${data.cart_itemId}`, {
                quantity: data.quantity,
            })
            return true
        }
        catch (error) {
            return rejectWithValue("Failed to update quantity")
        }
    },
)

export const deleteFromCart = createAsyncThunk<void, number, { rejectValue: string }>(
    "cart/deleteFromCart",
    async function (cart_productID, { rejectWithValue }) {
        try {
            axios.delete(`${BASE_URL}/cart_product/${cart_productID}`)
        }
        catch (error) {
            return rejectWithValue("Failed to remove from cart")
        }
    },
)

interface AddCartProductProps {
    cart_id: number
    product_sku: string
    quantity: number
}

export const postProductToCart = createAsyncThunk<boolean, AddCartProductProps, { rejectValue: string }>(
    "cart/postProductToCart",
    async function (data, { rejectWithValue }) {
        try {
            axios.post(`${BASE_URL}/cart_product`, {
                ...data,
            })
            return true
        }
        catch (error) {
            return rejectWithValue("Failed to remove from cart")
        }
    },
)

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        changeProductQuantity(state, action: PayloadAction<ChangeProductQuantityProps>) {
            if (state.cart) {
                const cartProducts = state.cartProducts
                const data = action.payload
                const changableProduct = cartProducts.find(product => product.id === data.cart_itemId)
                if (changableProduct?.quantity) {
                    changableProduct.quantity = data.quantity
                }
            }
        },
        calculateCartTotal(state) {
            if (typeof state.cart?.total_cost === "number") {
                let sum = 0
                for (const cartProduct of state.cartProducts) {
                    sum += cartProduct.price * cartProduct.quantity
                }
                state.cart.total_cost = sum
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCart.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                state.cart = action.payload
                state.isLoading = false
                state.error = ""
            })
            .addCase(fetchCartProducts.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(fetchCartProducts.fulfilled, (state, action) => {
                state.cart_product = action.payload
                state.isLoading = false
                state.error = ""
            })
            .addCase(fetchProductsToCart.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(fetchProductsToCart.fulfilled, (state, action) => {
                state.cartProducts = action.payload
                state.isLoading = false
                state.error = ""
            })
            .addCase(deleteFromCart.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(deleteFromCart.fulfilled, (state) => {
                state.isLoading = false
                state.error = ""
            })
            .addCase(patchProductQuantity.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(patchProductQuantity.fulfilled, (state) => {
                state.isLoading = false
                state.error = ""
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    },
})

export const { changeProductQuantity, calculateCartTotal } = cartSlice.actions

export const cartReducer = cartSlice.reducer

function isError(action: AnyAction) {
    return action.type.endsWith("rejected");
}