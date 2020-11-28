import {Dispatch} from 'redux'
import {errorAC} from "./request-reducer";
import {ConditionResponseType, CurrentWeatherResponseType, LocationResponseType} from "../types/common-types";
import {currentWeatherApi} from "../api/currentWeather-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialState: InitialStateType = {
    lat: 0,
    lon: 0,
    location: {} as LocationResponseType,
    currentWeather: {
        condition: {} as ConditionResponseType
    } as CurrentWeatherResponseType
} as InitialStateType;

const slice = createSlice({
    name: 'currentWeather',
    initialState: initialState,
    reducers: {
        userCoordinatesAC(state, action: PayloadAction<{ lat: number, lon: number }>) {
            state.lat = action.payload.lat
            state.lon = action.payload.lon
        },
        userLocationAC(state, action: PayloadAction<{ location: LocationResponseType }>) {
            state.location = action.payload.location
        },
        currentWeatherAC(state, action: PayloadAction<{ currentWeather: CurrentWeatherResponseType }>) {
            state.currentWeather = action.payload.currentWeather
        }
    }
})

// reducer
export const currentWeatherReducer = slice.reducer

// Action creators
export const {userCoordinatesAC} = slice.actions
export const {userLocationAC} = slice.actions
export const {currentWeatherAC} = slice.actions

// THUNK
export const getUserCoordinatesTC = () => (dispatch: Dispatch) => {
    navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(userCoordinatesAC({lat: position.coords.latitude, lon: position.coords.longitude}))
    });
}

export const getCurrentWeatherTC = (lat: number, lon: number) => (dispatch: Dispatch) => {
    currentWeatherApi.currentWeather(lat, lon)
        .then(res => {
            dispatch(userLocationAC({location: res.data.location}))
            dispatch(currentWeatherAC({currentWeather: res.data.current}))
        })
        .catch((error) => {
            dispatch(errorAC({error: error.response.data.error}))
        })
}

// TYPES
export type InitialStateType = {
    lat: number
    lon: number
    location: LocationResponseType
    currentWeather: CurrentWeatherResponseType
}