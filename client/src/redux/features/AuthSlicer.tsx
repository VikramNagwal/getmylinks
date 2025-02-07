import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	email: string;
	username: string;
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isVerified: boolean;
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	isVerified: false,
};

export const AuthSlicer = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload;
		},
		setIsAuthenticated(state, action: PayloadAction<boolean>) {
			state.isAuthenticated = action.payload;
		},
		setIsVerified(state, action: PayloadAction<boolean>) {
			state.isVerified = action.payload;
		},
		userLogout(state) {
			state.user = null;
			state.isAuthenticated = false;
			state.isVerified = false;
		},
	},
});

export const { setUser, setIsAuthenticated, setIsVerified, userLogout } =
	AuthSlicer.actions;
