import axios from 'axios'
import Bus from '../bus'
import { AUTH_LOGOUT } from '../store/actions/auth'

const http = axios.create({
    baseURL: window.location.protocol + '//' + window.location.hostname + '/api/v1/'
})

http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('gpp__token')

http.interceptors.response.use(undefined, (err) => {
  return new Promise((resolve, reject) => {
    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      this.$store.dispatch(AUTH_LOGOUT)
    }

    if (err.response.status == 422) {
      Bus.$emit('show-errors', err.response.data.messages.errors)
    }

    if (err.response.status == 409) {
      Bus.$emit('show-errors', err.response.data.messages)
    }

    throw err;
  });
});

export default http