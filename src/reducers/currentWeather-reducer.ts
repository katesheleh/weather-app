import {errorAC} from "./request-reducer";
import {ConditionResponseType, CurrentWeatherResponseType, LocationResponseType} from "../types/common-types";
import {currentWeatherApi} from "../api/currentWeather-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


// THUNK
export const getUserCoordinatesTC = createAsyncThunk(
    'currentWeather/getUserCoordinatesTC',
    (undefined, thunkAPI) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            thunkAPI.dispatch(userCoordinatesAC({lat: position.coords.latitude, lon: position.coords.longitude}))
        });
    }
)

export const getCurrentWeatherTC = createAsyncThunk(
    'currentWeather/getCurrentWeather',
    async (param: { lat: number, lon: number }, thunkAPI) => {
        try {
            const res = await currentWeatherApi.currentWeather(param.lat, param.lon)
            thunkAPI.dispatch(userLocationAC({location: res.data.location}))
            return {currentWeather: res.data.current}
        } catch (error) {
            thunkAPI.dispatch(errorAC({error: error.response.data.error}))
            return false
        }
    })

const slice = createSlice({
    name: 'currentWeather',
    initialState: {
        lat: 0,
        lon: 0,
        location: {} as LocationResponseType,
        currentWeather: {
            condition: {} as ConditionResponseType
        } as CurrentWeatherResponseType
    } as InitialStateType,
    reducers: {
        userCoordinatesAC(state, action: PayloadAction<{ lat: number, lon: number }>) {
            state.lat = action.payload.lat
            state.lon = action.payload.lon
        },
        userLocationAC(state, action: PayloadAction<{ location: LocationResponseType }>) {
            state.location = action.payload.location
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentWeatherTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.currentWeather = action.payload.currentWeather
            }
        })
    }
})

// reducer
export const currentWeatherReducer = slice.reducer

// Action creators
export const {userCoordinatesAC, userLocationAC} = slice.actions

// TYPES
export type InitialStateType = {
    lat: number
    lon: number
    location: LocationResponseType
    currentWeather: CurrentWeatherResponseType
}