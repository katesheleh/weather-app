import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getForecastTC} from "../../reducers/forecast-reducer"
import {AppRootStateType} from "../../reducers/store"
import styles from './Forecast.module.scss'
import Button from "../common/Button/Button"
import ForecastDay from "./ForecastDay/ForecastDay"
import {ForecastdayResponseType} from "../../api/forecast-api"


const Forecast = () => {
    const dispatch = useDispatch()
    const lat = useSelector<AppRootStateType, number>(state => state.currentWeather.lat)
    const lon = useSelector<AppRootStateType, number>(state => state.currentWeather.lon)
    const forecastInfo = useSelector<AppRootStateType, ForecastdayResponseType[]>(state => state.forecast.forecastday)
    const [forecastDays, setForecastDays] = useState(1)

    useEffect(() => {
        if (lat !== 0 && lon !== 0) {
            dispatch(getForecastTC(forecastDays, lat, lon))
        }
    }, [lat, lon, forecastDays])


    let currentWeekday = {weekday: 'long'}
    let currentDate = {year: 'numeric', month: 'long', day: 'numeric'}

    return (
        <div className='container'>
            <div className='sectionWrap'>
                <h2>Forecast</h2>
                <div className={styles.btns}>
                    <Button labelTitle='weather for 1 day' onClick={() => setForecastDays(1)}/>
                    <Button labelTitle='weather for 2 days' onClick={() => setForecastDays(2)}/>
                    <Button labelTitle='weather for 3 days' onClick={() => setForecastDays(3)}/>
                </div>
                <div className={styles.days}>
                    {forecastInfo.map((d) => {
                        const adaptedDate = new Date(d.date)
                        return (
                            <div className={styles.day} key={d.date}>
                                <ForecastDay weekDay={adaptedDate.toLocaleString('en-US', currentWeekday)}
                                             date={adaptedDate.toLocaleString('en-US', currentDate)}
                                             sunrise={d.astro.sunrise}
                                             sunset={d.astro.sunset}
                                             icon={d.day.condition.icon}
                                             condition_text={d.day.condition.text}
                                             min_temp={d.day.mintemp_c}
                                             max_temp={d.day.maxtemp_c}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Forecast