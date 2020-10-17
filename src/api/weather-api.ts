import {API_KEY, instance} from "./api";

export const weatherAPI = {
    currentWeather(lat: number, lon: number) {
        return instance.get<currectWeatherType>(`/current.json?key=${API_KEY}&q=${lat},${lon}`)
    }
}

export type currentWeatherResponseType = {
    condition: conditionResponseType
    wind_kph: number
    wind_degree: number
    wind_dir: string
    precip_mm: number
    humidity: number
    cloud: number
    feelslike_c: number
    vis_km: number
    uv: number
    gust_kph: number
    last_updated: string
    temp_c: number
    is_day: number
}

export type conditionResponseType = {
    text: string,
    icon: string
    code: number
}

export type LocationResponseType = {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
}

export type currectWeatherType = {
    location: LocationResponseType,
    current: currentWeatherResponseType
}