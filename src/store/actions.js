import { ADD_ITEM, REMOVE_ITEM, LOGIN_USER, LOGOUT_USER, ADD_SHOPPINGCART, REMOVE_SHOPPINGCART } from "./types";

const addItem = ingredientName => {
    return {
        type: ADD_ITEM,
        payload: ingredientName
    }
}

function removeItem(ingredientName) {
    return {
        type: REMOVE_ITEM,
        payload: ingredientName
    }
}

function addToShoppingCart(ingredientName) {
    return {
        type: ADD_SHOPPINGCART,
        payload: ingredientName
    }
}

function loginUser() {
    return {
        type: LOGIN_USER
    }
}

function logoutUser() {
    return {
        type: LOGOUT_USER
    }
}

export { addItem, removeItem, loginUser, logoutUser, addToShoppingCart };