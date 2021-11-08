import { ADD_ITEM, ADD_SHOPPINGCART, LOGIN_USER, LOGOUT_USER, REMOVE_ITEM } from "./types";

//initial state
const initialState = {
    ingredients: [],
    loggedIn: false,
    shoppingCart: []
}

//Reducer function
function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_ITEM:
            return {
                ...state, 
                ingredients: [
                    ...state.ingredients, 
                    action.payload
                ]
            }
            break;
        case REMOVE_ITEM:
            const itemToRemove = action.payload.name
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.name != itemToRemove)
            }
        case ADD_SHOPPINGCART:
            return {
                ...state,
                shoppingCart: [
                    ...state.shoppingCart,
                    action.payload
                ]
            }
        case LOGIN_USER:
            return {
                ...state,
                loggedIn: true
            }
        case LOGOUT_USER:
            return {
                ...state,
                loggedIn: false
            }
        default:
            return state;
    }
}

export default reducer;