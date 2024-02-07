
export const add = (id) => {
    return (dispatch) => {
        dispatch({
            type: 'addItem',
            payload: id,
        })
    }
}

export const getCart = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'getCart',
            payload: data,
        })
    }
}

export const incrementItem = (id) => {
    return (dispatch) => {
        dispatch({
            type: "increment",
            payload: id,
        })
    }
}
export const decrementItem = (id) => {
    return (dispatch) => {
        dispatch({
            type: "decrement",
            payload: id,
        })
    }
}
export const deleteItem = () => {
    return (dispatch) => {
        dispatch({
            type: "delete",
        })
    }
}
