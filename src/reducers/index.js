import {combineReducers} from 'redux';
import shopReducer from './reducers_shop';
import cartItemsReducer from './cartFunctions' 
import loginReducer from './loginFunctions' 
import server from './server' 
import updateCartInfo from './cartInfo' 
import extras from './extras' 

const allReducers = combineReducers({
    shop: shopReducer,
    loginSession: loginReducer,
    server: server,
    updateCartInfo: updateCartInfo,
    extras: extras,
    cartItems: cartItemsReducer
})

export default allReducers;