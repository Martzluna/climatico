import { combineReducers } from 'redux';
import locationReducer from './location';
import userReducer from './user';

const rootReducer = combineReducers({
    location: locationReducer,
    user: userReducer
});

export default rootReducer;