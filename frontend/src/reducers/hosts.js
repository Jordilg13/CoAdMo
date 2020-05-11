export default (state = {}, action) => {

    switch (action.type) {
        case "GET_HOSTS":
            return {
                ...state,
                hosts: action.payload
            }
        default:
            return state
    }

}
