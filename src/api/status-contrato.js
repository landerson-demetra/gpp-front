import http from '../modules/http'

const get = () => {
    return new Promise((resolve, reject) => {
        http.get('status-contrato')
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { get }
