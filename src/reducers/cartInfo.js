const initialState = {
    totalPrice: 0,
    totalItems: 0
}

export default function(state = initialState, action){
    
    switch(action.type){
            case 'UPDATE_CART_ADD': {
                return {
                    totalPrice: state.totalPrice + action.payload.price,
                    totalItems: state.totalItems + action.payload.items
                }
            }

            case 'UPDATE_CART_REMOVE': {
                return {
                    totalPrice: state.totalPrice - action.payload.price,
                    totalItems: state.totalItems - action.payload.items
                }
            }
        break;
        }
    return state;
}