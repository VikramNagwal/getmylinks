import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface LinkState {
    links: string[];
    isActive: boolean;
    expiresAt: Date | null;
}

const initialState: LinkState = {
    links: [],
    isActive: true,
    expiresAt: null
}

export const LinkSlicer = createSlice({
    name: "links",
    initialState,
    reducers: {
        setLinks(state, action: PayloadAction<string[]>) {
            state.links = action.payload;
        },
        setIsActive(state, action: PayloadAction<boolean>) {
            state.isActive = action.payload;
        },
        setExpiresAt(state, action: PayloadAction<Date>) {
            state.expiresAt = action.payload;
        }
    }
})

export const { setLinks, setIsActive, setExpiresAt } = LinkSlicer.actions;