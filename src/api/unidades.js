import http from '../modules/http'

const list = (params) => {
    return new Promise((resolve, reject) => {
        http.get('unidades', {params: params})
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const exists = (PEP) => {
    return new Promise((resolve, reject) => {
        http.get('unidade/exists/' + PEP).then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { list, exists }