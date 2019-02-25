import {combineReducers} from 'redux';
import shopReducer from './reducers_shop';
import cartItemsReducer from './cartFunctions' 
import loginReducer from './loginFunctions' 

const allReducers = combineReducers({
    shop: shopReducer,
    loginSession: loginReducer,
    cartItems: cartItemsReducer
})

export default allReducers;