import React from 'react';
import './App.css';
import Weather from "./components/CurrentWeather/Weather";
import Forecast from "./components/Forecast/Forecast";
import Search from "./components/Search/Search";

function App() {
    return (
        <div className="App">
            <Search/>
            <Weather/>
            <Forecast/>
        </div>
    );
}

export default App;
