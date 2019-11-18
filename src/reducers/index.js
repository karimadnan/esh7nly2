import {combineReducers} from 'redux';
import cartItemsReducer from './cartFunctions' 
import loginReducer from './loginFunctions' 
import settings from './settings' 
import server from './server' 

const allReducers = combineReducers({
    settings: settings,
    loginSession: loginReducer,
    server: server,
    cartItems: cartItemsReducer
})

export default allReducers;