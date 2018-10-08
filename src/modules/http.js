import Bus from '../bus'
import axios from 'axios'
import store from '../store'

import config from '../config'

import { AUTH_LOGOUT } from '../store/actions/auth'

const http = axios.create({ baseURL: config.base_url })

http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem(config.token_name)

/* [ Numero de requisiçoes pendentes ] */
var pRequests = 0

http.interceptors.request.use((config) => {
    pRequests++
    //
    Bus.$emit('isFetching', true)
    return config
}, (err) => {
    pRequests--
    return Promise.reject(err)
})

http.interceptors.response.use((response) => {
    pRequests--
    //
    if(pRequests == 0) {
        Bus.$emit('isFetching', false)
    }
    return response
}, (err) => {
    pRequests--
    //
    Bus.$emit('isFetching', false)

    return new Promise((resolve, reject) => {
        if(err.response.status === 401 && err.config && !err.config.__isRetryRequest)
            store.dispatch(AUTH_LOGOUT)
        if(err.response.status == 422)
            Bus.$emit('response-errors', { messages: err.response.data.messages.errors, code: 422 })
        if(err.response.status == 409)
            Bus.$emit('response-errors', { messages: err.response.data.messages, code: 409 })

        throw err
    })
})

export default http