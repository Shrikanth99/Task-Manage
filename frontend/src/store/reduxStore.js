import {configureStore} from '@reduxjs/toolkit'
import authReducer from './reduxSlice'
import loaderReducer from './loaderSlice'
const store = configureStore({
    reducer : {
        auth : authReducer,
        loader : loaderReducer
    }
})

export default store