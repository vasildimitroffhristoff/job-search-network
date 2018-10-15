import axios from 'axios'
import {GET_ERRORS, SET_CURRENT_USER }  from './types'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

// Register
export const registeruser = (userData, history) => dispatch => {
        axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
} 

// Login
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded))
        })
        .catch(err =>  dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// Set user JWT
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Logout 
export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
    window.location.href='/'
}