import authReducer from "@/app/slices/AuthSlicer";
import { LinkSlicer } from "@/app/slices/LinkSlicer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		AuthSlicer: authReducer,
		LinkSlicer: LinkSlicer.reducer,
	},
});
