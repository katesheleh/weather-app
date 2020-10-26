import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import Location from "./Location/Location";
import {getCurrentWeatherTC} from "../../reducers/currentWeather-reducer";
import CurrentWeatherData from "./CurrentWeatherData/CurrentWeatherData";
import {CurrentWeatherResponseType, LocationResponseType} from "../../types/common-types";


const Weather = () => {
    const dispatch = useDispatch()
    const lat = useSelector<AppRootStateType, number>(state => state.currentWeather.lat)
    const lon = useSelector<AppRootStateType, number>(state => state.currentWeather.lon)
    const location = useSelector<AppRootStateType, LocationResponseType>(state => state.currentWeather.location)
    const currentWeather = useSelector<AppRootStateType, CurrentWeatherResponseType>(state => state.currentWeather.currentWeather)

    useEffect(() => {
        if (lat !== 0 && lon !== 0) {
            dispatch(getCurrentWeatherTC(lat, lon))
        }
    }, [lat, lon])

    const updateDate = new Date(currentWeather.last_updated)
    let currentWeekday = {weekday: 'long'}
    let currentDate = {year: 'numeric', month: 'long', day: 'numeric'}

    return (
        <div className='container'>
            <div className='sectionWrap'>
                <Location name={location.name} region={location.region} country={location.country}/>
                <CurrentWeatherData last_updated_weekday={updateDate.toLocaleString('en-US', currentWeekday)}
                                    last_updated_date={updateDate.toLocaleString('en-US', currentDate)}
                                    temp_c={currentWeather.temp_c}
                                    feelslike_c={currentWeather.feelslike_c}
                                    wind_kph={currentWeather.wind_kph}
                                    wind_dir={currentWeather.wind_dir}
                                    gust_kph={currentWeather.gust_kph}
                                    humidity={currentWeather.humidity}
                                    condition_text={currentWeather.condition.text}
                                    condition_img={currentWeather.condition.icon}/>

            </div>
        </div>
    )
}

export default Weather
