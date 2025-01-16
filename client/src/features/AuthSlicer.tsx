import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: string | null;
    token: string | null;
    isAuthenticated: boolean;
    isVerified: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isVerified: false,
}

export const AuthSlicer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<string>) {
            state.user = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setIsAuthenticated(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
        setIsVerified(state, action: PayloadAction<boolean>) {
            state.isVerified = action.payload;
        },
    }
})

export const { setUser, setToken, setIsAuthenticated, setIsVerified } = AuthSlicer.actions;