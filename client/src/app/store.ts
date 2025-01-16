import { AuthSlicer } from '@/features/AuthSlicer'
import { configureStore } from '@reduxjs/toolkit'


export const store = configureStore({
    reducer: {
        AuthSlicer: AuthSlicer.reducer
    }
})