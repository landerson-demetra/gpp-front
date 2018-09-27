import http from '../modules/http'

const store = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('status', datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const get = (pep) => {
    return new Promise((resolve, reject) => {
        http.get('status/pep/' + pep)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const update = (datas, id) => {
    datas._method = 'PATCH'
    return new Promise((resolve, reject) => {
        http.post('status/' + id, datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { store, get, update }