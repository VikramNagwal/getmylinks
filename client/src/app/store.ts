import authReducer from "@/app/slices/AuthSlicer";
import { LinkSlicer } from "@/app/slices/LinkSlicer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		link: LinkSlicer.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
