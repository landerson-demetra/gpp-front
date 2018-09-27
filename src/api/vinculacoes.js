import http from '../modules/http'

const get = (PEP) => {
    return new Promise((resolve, reject) => {
        http.get('vinculacao/pep/' + PEP)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const store = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('vinculacao', datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { get, store }