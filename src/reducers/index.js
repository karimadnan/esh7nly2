import {combineReducers} from 'redux';
import cartItemsReducer from './cartFunctions' 
import loginReducer from './loginFunctions' 
import server from './server' 

const allReducers = combineReducers({
    loginSession: loginReducer,
    server: server,
    cartItems: cartItemsReducer
})

export default allReducers;