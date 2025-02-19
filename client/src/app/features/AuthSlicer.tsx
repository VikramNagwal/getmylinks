import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	email: string;
	name: string;
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

export const authSlicer = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload;
			state.isAuthenticated = true;
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

export const { setUser, setIsVerified, userLogout } = authSlicer.actions;
export default authSlicer.reducer;
