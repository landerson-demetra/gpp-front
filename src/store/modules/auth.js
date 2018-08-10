/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'

import http from '../../modules/http'
import router from '../../router'

const state = {token: localStorage.getItem('gpp__token') || '', status: '', hasLoadedOnce: false}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      http.post('oauth/token', user)
      .then(resp => {
        localStorage.setItem('gpp__token', resp.data.access_token)
        http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('gpp__token')
        commit(AUTH_SUCCESS, resp)
        dispatch(USER_REQUEST)
        resolve(resp)
      })
      .catch(err => {
        commit(AUTH_ERROR, err)
        localStorage.removeItem('gpp__token')
        reject(err)
      })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('gpp__token')
      delete http.defaults.headers.common['Authorization']
      router.push({ name: 'login' })
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp.data.access_token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}