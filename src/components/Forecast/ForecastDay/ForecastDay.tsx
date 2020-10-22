import React from "react";
import styles from './ForecastDay.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

const ForecastDay = (props: PropsType) => {
    return (
        <div className={styles.wrap}>
            <h3>{props.weekDay}</h3>
            <p className={styles.date}>{props.date}</p>
            <img src={props.icon} className={styles.img}/>
            <p>{props.condition_text}</p>
            <p className={styles.temp}>{props.min_temp} - {props.max_temp}&#176;C</p>
            <div className={styles.details}>
                <p><FontAwesomeIcon icon={faSun} className={styles.icon}/> {props.sunrise}</p>
                <p><FontAwesomeIcon icon={faMoon} className={styles.icon}/> {props.sunset}</p>
            </div>
        </div>
    )
}

export default ForecastDay;


type PropsType = {
    weekDay: string
    date: string
    sunrise: string
    sunset: string
    icon: string
    condition_text: string
    min_temp: number
    max_temp: number
}