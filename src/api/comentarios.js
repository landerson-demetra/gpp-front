import http from '../modules/http'

const get = (pep) => {
    return new Promise((resolve, reject) => {
        http.get('comentario/pep/' + pep)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const store = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('comentario', datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const update = (datas, id) => {
    datas._method = 'PATCH'
    return new Promise((resolve, reject) => {
        http.post('comentario/' + id, datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const deletedata = (id) => {
    return new Promise((resolve, reject) => {
        http.delete('comentario/' + id)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { get, store, update, deletedata }