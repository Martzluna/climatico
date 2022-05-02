import React from 'react'
import { useSelector } from 'react-redux';
import BarWeather from './BarWeather';
import "../styles/ContentInfoWeather.scss";


function ContentInfoWeather() {
    const infoWeather = useSelector(state => state.location.weather)
    return (
        <div>
            <div className='details'>
                <span>Wind: {infoWeather.current.wind_speed} </span>
                <span>Humidity: {infoWeather.current.humidity}</span>
                <span>Dew Pt: {infoWeather.current.dew_point}</span>
                <span>UV index: {infoWeather.current.uvi}</span>
                <span>Visibility: {infoWeather.current.visibility}</span>
                <span>Pressure: {infoWeather.current.pressure}</span>
            </div>
            <div className='title'>
                <div className='contentIcon'>
                    <img src={` http://openweathermap.org/img/wn/${infoWeather.current.weather[0].icon}@2x.png`} alt='icon-weather' />
                    <div>
                        <h1>{Math.round(infoWeather.current.temp)}° {infoWeather.current.weather[0].main}</h1>
                        <p>
                            <span>Feels like: {Math.round(infoWeather.current.feels_like)}° </span>
                            <span>Low: {infoWeather.daily[0].temp.min}° </span>
                            <span>High: {infoWeather.daily[0].temp.max}°</span>
                        </p>
                    </div>
                </div>
                <p>{infoWeather.current.weather[0].description}</p>
            </div>

            <BarWeather weather={infoWeather} />
            
        </div>
    )
}

export default ContentInfoWeather