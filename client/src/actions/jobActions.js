import axios from 'axios'
import { GET_JOBS, GET_JOB, ADD_JOB, DELETE_JOB, JOB_LOADING, GET_ERRORS, CLEAR_ERRORS } from './types'

export const getJobs = () => dispatch => {
    dispatch(setJobLoading())
    axios.get('/api/jobs')
        .then(res => {
            dispatch({
                type: GET_JOBS,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch({
                type: GET_JOBS,
                payload: null
            })
        )
}

export const getJob = (id) => dispatch => {
    dispatch(clearErrors())
    dispatch(setJobLoading())
    axios.get(`/api/jobs/${id}`)
        .then(res => {
            dispatch({
                type: GET_JOB,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch({
                type: GET_JOB,
                payload: null
            })
        )
}

export const addJob = (jobData, history) => dispatch => {
    axios.post('/api/jobs', jobData)
        .then(res => {
            history.push('/jobs')
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const applyForJob = (id, history) => dispatch => {
    axios.post(`/api/jobs/apply/${id}`)
        .then(res => {
            history.push(`/successful-application/${id}`)
            console.log(res)
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// get all applications for user's job
export const getAllJobApplications = (id) => dispatch => {
    
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}

export const setJobLoading = () => {
    return {
        type: JOB_LOADING
    }
}