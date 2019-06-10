import axios from 'axios';

export const changeLang = (lang) =>{
    return {
        type: "UPDATE_LANG",
        payload: lang 
    }
}

export const loginFunction = (data, action) => {
    switch(action){
        case 'login':
        return {
            type: "USR_LOGIN",
            payload: data
        }
        case 'logout':
        return {
            type: "USR_LOGOUT"
        }
        default:
        return undefined
        }
}

export const updateCartPrice = (data, action) => {
    switch(action){
        case 'clean':
        return {
            type: "CLEAN_CART",
        }
        default:
        return undefined
        }
}

export function updateProfilePhoto(photo) {
    return {
        type: 'USR_UPDATE_PHOTO',
        payload: photo
    }
}

export const removeCartItem = (item) => {
    return {
        type: "CART_REMOVEITEM",
        payload: item
    }
};

export const addCartItem = (item) => {
    return {
        type: "CART_ADDITEM",
        payload: item
    }
};

export function updateCart(cart, token) {
    return function(dispatch) {
      dispatch(updateCartPending())
      return  axios.post("https://www.ggegypt.com/server/setUserCart", cart, {headers: {
        'Content-Type': 'application/json',
        'authorization': token}})
      .then(function (response) {
        dispatch(updateCartSuccess())
      })
      .catch(function (error) {
    });
    };
}

export function updateCartPending() {
    return {
        type: 'UPDATE_CART_PENDING'
    }
}

export function updateCartSuccess() {
    return {
        type: 'UPDATE_CART_SUCCESS',
    }
}

export function fetchCart(token) {
    return function(dispatch) {
      dispatch(fetchCartPending())
      return  axios.get("https://www.ggegypt.com/server/fetchUserCart", {headers: {
        'Content-Type': 'application/json',
        'authorization': token}})
      .then(function (response) {
        dispatch(fetchCartSuccess(response.data.data))
      })
      .catch(function (error) {
        dispatch(fetchCartError(error))
    });
    };
}

export function fetchCartPending() {
    return {
        type: 'FETCH_CART_PENDING'
    }
}

export function fetchCartSuccess(cart) {
    return {
        type: 'FETCH_CART_SUCCESS',
        payload: cart
    }
}

export function fetchCartError(error) {
    return {
        type: 'FETCH_CART_ERROR',
        payload: error
    }
}