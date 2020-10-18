import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import Location from "./Location/Location";
import {getCurrentWeatherTC, getUserCoordinatesTC} from "../../reducers/currentWeather-reducer";
import Preloader from "../common/Preloader/Preloader";
import CurrentWeatherData from "./CurrentWeatherData/CurrentWeatherData";
import {CurrentWeatherResponseType, LocationResponseType} from "../../types/common-types";


const Weather = () => {
    const dispatch = useDispatch()
    const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
    const lat = useSelector<AppRootStateType, number>(state => state.currentWeather.lat)
    const lon = useSelector<AppRootStateType, number>(state => state.currentWeather.lon)
    const location = useSelector<AppRootStateType, LocationResponseType>(state => state.currentWeather.location)
    const currentWeather = useSelector<AppRootStateType, CurrentWeatherResponseType>(state => state.currentWeather.currentWeather)

    useEffect(() => {
        dispatch(getUserCoordinatesTC())
        if (lat !== 0 && lon !== 0) {
            dispatch(getCurrentWeatherTC(lat, lon))
        }
    }, [lat, lon])

    return (
        <div>
            {requestIsFetching && <Preloader/>}
            <h1>Weather</h1>

            {(!lat && !lon)
                ? 'You should allow see your location'
                : <>
                    <Location name={location.name} region={location.region} country={location.country}/>
                    <CurrentWeatherData last_updated={currentWeather.last_updated}
                                        temp_c={currentWeather.temp_c}
                                        feelslike_c={currentWeather.feelslike_c}
                                        wind_kph={currentWeather.wind_kph}
                                        wind_dir={currentWeather.wind_dir}
                                        gust_kph={currentWeather.gust_kph}
                                        humidity={currentWeather.humidity}
                                        condition_text={currentWeather.condition.text}
                                        condition_img={currentWeather.condition.icon}
                    />
                </>}
        </div>
    )
}

export default Weather
