import { AuthSlicer } from "@/features/AuthSlicer";
import { LinkSlicer } from "@/features/LinkSlicer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		AuthSlicer: AuthSlicer.reducer,
		LinkSlicer: LinkSlicer.reducer,
	},
});
