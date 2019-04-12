const initialState = {
    cart: [],
    itemPrev: {}
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
            case 'CART_ADDITEM': {
            const { cart } = state
            const newItem = action.payload
                if ( quantityForItem(cart, newItem) !== 0 ) {
                    return { ...state, cart: updateQuantity(cart, newItem, +1) }
                }
                return { ...state, cart: add(cart, newItem) }
            }

            case 'CART_REMOVEITEM': {
            const { cart } = state
            const itemToRemove = action.payload
                if ( quantityForItem(cart, itemToRemove) > 1 ) {
                    return { ...state, cart: updateQuantity(cart, itemToRemove, -1) }
                }
                return { ...state, cart: remove(cart, itemToRemove) }
            }

            case 'ADD_PREV': {
                return Object.assign({}, state, {
                    itemPrev: action.payload
                  })
                }
            case 'UPDATE_SIZE': {
                return {
                    ...state,
                    itemPrev: {
                      ...state.itemPrev,
                      size: action.payload
                    }
                  }
                }
            case 'UPDATE_COLOR': {
                return {
                    ...state,
                    itemPrev: {
                        ...state.itemPrev,
                        color: action.payload
                    }
                    }
                }
            case 'UPDATE_IMG': {
                return {
                    ...state,
                    itemPrev: {
                        ...state.itemPrev,
                        defaultImage: action.payload
                    }
                    }
                }
            case 'UPDATE_OPTION': {
                return {
                    ...state,
                    itemPrev: {
                        ...state.itemPrev,
                        defaultOpt: action.payload
                    }
                    }
                }
    
            case 'UPDATE_PRICE': {
                return {
                    ...state,
                    itemPrev: {
                        ...state.itemPrev,
                        price: action.payload
                    }
                    }
                }
            case 'CLEAN_CART': {
                return { ...state, cart: [] }
            }
        }

    return state;
}