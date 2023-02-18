import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { IRole } from "../../types/IRole";

interface IRoleState {
    roles: IRole[]
    isLoading: boolean
    error: string
}

const initialState: IRoleState = {
    roles: [],
    isLoading: false,
    error: ''
}

export const fetchRoles = createAsyncThunk<IRole[], void, { rejectValue: string }>(
    "role/fetchRoles",
    async function (_, { rejectWithValue }) {
        try {
            const respose = await axios.get<IRole[]>(`${BASE_URL}/role`)
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
            .addCase(fetchRoles.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.roles = action.payload
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