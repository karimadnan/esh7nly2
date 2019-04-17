const initialState = {
  items: [],
  fetching: false,
  fetched: false,
  error: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
      case 'FETCH_PRODUCTS_PENDING': 
          return {
              ...state,
              fetching: true
          }
      case 'FETCH_PRODUCTS_SUCCESS':
          return {
              ...state,
              fetching: false,
              fetched: true,
              shop: action.payload
          }
      case 'FETCH_PRODUCTS_ERROR':
          return {
              ...state,
              fetching: false,
              error: action.error
          }
      default: 
          return state;
  }
}