import { collection, getDocs } from "firebase/firestore";
import { getWeatherDaily, getByIp } from "../../utils/connection";
import { db } from "../../utils/firebaseConfig";
import { SET_LIST_FAVORITES, SET_LOCATION } from "../constants/location"

export const setLocation = (location, city) => async dispatch => {
    const response = await getWeatherDaily(location)
    dispatch({
        type: SET_LOCATION,
        location,
        weather: response,
        city
    })
}

export const getLocationUser = () => async dispatch => {
    const location = await getByIp()
    if (location) {
        const response = await getWeatherDaily([location.longitude, location.latitude])
        dispatch({
            type: SET_LOCATION,
            location: [location.longitude, location.latitude],
            city: location.city,
            weather: response
        })
    }
}

export const getListFavorites = () => async dispatch => {
    const getData = await getDocs(collection(db, "favorites"));
    const list = []
    getData.forEach(item => list.push(item.data()))
    const formatted = list.map(item => ({...item, dateSave: new Date(item.dateSave.toDate()).toISOString() }))
    dispatch({
        type: SET_LIST_FAVORITES,
        list: formatted 
    })
}
