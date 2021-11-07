import { ADD_ITEM, REMOVE_ITEM } from "./types";

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

export { addItem, removeItem };