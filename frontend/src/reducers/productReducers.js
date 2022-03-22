import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstants'
// PRODUCT LIST REDUCER - handles product list on homepage
// reducer takes in 1. initial state, 2. action. Dispatch an action to the reducer
// Action is an object with a type, payload of product we fetch from server
// Use switch to evaluate the type in the action object
// 3 types: product list request, list success, fail.
// All cases, return the particular part of the state.
export const productListReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Bring reducer to the store