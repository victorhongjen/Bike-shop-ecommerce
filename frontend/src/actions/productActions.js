import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from '../constants/productConstants'

// same as useEffect from homescreen component
// fetch from /api/products, gets data, map through the data down in return portion
// fetch through action instead of directly in the component
// dispatch action to reducer to update state in store
// redux thunk: add a function within a function
// dispatch is how we dispatch the actions
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('/api/products')
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

// After create the action, in homescreen, fire listProducts action off
