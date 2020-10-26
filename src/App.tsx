import React, {useEffect} from 'react';
import './App.scss';
import Weather from "./components/CurrentWeather/Weather";
import Forecast from "./components/Forecast/Forecast";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {getUserCoordinatesTC} from "./reducers/currentWeather-reducer";
import Preloader from "./components/common/Preloader/Preloader";

function App() {
    const dispatch = useDispatch()
    const requestIsFetching = useSelector<AppRootStateType, boolean>(state => state.request.isFetching)
    const lat = useSelector<AppRootStateType, number>(state => state.currentWeather.lat)
    const lon = useSelector<AppRootStateType, number>(state => state.currentWeather.lon)

    useEffect(() => {
        dispatch(getUserCoordinatesTC())
    }, [])

    return (
        <div className="App">
            {requestIsFetching && <Preloader/>}
            {(!lat && !lon)
                ? <h1>Please allow your browser to share your location</h1>
                : <>
                    <h1>- Weather -</h1>
                    <Search/>
                    <Weather/>
                    <Forecast/>
                    <Footer/>
                </>}


        </div>
    );
}

export default App;
