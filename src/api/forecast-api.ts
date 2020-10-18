import {API_KEY, instance} from "./api";

export const forecastAPI = {
    dailyWeather() {
        return instance.get<any>(`/forecast.json?key=${API_KEY}&days=5`)
    }
}

