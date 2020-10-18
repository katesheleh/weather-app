import React from "react"
import styles from './CurrentWeatherData.module.scss'

const CurrentWeatherData = (props: PropsType) => {

    return (
        <div className={styles.currentWeather}>
            <p>Last update: {props.last_updated}</p>

                <div className={styles.item}>
                    <div className={styles.colLeft}>
                        <img src={props.condition_img}/>
                    </div>
                    <div className={styles.colRight}>
                        <p>{props.condition_text}</p>
                        <p><strong>Humidity:</strong> {props.humidity} %</p>
                    </div>
                </div>

                <h3>Temperature</h3>
                <div className={styles.info}>
                    <p><strong>Current: </strong>{props.temp_c}</p>
                    <p><strong>Feels Like: </strong>{props.temp_c}</p>
                </div>

                <h3>Wind</h3>
                <div className={styles.info}>
                    <p>{props.wind_kph} km/h, ({props.wind_dir})</p>
                    <p><strong>Gust: </strong>{props.gust_kph}</p>
                </div>

        </div>
    )
}

export default CurrentWeatherData


type PropsType = {
    last_updated: string
    temp_c: number
    feelslike_c: number
    wind_kph: number
    wind_dir: string
    gust_kph: number
    humidity: number
    condition_text: string
    condition_img: string
}