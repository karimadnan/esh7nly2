const initialState = {
    cart: [],
    totalPrice: 0,
    updatingCart: false,
    updatedCart: false,
    fetching: false,
    fetched: false,
    error: '',
    updateError: ''
}

const quantityForItem = (list, newItem) => {
    const item = list.find(item => item.id === newItem.id)
    return item && item.quantity || 0
  }

const updateQuantity = (list, newItem, variation) =>
  list.map(item => {
    if ( item.id !== newItem.id ) return item
    return { ...item, quantity: item.quantity + variation }
  })

const add = (list, newItem) =>
  list.concat(newItem)

const remove = (list, itemToRemove) =>
  list.filter(item => item.id !== itemToRemove.id)


export default function(state = initialState, action){
    
    switch(action.type){

            case 'CLEAN_CART':
                return { 
                    ...state, 
                    totalPrice: 0,
                    cart: []
                }
        

            case 'UPDATE_CART_PENDING': 
                return {
                    ...state,
                    updatingCart: true,
                    updatedCart: false
                }

            case 'UPDATE_CART_ERROR': 
                return {
                    ...state,
                    updatingCart: false,
                    updateError: action.payload

                }

            case 'UPDATE_CART_SUCCESS': 
                return {
                    ...state,
                    updatingCart: false,
                    updatedCart: true
                }

            case 'FETCH_CART_PENDING': 
                return {
                    ...state,
                    fetching: true,
                    fetched: false,
                    error: ''
                }

            case 'FETCH_CART_ERROR':
                return {
                    ...state,
                    fetching: false,
                    fetched: false,
                    updatingCart: false,
                    cart: [],
                    error: action.payload
                }

            case 'FETCH_CART_SUCCESS':
                return {
                    ...state,
                    fetching: false,
                    fetched: true,
                    cart: action.payload.cart,
                    totalPrice: Number(action.payload.totalPrice)
                }

            case 'CART_ADDITEM': {
                const { cart } = state
                const { totalPrice } = state
                const newItem = action.payload
                    if ( quantityForItem(cart, newItem) !== 0 ) {
                        return { ...state, cart: updateQuantity(cart, newItem, +1), totalPrice: totalPrice + newItem.price }
                    }
                    return { ...state, cart: add(cart, newItem), totalPrice: totalPrice + newItem.price }
            }

            case 'CART_REMOVEITEM': {
                const { cart } = state
                const { totalPrice } = state
                const itemToRemove = action.payload
                    if ( quantityForItem(cart, itemToRemove) > 1 ) {
                        return { ...state, cart: updateQuantity(cart, itemToRemove, -1), totalPrice: totalPrice - itemToRemove.price }
                    }
                    return { ...state, cart: remove(cart, itemToRemove), totalPrice: totalPrice - itemToRemove.price }
            }

        }

    return state;
}