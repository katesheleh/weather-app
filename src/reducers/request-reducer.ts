import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let initialState = {
    error: '',
    isFetching: false,
}

export const slice = createSlice({
    name: 'request',
    initialState: initialState,
    reducers: {
        errorAC(state, action: PayloadAction<{ error: string }>) {
            state.error = action.payload.error
        },
        isFetchingAC(state, action: PayloadAction<{ isFetching: boolean }>) {
            state.isFetching = action.payload.isFetching
        }
    }
})

export const requestReducer = slice.reducer

export const {errorAC, isFetchingAC} = slice.actions
