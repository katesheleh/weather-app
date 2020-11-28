import {combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {requestReducer} from "./request-reducer";
import {currentWeatherReducer} from "./currentWeather-reducer";
import {forecastReducer} from "./forecast-reducer";
import {searchReducer} from "./search-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    currentWeather: currentWeatherReducer,
    forecast: forecastReducer,
    request: requestReducer,
    search: searchReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store;