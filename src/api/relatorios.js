import http from '../modules/http'

const store = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('relatorio', datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const generate = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('relatorio/generate', datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { generate, store }