import {Dispatch} from 'redux'
import {errorAC} from "./request-reducer";
import {searchAPI} from "../api/search-api";
import {searchPlaceResponseType} from "../types/common-types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialState: InitialStateType = {
    data: [] as Array<searchPlaceResponseType>
} as InitialStateType;

const slice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        searchDataAC(state, action: PayloadAction<{ data: searchPlaceResponseType[] }>) {
            state.data = action.payload.data
        },
        cleanDataAC(state) {
            state.data = []
        }
    }
})

//reducer
export const searchReducer = slice.reducer

// Action creators
export const {searchDataAC} = slice.actions
export const {cleanDataAC} = slice.actions

// THUNK
export const searchTC = (place: string) => (dispatch: Dispatch) => {
    searchAPI.place(place)
        .then(res => {
            dispatch(searchDataAC({data: res.data}))
        })
        .catch((error) => {
            dispatch(errorAC({error: error.response.data.error}))
        })
}

// TYPES
export type InitialStateType = {
    data: Array<searchPlaceResponseType>
}