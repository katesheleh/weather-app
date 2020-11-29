import {searchAPI} from "../api/search-api";
import {searchPlaceResponseType} from "../types/common-types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {errorAC} from "./request-reducer";


// THUNK
export const searchTC = createAsyncThunk(
    'search/searchTC',
    async (place: string, thunkAPI) => {
        try {
            const res = await searchAPI.place(place)
            return {data: res.data}
        } catch (error) {
            thunkAPI.dispatch(errorAC({error: error.response.data.error}))
            return false
        }

    })

const slice = createSlice({
    name: 'search',
    initialState: {
        data: [] as Array<searchPlaceResponseType>
    } as InitialStateType,
    reducers: {
        cleanDataAC(state) {
            state.data = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.data = action.payload.data
            }
        })
    }
})

//reducer
export const searchReducer = slice.reducer

// Action creators
export const {cleanDataAC} = slice.actions

// TYPES
export type InitialStateType = {
    data: Array<searchPlaceResponseType>
}