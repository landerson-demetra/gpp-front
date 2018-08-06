import axios from 'axios'
import Bus from '../bus'

var http = {
    setAxios: function () {
        var axiosInstance = axios.create({
            baseURL: window.location.origin + '/trip-book/back/public/api/'
        })

        if(localStorage.getItem('token') !== undefined) {
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        }

        axiosInstance.interceptors.response.use(function (response) {
            return response
        }, function (err) {
            if (err.response != undefined) {
                if(err.response.status == 401){
                    localStorage.removeItem('token')
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

        window.axios = axiosInstance
    }
}

export default http