import {combineReducers} from 'redux';
import {alert} from './alertsReducer'
import {auth} from './authReducer';
import {profile} from './profileReducer'
import {post} from './postReducer'

export default combineReducers({
    alerts:alert,
    register:auth,
    profile:profile,
    post:post
}) 