import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface User {
  email: string;
  username: string;
}

interface Token {
  accessToken: string;
  refreshtoken: string;
}

interface AuthState {
	user: User | null;
	token: Token | null;
	isAuthenticated: boolean;
	isVerified: boolean;
}


const initialState: AuthState = {
	user: null,
	token: null,
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
		setToken(state, action: PayloadAction<Token>) {
			state.token = action.payload;
		},
		setIsAuthenticated(state, action: PayloadAction<boolean>) {
			state.isAuthenticated = action.payload;
		},
		setIsVerified(state, action: PayloadAction<boolean>) {
			state.isVerified = action.payload;
		},
	},
});

export const { setUser, setToken, setIsAuthenticated, setIsVerified } =
	AuthSlicer.actions;
