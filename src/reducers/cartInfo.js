const initialState = {
    totalPrice: 0,
    totalItems: 0,
    shippingPrice: 0,
    shippingCity: ''
}

export default function(state = initialState, action){
    
    switch(action.type){
            case 'UPDATE_CART_ADD': {
                return { 
                    ...state, 
                    totalPrice: state.totalPrice + action.payload.price,     
                    totalItems: state.totalItems + action.payload.items
                }
            }

            case 'UPDATE_SHIPPING_PRICE': {
                return { ...state, shippingPrice: action.payload }
            }

            case 'UPDATE_SHIPPING_CITY': {
                return { ...state, shippingCity: action.payload }
            }

            case 'UPDATE_CART_REMOVE': {
                return { 
                    ...state, 
                    totalPrice: state.totalPrice - action.payload.price,     
                    totalItems: state.totalItems - action.payload.items
                }
            }

            case 'CLEAN_CART_INFO':{
                return { 
                    ...state, 
                    totalPrice: 0,     
                    totalItems: 0,
                    shipping: 0
                }
            }

        }
    return state;
}