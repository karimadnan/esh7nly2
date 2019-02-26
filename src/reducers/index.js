import {combineReducers} from 'redux';
import shopReducer from './reducers_shop';
import cartItemsReducer from './cartFunctions' 
import loginReducer from './loginFunctions' 
import server from './server' 

const allReducers = combineReducers({
    shop: shopReducer,
    loginSession: loginReducer,
    server: server,
    cartItems: cartItemsReducer
})

export default allReducers;