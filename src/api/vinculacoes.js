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

const update = (datas, id) => {
    datas._method = 'PATCH'
    return new Promise((resolve, reject) => {
        http.post('vinculacao/' + id, datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const deletedata = (id) => {
    return new Promise((resolve, reject) => {
        http.delete('vinculacao/' + id)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { get, store, update, deletedata }