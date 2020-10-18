import {Dispatch} from 'redux'
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";
import {ConditionResponseType, currentWeatherResponseType, LocationResponseType, currentWeatherApi} from "../api/currentWeather-api";


let initialState: InitialStateType = {
    lat: 0,
    lon: 0,
    location: {} as LocationResponseType,
    currentWeather: {
        condition: {} as ConditionResponseType
    } as currentWeatherResponseType
} as InitialStateType;

export const currentWeatherReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'COORDINATES':
            return {...state, lat: action.lat, lon: action.lon}
        case 'LOCATION':
            return {...state, location: action.location}
        case 'CURRENT_WEATHER':
            return {...state, currentWeather: action.currentWeather}
        default:
            return state;
    }
}

// Action creators
export const userCoordinatesAC = (lat: number, lon: number) => ({type: 'COORDINATES', lat, lon} as const)
export const userLocationAC = (location: LocationResponseType) => ({type: 'LOCATION', location} as const)
export const currentWeatherAC = (currentWeather: currentWeatherResponseType) => ({
    type: 'CURRENT_WEATHER',
    currentWeather
} as const)


// THUNK
export const getUserCoordinatesTC = () => (dispatch: Dispatch<ActionsType>) => {
    navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(userCoordinatesAC(position.coords.latitude, position.coords.longitude))
    });
}

export const getCurrentWeatherTC = (lat: number, lon: number) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    currentWeatherApi.currentWeather(lat, lon)
        .then(res => {
            dispatch(isFetchingAC(false))
            dispatch(userLocationAC(res.data.location))
            dispatch(currentWeatherAC(res.data.current))
        })
        .catch((error) => {
            dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}

// TYPES
export type InitialStateType = {
    lat: number
    lon: number
    location: LocationResponseType
    currentWeather: currentWeatherResponseType
}

export type LocationType = {
    name: string
    region: string
    country: string
}

export type ActionsType = userCoordinatesACType | userLocationACType | currentWeatherACType

export type userCoordinatesACType = ReturnType<typeof userCoordinatesAC>
export type userLocationACType = ReturnType<typeof userLocationAC>
export type currentWeatherACType = ReturnType<typeof currentWeatherAC>