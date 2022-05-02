
const initialState = { 
    id: null,
    email: null,
    isAuth: false
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                email: action.email,
                id: action.id,
                isAuth: true
            }
        }
        case 'VALID_AUTH': {
            return {
                ...state,
                email: action.email,
                id: action.id,
                isAuth: true,
            }
        }
        case 'LOGOUT': {
            return initialState
        }
        default:
            return state
    }
}