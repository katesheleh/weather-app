import React, {ChangeEvent, useCallback, useState, KeyboardEvent, useEffect} from "react";
import Input from "../common/Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {cleanDataAC, searchTC} from "../../reducers/search-reducer";
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
    const debouncedSearchTerm = useDebounce(searchVal, 200);

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchVal(e.currentTarget.value)
    }, [searchVal])

    const onPlaceClick = useCallback((lat: number, lon: number) => {
        dispatch(getCurrentWeatherTC(lat, lon))
        dispatch(getForecastTC(3, lat, lon))
        dispatch(cleanDataAC())
        setSearchVal('')
    }, [searchVal])

    useEffect(() => {
        debouncedSearchTerm && dispatch(searchTC(searchVal))
    }, [debouncedSearchTerm])

    return (
        <div className='container'>
            <div className='sectionWrap'>
                <h2>Search</h2>
                <Input value={searchVal} labelTitle='' onChange={onInputChange} placeholder='Search a place.....'/>
                <div className={styles.options}>
                    {searchData.map(d => <p className={styles.option}
                                            key={d.id}
                                            onClick={() => onPlaceClick(d.lat, d.lon)}>{d.name}</p>)}
                </div>
            </div>
        </div>
    )
}

export default Search