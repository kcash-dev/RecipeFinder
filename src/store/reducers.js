import { ADD_ITEM, REMOVE_ITEM } from "./types";

//initial state
const initialState = {
    ingredients: []
}

//Reducer function
function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_ITEM:
            return {
                ...state, 
                ingredients: [...state.ingredients, action.payload]
            }
            break;
        case REMOVE_ITEM:
            const itemToRemove = action.payload.name
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.name != itemToRemove)
            }
        default:
            return state;
    }
}

export default reducer;