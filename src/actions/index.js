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
        break;
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
        break;
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
        break;
        }
}
