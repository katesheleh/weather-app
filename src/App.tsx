import React from 'react';
import './App.css';
import Weather from "./components/CurrentWeather/Weather";
import Forecast from "./components/Forecast/Forecast";

function App() {
  return (
    <div className="App">
        <Weather/>
        <Forecast/>
    </div>
  );
}

export default App;
