import axios from "axios"

const urlmaps = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
const complementURL = "&language=es&access_token=pk.eyJ1IjoibWFydHpsdW5haG0iLCJhIjoiY2wybGFzOHpzMGJ1ajNpbm96bWJwdmNodyJ9.v31NM8Pj9JIcOgr8dbprJg" 

export const geocodingSearch = async (search) => {
    const formatUrl = `${urlmaps}${search}.json?${complementURL}`
   const { data } = await axios.get(formatUrl)
   return data.features
}

const urlWeather = "https://api.openweathermap.org/data/2.5/onecall?"
const complementURLWeather = "&units=metric&exclude=&appid=4a80e61a438aceb3bad06ba057d244b8"

export const getWeatherDaily = async (location) => {
    const { data } = await axios.get(`${urlWeather}lat=${location[1]}&lon=${location[0]}${complementURLWeather}`)
    return data
}

export const getByIp = async () => {
    const { data } = await axios.get("https://ipapi.co/json/")
    return data
}