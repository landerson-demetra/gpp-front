import http from '../modules/http'

const store = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('iptu', datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const update = (datas, id) => {
    datas._method = 'PATCH'
    return new Promise((resolve, reject) => {
        http.post('iptu/' + id, datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const deletedata = (id) => {
    return new Promise((resolve, reject) => {
        http.delete('iptu/' + id)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { store, update, deletedata }