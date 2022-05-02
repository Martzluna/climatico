import React from 'react'
import { colorWeather, getHour } from '../utils/constants'
import '../styles/barWeather.scss'
import styled from 'styled-components'

const ColorBar = styled.div`
    background-color: ${props => props.color};
    flex: 1;
    height: 100%;
    
    div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    div:hover {
        background-color: #FFFFFF;
    }

    [data-tooltip]:before {
        /* needed - do not touch */
        content: attr(data-tooltip);
        position: absolute;
        opacity: 0;
        
        /* customizable */
        transition: all 0.15s ease;
        padding: 10px;
        color: #333;
        border-radius: 10px;
        box-shadow: 2px 2px 1px silver;    
    }
    
    [data-tooltip]:hover:before {
        /* needed - do not touch */
        opacity: 1;
        
        /* customizable */
        background: #CACACA;
        margin-top: -50px;
        margin-left: 20px;    
    }
    
    [data-tooltip]:not([data-tooltip-persistent]):before {
        pointer-events: none;
    }
`

function BarWeather({ weather }) {
    const hourlysOneDay = weather.hourly.slice(0, 25)

    const listWeathers = hourlysOneDay.map(item => item.weather[0].main) //.filter((item, index, array) => array[index -1] !== item)
    return (
        <div className='barContainer'>
            <div className='contentColors'>
                {listWeathers.map((weather, index) => (
                    <ColorBar color={colorWeather[weather]} key={index} >
                        <div data-tooltip={`${getHour(hourlysOneDay[index].dt)}, ${weather} ${Math.round(hourlysOneDay[index].temp)} grados`} >
                            <span>{weather !== listWeathers[index -1] ? weather : "" }</span>
                        </div>
                    </ColorBar>
                ))}
            </div>
            <div className='contentHourly'>
                {hourlysOneDay.map((hour, index) => (
                    <div key={index} className='hour'>
                        <span>{index % 2 === 0 ? "'" : "|"}</span>
                        <span>
                            {index === 0 ? 'Now' : index % 2 === 0 ? getHour(hour.dt) : ""}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BarWeather