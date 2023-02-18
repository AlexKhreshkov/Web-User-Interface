import { getRoleName } from "../../api/api";
import { BASE_URL } from "../../constants/baseUrl";
import { IUser, IUserReponse } from "../../types/IUser";
import axios from "axios";
import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
    userResponse: IUserReponse | null
    user: IUser | null
    isLoading: boolean
    error: string
}

const initialState: IUserState = {
    userResponse: null,
    user: null,
    isLoading: false,
    error: "",
}



export const fetchUserResponse = createAsyncThunk<IUserReponse | null, string, { rejectValue: string }>(
    "user/fetchUserResponse",
    async function (username, { rejectWithValue }) {
        try {
            const userResponse = await axios.get<IUserReponse[]>(`${BASE_URL}/user`)
            const users = userResponse.data
            const user = users.find(user => user.username === username)
            if (!user) return null
            return user
        } catch (error) {
            return rejectWithValue("Failed to fetch user")
        }
    },
)

export const fetchUserWithRoleName = createAsyncThunk<IUser, IUserReponse, { rejectValue: string }>(
    "user/fetchUserWithRoleName",
    async function (userResponse, { rejectWithValue }) {
        try {
            const roleId = userResponse.role
            const roleName = (await getRoleName(roleId)).data.name
            if (roleId) {
                return {
                    ...userResponse,
                    roleName,
                }
            }
            throw new Error("Failed to fetch user")
        } catch (error) {
            return rejectWithValue("Failed to fetch user")
        }
    },
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<IUser>) {
            state.user = (action.payload)
            state.isLoading = false
            state.error = ""
        },
        logoutUser(state) {
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserResponse.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(fetchUserResponse.fulfilled, (state, action) => {
                state.userResponse = action.payload
                state.isLoading = false
                state.error = ""
            })
            .addCase(fetchUserWithRoleName.pending, (state) => {
                state.isLoading = true
                state.error = ""
            })
            .addCase(fetchUserWithRoleName.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
                state.error = ""
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
})

export const userReducer = userSlice.reducer

export const { addUser, logoutUser } = userSlice.actions


function isError(action: AnyAction) {
    return action.type.endsWith("rejected");
}