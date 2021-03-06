import {API_KEY, instance} from "./api";
import {CurrentWeatherResponseType, LocationResponseType} from "../types/common-types";

export const currentWeatherApi = {
    currentWeather(lat: number, lon: number) {
        return instance.get<CurrectWeatherType>(`/current.json?key=${API_KEY}&q=${lat},${lon}`)
    }
}

export type CurrectWeatherType = {
    location: LocationResponseType,
    current: CurrentWeatherResponseType
}