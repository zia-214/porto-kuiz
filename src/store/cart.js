const DEFAULT_STATE = {
    items: [],
}

export const cartReducer = (state = DEFAULT_STATE, action) => {

    if (action.type === "CART_GET") {
        const dupstate = { ...state }
        dupstate.items = action.payload
        return dupstate
    }
    return state;
}