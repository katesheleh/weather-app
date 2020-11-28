import {Dispatch} from 'redux'
import {errorAC} from "./request-reducer";
import {forecastAPI, ForecastdayResponseType} from "../api/forecast-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialState: InitialStateType = {
    forecastday: [] as Array<ForecastdayResponseType>
} as InitialStateType;


const slice = createSlice({
    name: 'forecast',
    initialState: initialState,
    reducers: {
        forecastDataAC(state, action: PayloadAction<{ forecastday: ForecastdayResponseType[] }>) {
            state.forecastday = action.payload.forecastday
        }
    }
})

//Reducer
export const forecastReducer = slice.reducer

// Action creators
export const {forecastDataAC} = slice.actions


// THUNK
export const getForecastTC = (days: number, lat: number, lon: number) => (dispatch: Dispatch) => {
    forecastAPI.dailyWeather(days, lat, lon)
        .then(res => {
            dispatch(forecastDataAC({forecastday: res.data.forecast.forecastday}))
        })
        .catch((error) => {
            dispatch(errorAC({error: error.response.data.error}))
        })
}

// TYPES
export type InitialStateType = {
    forecastday: Array<ForecastdayResponseType>
}
