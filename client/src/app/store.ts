import { AuthSlicer } from "@/redux/features/AuthSlicer";
import { LinkSlicer } from "@/redux/features/LinkSlicer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		AuthSlicer: AuthSlicer.reducer,
		LinkSlicer: LinkSlicer.reducer,
	},
});
