import http from '../modules/http'

const get = (params = {}) => {
    return new Promise((resolve, reject) => {
        if(!params.id)
            http.get('/fornecedor', {params: params}).then(r => resolve(r.data)).catch(e => reject(e))
        else
            http.get('/fornecedor/' + params.id).then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const store = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('/fornecedor', datas).then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const update = (datas) => {
    datas._method = 'PATCH' // transforming the request
    return new Promise((resolve, reject) => {
        http.post('/fornecedor/' + datas.id, datas).then(r => resolve(r.data)).catch(e => reject(e))
    })
}


const deletedata = (id) => {
    return new Promise((resolve, reject) => {
        http.delete('/fornecedor/' + id).then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { get, store, update, deletedata };