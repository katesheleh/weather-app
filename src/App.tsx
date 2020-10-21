import React from 'react';
import './App.scss';
import Weather from "./components/CurrentWeather/Weather";
import Forecast from "./components/Forecast/Forecast";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className="App">
            <h1>- Weather -</h1>
            <Search/>
            <Weather/>
            <Forecast/>
            <Footer/>
        </div>
    );
}

export default App;
