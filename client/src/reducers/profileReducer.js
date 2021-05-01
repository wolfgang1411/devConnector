import { GET_PROFILE , PROFILE_ERROR , CLEAR_PROFILE , UPDATE_PROFILE , GET_PROFILES, GET_GITHUB} from './actions/types'

const initialState = {
    profile:null,
    profiles:[],
    repos : [],
    loading:true,
    errors:{}
}

export const profile = function(state=initialState,action){
    const {type , payload} = action
    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile:payload,
                loading:false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles:payload,
                loading:false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                errors:payload,
                loading:false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile:null,
                loading:false,
                repos:[]
            }
        case GET_GITHUB:
            return {
                ...state,
                repos:payload,
                loading:false
            }
        default:
            return state
    }
}