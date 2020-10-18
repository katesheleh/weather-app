import {API_KEY, instance} from "./api";


export const searchAPI = {
    place(place: string) {
        return instance.get<searchPlaceResponseType[]>(`/forecast.json?key=${API_KEY}&q=${place}`)
    }
}

export type searchPlaceResponseType = {
    id: number
    name: string
    region: string
    country: string
    lat: number
    lon: number
    url: string
}