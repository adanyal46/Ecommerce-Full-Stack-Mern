import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";
import {message} from "antd";
import {get} from "axios";


const initialState = {
    isLoggedIn: false, isSuccess: false, user: null, isError: false, isLoading: false, message: '',
}
export const register = createAsyncThunk('auth/register',
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData)
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    })
export const login = createAsyncThunk('auth/login',
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData)
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    })
export const logout = createAsyncThunk('auth/logout',
    async (_, thunkAPI) => {
        try {
            return await authService.logout()
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    })
export const status = createAsyncThunk('auth/status',
    async (_, thunkAPI) => {
        try {
            return await authService.status()
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    })
export const getUser = createAsyncThunk('auth/getUser',
    async (_, thunkAPI) => {
        try {
            return await authService.getUser()
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    })
export const updateUser = createAsyncThunk('auth/updateUser',
    async (userData, thunkAPI) => {
        try {
            return await authService.updateUser(userData)
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    })
export const updateUserPhoto = createAsyncThunk('auth/updateUserPhoto',
    async (photo, thunkAPI) => {
        try {
            return await authService.updateUserPhoto(photo)
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    })
const authSlice = createSlice({
    name: 'auth', initialState, reducers: {
        RESET_AUTH(state) {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            //register user
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
                message.success('Register Successful')
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isLoggedIn = false;
                state.message = action.payload;
                state.user = null;
                message.error(action.payload);
            })
            //login user
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload.user;
                message.success('Login Successful')
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isLoggedIn = false;
                state.message = action.payload;
                state.user = null;
                message.error(action.payload);
            })
            //logout user
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = false;
                state.user = null;
                message.success(action.payload)
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isLoggedIn = true;
                state.message = action.payload;
                message.error(action.payload);
            })
            //status user
            .addCase(status.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(status.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = action.payload;
                if (action.payload?.message === 'invalid signature') {
                    state.isLoggedIn = false;
                }
            })
            .addCase(status.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isLoggedIn = false;
                state.message = action.payload;
            })
            //get user
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isLoggedIn = false;
                state.message = action.payload;
                message.error(action.payload);
            })
            //update user
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
                message.success('User updated successfully');
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isLoggedIn = false;
                state.message = action.payload;
                message.error(action.payload);
            })
            //update user photo
            .addCase(updateUserPhoto.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserPhoto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
                message.success('User photo update successfully');
            })
            .addCase(updateUserPhoto.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isLoggedIn = false;
                state.message = action.payload;
                message.error(action.payload);
            })
    }
})

export const {RESET_AUTH} = authSlice.actions;

export default authSlice.reducer;