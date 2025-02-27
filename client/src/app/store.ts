import authReducer from "@/app/features/AuthSlicer";
import linkReducer from "@/app/features/LinkSlicer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		link: linkReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
