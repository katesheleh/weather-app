import React from "react"
import styles from './CurrentWeatherData.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBacon, faCalendarAlt, faTemperatureHigh, faWater, faWind} from "@fortawesome/free-solid-svg-icons";

const CurrentWeatherData = (props: PropsType) => {

    return (
        <div className={styles.currentWeather}>
            <div className={styles.colLeft}>
                <div className={styles.colLeftInner}>
                    <img src={props.condition_img} width='150' className={styles.currentWeatherImg}/>
                    <div className={styles.desc}>
                        <p className={styles.largeText}>{props.temp_c}&#176;C</p>
                        <p className={styles.bigText}>{props.condition_text}</p>
                    </div>
                </div>
            </div>
            <div className={styles.colRight}>
                <p className={styles.currentWeatherItem}> <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon}/> <span>Today: </span>{props.last_updated_weekday} {props.last_updated_date}</p>
                <p className={styles.currentWeatherItem}> <FontAwesomeIcon icon={faTemperatureHigh} className={styles.icon}/><span>Feels Like: </span>{props.temp_c}&#176;C</p>
                <p className={styles.currentWeatherItem}> <FontAwesomeIcon icon={faWater} className={styles.icon}/><span>Humidity:</span> {props.humidity} %</p>
                <p className={styles.currentWeatherItem}> <FontAwesomeIcon icon={faWind} className={styles.icon}/><span>Wind:</span> {props.wind_kph} km/h ({props.wind_dir})</p>
                <p className={styles.currentWeatherItem}> <FontAwesomeIcon icon={faBacon} className={styles.icon}/><span>Gust: </span>{props.gust_kph}</p>
            </div>
        </div>
    )
}

export default CurrentWeatherData


type PropsType = {
    last_updated_weekday: string
    last_updated_date: string
    temp_c: number
    feelslike_c: number
    wind_kph: number
    wind_dir: string
    gust_kph: number
    humidity: number
    condition_text: string
    condition_img: string
}