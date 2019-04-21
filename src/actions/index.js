import axios from 'axios';

export const addCartItem = (item) => {
    return {
        type: "CART_ADDITEM",
        payload: item
    }
};

export const removeCartItem = (item) => {
    return {
        type: "CART_REMOVEITEM",
        payload: item
    }
}

export const addPrev = (data) => {
    return {
        type: "ADD_PREV",
        payload: data
    }
}

export const addPrevOptions = (data) => {
    return {
        type: "ADD_PREV_OPTIONS",
        payload: data
    }
}

export const removePrevOptions = () => {
    return {
        type: "CLEAN_PREV_OPTIONS"
    }
}

export const cleanCart = () =>{
    return {
        type: "CLEAN_CART"
    }
}

export const cleanCartInfo = () =>{
    return {
        type: "CLEAN_CART_INFO"
    }
}

export const updatePrev = (thing, action) => {
    switch(action){
        case 'size':
        return {
            type: "UPDATE_SIZE",
            payload: thing
        }
        case 'color':
        return {
            type: "UPDATE_COLOR",
            payload: thing
        }
        case 'img':
        return {
            type: "UPDATE_IMG",
            payload: thing
        }
        case 'option':
        return {
            type: "UPDATE_OPTION",
            payload: thing
        }
        case 'price':
        return {
            type: "UPDATE_PRICE",
            payload: thing
        }
        }
}

export const updateLang = (lang) => {
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
        }
}

export const updateCartInfo = (data, action) => {
    switch(action){
        case 'add':
        return {
            type: "UPDATE_CART_ADD",
            payload: data
        }
        case 'remove':
        return {
            type: "UPDATE_CART_REMOVE",
            payload: data
        }
        }
}

export function fetchProductsPending() {
    return {
        type: 'FETCH_PRODUCTS_PENDING'
    }
}

export function fetchProductsSuccess(products) {
    return {
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: products
    }
}

export function fetchProductsError(error) {
    return {
        type: 'FETCH_PRODUCTS_ERROR',
        error: error
    }
}

export function fetchShopData() {
    return function(dispatch) {
      dispatch(fetchProductsPending())
      return axios.get(`http://www.ggegypt.com/server/fetchShop`)
      .then(function (response) {
          dispatch(fetchProductsSuccess(response.data.data))
      })
      .catch(function (error) {
        dispatch(fetchProductsError(error))
    });
    };
}