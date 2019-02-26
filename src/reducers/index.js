import {combineReducers} from 'redux';
import shopReducer from './reducers_shop';
import cartItemsReducer from './cartFunctions' 
import loginReducer from './loginFunctions' 
import server from './server' 
import fnCode from './fortNiteCreatorCode' 

const allReducers = combineReducers({
    shop: shopReducer,
    loginSession: loginReducer,
    server: server,
    fnCode: fnCode,
    cartItems: cartItemsReducer
})

export default allReducers;