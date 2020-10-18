import React from "react";
import styles from './Forecast.module.scss'

const ForecastDay = (props: PropsType) => {
    return (
        <div className={styles.wrap}>
            <h3>{props.date}</h3>
            <p><strong>sunrise: </strong> {props.sunrise}<br/><strong>sunset: </strong> {props.sunset}</p>
            <div>
                <img src={props.icon}/>
                <p>{props.condition_text}</p>
            </div>
            <p>
                <strong>min </strong>{props.min_temp} deg
                <br/>
                <strong>max </strong>{props.max_temp} deg
            </p>
        </div>
    )
}

export default ForecastDay;


type PropsType = {
    date: string
    sunrise: string
    sunset: string
    icon: string
    condition_text: string
    min_temp: number
    max_temp: number
}