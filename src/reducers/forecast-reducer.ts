import {Dispatch} from 'redux'
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";
import {forecastAPI, ForecastDayInfoType, ForecastdayResponseType} from "../api/forecast-api";


let initialState: InitialStateType = {
    forecastday: [] as Array<ForecastdayResponseType>
} as InitialStateType;

export const forecastReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'FORECAST_DATA':
            return {...state, forecastday: action.forecastday}
        default:
            return state;
    }
}

// Action creators
export const forecastDataAC = (forecastday: Array<ForecastdayResponseType>) => ({
    type: 'FORECAST_DATA',
    forecastday
} as const)


// THUNK
export const getForecastTC = (days: number, lat: number, lon: number) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    forecastAPI.dailyWeather(days, lat, lon)
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(forecastDataAC(res.data.forecast.forecastday))
        })
        .catch((error) => {
            dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}

// TYPES
export type InitialStateType = {
    forecastday: Array<ForecastdayResponseType>
}

export type ActionsType = ForecastDataACType

export type ForecastDataACType = ReturnType<typeof forecastDataAC>