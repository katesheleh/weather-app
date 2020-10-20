import React, {ChangeEvent, useCallback, useState, KeyboardEvent} from "react";
import Input from "../common/Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {searchTC} from "../../reducers/search-reducer";
import Button from "../common/Button/Button";
import styles from './Search.module.scss';
import {AppRootStateType} from "../../reducers/store";
import {searchPlaceResponseType} from "../../types/common-types";
import {getCurrentWeatherTC} from "../../reducers/currentWeather-reducer";
import {getForecastTC} from "../../reducers/forecast-reducer";

const Search = () => {
    const dispatch = useDispatch()
    const searchData = useSelector<AppRootStateType, Array<searchPlaceResponseType>>(state => state.search.data)
    const [searchVal, setSearchVal] = useState('')

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchVal(e.currentTarget.value)
        dispatch(searchTC(searchVal))
    }, [searchVal])

    const onPlaceClick = useCallback((lat: number, lon: number) => {
        dispatch(getCurrentWeatherTC(lat, lon))
        dispatch(getForecastTC(3, lat, lon))
    }, [])

    return (
        <div>
            <h2>Search</h2>
            <Input value={searchVal} labelTitle='Search' onChange={onInputChange}/>
            <div className={styles.searchOptions}>
                {searchData.length == 0 && 'No results'}
                {searchData.map(d => {
                    return (
                        <p key={d.id} onClick={() => onPlaceClick(d.lat, d.lon)}>{d.name}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default Search