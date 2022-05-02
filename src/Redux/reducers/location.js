import { SET_LIST_FAVORITES, SET_LOCATION } from "../constants/location";

const initialState = { 
    location: [],
    weather: false,
    list: []
}

export default function locationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOCATION: {
            return {
                ...state,
                location: action.location,
                weather: action.weather,
                city: action.city
            } 
        }
        case SET_LIST_FAVORITES: {
            return {
                ...state,
                list: action.list
            }
        }
        default:
            return state
    }
}