import {API_KEY, instance} from "./api";
import {
    AstroResponseType,
    CurrentWeatherResponseType,
    DayResponseType, HourResponseType,
    LocationResponseType
} from "../types/common-types";

export const forecastAPI = {
    dailyWeather(days: number, lat: number, lon: number) {
        return instance.get<ForecastType>(`/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=${days}`)
    }
}

export type ForecastType = {
    location: LocationResponseType,
    current: CurrentWeatherResponseType
    forecast: ForecastDayInfoType
}

export type ForecastDayInfoType = {
    forecastday: Array<ForecastdayResponseType>
}

export type ForecastdayResponseType = {
    date: string
    day: DayResponseType
    astro: AstroResponseType
    hour: Array<HourResponseType>
}
