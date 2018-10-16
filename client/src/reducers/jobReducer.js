import { GET_JOBS, GET_JOB, ADD_JOB, DELETE_JOB, JOB_LOADING } from '../actions/types'

const initialState = {
    jobs: [],
    job: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case JOB_LOADING: 
            return {
                ...state,
                loading: true
            }

        case GET_JOBS:
            return {
                ...state,
                jobs: action.payload,
                loading: false
            }
        
        case GET_JOB:
            return {
                ...state,
                job: action.payload,
                loading: false
            }  
        
        case ADD_JOB:
            return {
                ...state,
                jobs: [action.payload, ...state.posts]
            }      
    
        default:
            return state
    }
}