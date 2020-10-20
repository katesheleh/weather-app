import React, {ChangeEvent, useCallback, useState, KeyboardEvent, useEffect} from "react";
import Input from "../common/Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {searchTC} from "../../reducers/search-reducer";
import Button from "../common/Button/Button";
import styles from './Search.module.scss';
import {AppRootStateType} from "../../reducers/store";
import {searchPlaceResponseType} from "../../types/common-types";
import {getCurrentWeatherTC} from "../../reducers/currentWeather-reducer";
import {getForecastTC} from "../../reducers/forecast-reducer";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
    const dispatch = useDispatch()
    const searchData = useSelector<AppRootStateType, Array<searchPlaceResponseType>>(state => state.search.data)
    const [searchVal, setSearchVal] = useState('')
    const debouncedSearchTerm = useDebounce(searchVal, 500);

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchVal(e.currentTarget.value)
    }, [searchVal])

    const onKeyInputPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            dispatch(searchTC(searchVal))
        }
    }, [searchVal])

    const onPlaceClick = useCallback((lat: number, lon: number) => {
        dispatch(getCurrentWeatherTC(lat, lon))
        dispatch(getForecastTC(3, lat, lon))
    }, [searchVal])

    useEffect(() => {
        if (debouncedSearchTerm) {
            dispatch(searchTC(searchVal))
        }
    }, [debouncedSearchTerm])

    return (
        <div>
            <h2>Search</h2>
            <Input value={searchVal} labelTitle='Search' onChange={onInputChange} onKeyPress={onKeyInputPressHandler}/>
            <div className={styles.searchOptions}>
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