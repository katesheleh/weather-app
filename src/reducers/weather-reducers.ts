import {Dispatch} from 'redux'
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";
import {weatherAPI} from "../api/weather-api";


let initialState: InitialStateType = {
    lat: 0,
    lon: 0,
    location: {} as LocationType
};

export const weatherReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'COORDINATES':
            return {...state, lat: action.lat, lon: action.lon}
        case 'LOCATION':
            return {...state, location: {city: action.city, region: action.region, country: action.country}}
        default:
            return state;
    }
}

// Action creators
export const userCoordinatesAC = (lat: number, lon: number) => ({type: 'COORDINATES', lat, lon} as const)
export const userLocationAC = (city: string, region: string, country: string) => ({
    type: 'LOCATION',
    city,
    region,
    country
} as const)


// THUNK
export const getUserCoordinatesTC = () => (dispatch: Dispatch<ActionsType>) => {
    navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(userCoordinatesAC(position.coords.latitude, position.coords.longitude))
    });
}

export const getCurrentWeatherTC = (lat: number, lon: number) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    dispatch(isFetchingAC(true))
    weatherAPI.currentWeather(lat, lon)
        .then(res => {
            const location = res.data.location
            dispatch(isFetchingAC(false))
            dispatch(userLocationAC(location.name, location.region, location.country))
        })
        .catch((error) => {
            dispatch(errorAC(error.response.data.error))
            dispatch(isFetchingAC(false))
        })
}

// TYPES
export type InitialStateType = {
    lat: number,
    lon: number,
    location: LocationType
}

export type LocationType = {
    city: string,
    region: string,
    country: string
}

export type ActionsType = userCoordinatesACType | userLocationACType

export type userCoordinatesACType = ReturnType<typeof userCoordinatesAC>
export type userLocationACType = ReturnType<typeof userLocationAC>