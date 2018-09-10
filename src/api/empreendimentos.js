import http from '../modules/http'

const get = (params) => {
    return new Promise((resolve, reject) => {
        http.get('empreendimento', {params: params})
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { get }