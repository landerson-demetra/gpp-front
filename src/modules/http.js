import axios from 'axios'
import Bus from '../bus'

const http = axios.create({
    baseURL: window.location.protocol + '//' + window.location.hostname + '/api/v1/'
})

http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('gpp_token')

http.interceptors.response.use(undefined, (err) => {
  if (err.response != undefined) {
    if(err.response.status == 401){
      localStorage.removeItem('gpp_token')
    }

    if (err.response.status == 422) {
      Bus.$emit('show-errors', err.response.data.messages.errors)
    }

    if (err.response.status == 409) {
      Bus.$emit('show-errors', err.response.data.messages)
    }
  }
  return Promise.reject(err)
});

export default http