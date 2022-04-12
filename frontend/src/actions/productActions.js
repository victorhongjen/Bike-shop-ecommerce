import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
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
        const { data } = await axios.get('/api/products/')
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




export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    //send in the headers, content type of application/json. Also token for protected routes
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    //make request
    await axios.delete(`/api/products/${id}`, config)

    //dispatch user order success
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


// After create the action, in homescreen, fire listProducts action off
