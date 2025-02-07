import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface User {
	username: string;
	email: string;
}

interface Links {
	_id: string;
	link: string;
	totalViews: number;
	isActive: boolean;
	createdAt: Date;
	title?: string;
}

interface LinkState {
	links: Links[];
	user?: User | null;
	expiresAt?: Date | null;
}

const initialState: LinkState = {
	links: [],
	expiresAt: null,
};

export const LinkSlicer = createSlice({
	name: "links",
	initialState,

	reducers: {
		getlinks(state, action: PayloadAction<Links[]>) {
			state.links = action.payload;
		},
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload;
		},
		setExpiresAt(state, action: PayloadAction<Date>) {
			state.expiresAt = action.payload;
		},
		getLinkById(state, action: PayloadAction<string>) {
			state.links = state.links.filter((link) => link._id === action.payload);
		},
		deleteLink(state, action: PayloadAction<string>) {
			state.links = state.links.filter((link) => link._id !== action.payload);
		},
	},
});

export const { getLinkById, getlinks, deleteLink, setExpiresAt } =
	LinkSlicer.actions;
