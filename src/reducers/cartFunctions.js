const initialState = {
    cart: []
}


export default function(state = initialState, action){
    
    switch(action.type){
        case 'CART_ADDITEM':
        return { 
            ...state,
            cart: [...state.cart, action.payload]
        }

        case 'CART_REMOVEITEM':
        return {
            ...state,
            cart: state.cart.filter(item => item !== action.payload)
        }
        break;
        }
    return state;
}