import {
    LOGIN,
} from "../constants/actionTypes"

const initialState = {

}

export default (state = initialState, action) => {
    // console.log("REDUCER:", action);
    switch (action.type) {

        case LOGIN:
            return {
                ...state,
                errors: action.error ? action.payload : null,
                username: !action.error ? action.payload.username : null,
                token: !action.error ? action.payload.token : null,
                isLogged: !action.error ? true : null,
            }
        case "SET_ERRORS":
            return {
                ...state,
                errors: action.payload,
            }
        case "LOGOUT":
            return {
                ...state,
                errors: null,
                username: null,
                token: null,
            }
            case "APP_LOAD":
                return {
                    ...state,
                    token: action.token || null,
                    username: action.payload || null,
                    isLogged: action.payload ? true : null
                }
        default:
            return state
    }

}