import Bus from '../bus'
import axios from 'axios'
import store from '../store'

import config from '../config'

import { AUTH_LOGOUT } from '../store/actions/auth'

const http = axios.create({ baseURL: config.base_url })

http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem(config.token_name)

http.interceptors.request.use((config) => {
    Bus.$emit('isFetching', true)
    return config
}, err => Bus.$emit('isFetching', false))

http.interceptors.response.use((response) => {
    Bus.$emit('isFetching', false)
    return response
}, (err) => {
    return new Promise((resolve, reject) => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            store.dispatch(AUTH_LOGOUT)
        }

        if (err.response.status == 422) {
            Bus.$emit('response-errors', err.response.data.messages.errors)
        }

        if (err.response.status == 409) {
            Bus.$emit('response-errors', err.response.data.messages)
        }

        throw err
    })
})

export default http