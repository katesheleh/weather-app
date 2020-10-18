import React from "react"
import styles from './Location.module.scss'

const Location = (props: LocationPropsType) => {

    return (
        <div className={styles.location}>
            <h3>Forecast for {props.name}, {props.region}, {props.country}</h3>
        </div>
    )
}

export default Location


type LocationPropsType = {
    name: string
    region: string
    country: string
}