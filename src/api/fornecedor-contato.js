import http from '../modules/http'

const get = (params = {}) => {
    return new Promise((resolve, reject) => {
        if(!params.id)
            http.get('/fornecedor-contato', {params: params}).then(r => resolve(r.data)).catch(e => reject(e))
        else
            http.get('/fornecedor-contato/' + params.id).then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const store = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('/fornecedor-contato', datas).then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const update = (datas) => {
    return new Promise((resolve, reject) => {
        http.patch('/fornecedor-contato/' + datas.id, datas).then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const deletedata = (id) => {
    return new Promise((resolve, reject) => {
        http.delete('/fornecedor-contato/' + id).then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { get, store, update, deletedata };
