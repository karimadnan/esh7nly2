import {combineReducers} from 'redux';
import shopReducer from './reducers_shop';
import cartItemsReducer from './cartFunctions' 
import loginReducer from './loginFunctions' 
import server from './server' 
import updateCartInfo from './cartInfo' 
import lang from './langchoice' 

const allReducers = combineReducers({
    shop: shopReducer,
    loginSession: loginReducer,
    server: server,
    updateCartInfo: updateCartInfo,
    lang: lang,
    cartItems: cartItemsReducer
})

export default allReducers;