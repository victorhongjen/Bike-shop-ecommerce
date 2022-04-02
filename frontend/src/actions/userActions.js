import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        //send in the headers, content type of application/json. Also token for protected routes
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //make request
        const { data } = await axios.post('/api/users/login', { email, password }, config)

        //dispatch user login success
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        //set user to local storage
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
        type: USER_LOGIN_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}

//REGISTER
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
        type: USER_REGISTER_REQUEST,
        })

        //send in the headers, content type of application/json. Also token for protected routes
        const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        }

        //make request
        const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
        )

        //dispatch user login success
        dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
        })
        //login user right away after register
        dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
        })

        //set user to local storage
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
        type: USER_REGISTER_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}