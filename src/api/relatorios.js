import http from '../modules/http'

const get = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('relatorios', datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { get }