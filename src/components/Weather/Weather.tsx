import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import Location from "../Location/Location";
import {getCurrentWeatherTC, getUserCoordinatesTC, LocationType} from "../../reducers/weather-reducers";
import Preloader from "../common/Preloader/Preloader";


const Weather = () => {
    const dispatch = useDispatch()
    const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
    const lat = useSelector<AppRootStateType, number>(state => state.weather.lat)
    const lon = useSelector<AppRootStateType, number>(state => state.weather.lon)
    const location = useSelector<AppRootStateType, LocationType>(state => state.weather.location)


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
                : <Location city={location.city} region={location.region} country={location.country}/>}
        </div>
    )
}

export default Weather
