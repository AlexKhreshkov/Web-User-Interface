import { getRoleName } from "../../api/api";
import { BASE_URL } from "../../constants/baseUrl";
import { IUser, IUserPatch, IUserReponse } from "../../types/IUser";
import { RootState } from "..";
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

export const updateUserInfo = createAsyncThunk<IUser, IUserPatch, { rejectValue: string, state: RootState }>(
    "user/updateUserInfo",
    async function (data, { rejectWithValue, getState }) {
        const userId = getState().user.user?.id
        if (userId) {
            try {
                const patchedUserResponse = await axios.patch(`${BASE_URL}/user/${userId}`, {
                    ...data,
                })
                return patchedUserResponse.data
            }
            catch (error) {
                return rejectWithValue("Failed to update user info")
            }
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
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                const newUserInfo = action.payload
                if (state.user) {
                    state.user.first_name = newUserInfo.first_name
                    state.user.last_name = newUserInfo.last_name
                    state.user.email = newUserInfo.email
                }
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