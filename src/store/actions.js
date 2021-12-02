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

function addToShoppingCart(item) {
    return {
        type: ADD_SHOPPINGCART,
        payload: item
    }
}

function removeFromShoppingCart(item) {
    return {
        type: REMOVE_SHOPPINGCART,
        payload: item
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

export { addItem, removeItem, loginUser, logoutUser, addToShoppingCart, removeFromShoppingCart };