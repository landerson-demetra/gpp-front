import http from '../modules/http'

const get = (idProjeto) => {
    return new Promise((resolve, reject) => {
        http.get('vinculacao/projeto/' + idProjeto)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const store = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('vinculacao', datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const storeMany = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('vinculacao/storemany', datas)
            .then(r => resolve(r.data)).catch(r => reject(e))
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

export { get, store, storeMany, update, deletedata }