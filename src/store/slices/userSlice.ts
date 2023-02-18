import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { IUser } from "../../types/IUser";

interface IUserState {
    user: IUser | null
    isLoading: boolean
    error: string
}

const initialState: IUserState = {
    user: null,
    isLoading: false,
    error: ''
}

export const fetchUser = createAsyncThunk<IUser, number, { rejectValue: string }>(
    "user/fetchUser",
    async function (userId, { rejectWithValue }) {
        try {
            const respose = await axios.get<IUser>(`${BASE_URL}/user/${userId}`)
            return respose.data
        } catch (error) {
            return rejectWithValue("Failed to fetch roles")
        }
    },
)

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
                state.error = ""
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    }
})

export const roleReducer = roleSlice.reducer

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}