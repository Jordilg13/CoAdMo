import {
    LOGIN,
} from "../constants/actionTypes"

const initialState = {

}

export default (state = initialState, action) => {
    console.log("REDUCER:", action);
    switch (action.type) {

        case LOGIN:
            return {
                ...state,
                errors: action.error ? action.payload : null,
                username: !action.error ? action.payload.username : null,
                redirect_to: !action.error ? "/dashboard" : null
            }
        case "SET_ERRORS":
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state
    }

}