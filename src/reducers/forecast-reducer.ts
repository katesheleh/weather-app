import {forecastAPI, ForecastdayResponseType} from "../api/forecast-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {errorAC} from "./request-reducer";


// THUNK
export const getForecastTC = createAsyncThunk(
    'forecast/getForecast',
    async (param: { days: number, lat: number, lon: number }, thunkAPI) => {
        try {
            const res = await forecastAPI.dailyWeather(param.days, param.lat, param.lon)
            return {forecastday: res.data.forecast.forecastday}
        } catch (error) {
            thunkAPI.dispatch(errorAC({error: error.response.data.error}))
            return false
        }

    }
)

const slice = createSlice({
    name: 'forecast',
    initialState: {
        forecastday: [] as Array<ForecastdayResponseType>
    } as InitialStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getForecastTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.forecastday = action.payload.forecastday
            }
        })
    }
})

//Reducer
export const forecastReducer = slice.reducer

// TYPES
export type InitialStateType = {
    forecastday: Array<ForecastdayResponseType>
}
