import http from '../modules/http'

const get = (params = {}) => {
    return new Promise((resolve, reject) => {
        if(!params.id)
            http.get('fornecedor', {params: params})
                .then(r => resolve(r.data)).catch(e => reject(e))
        else
            http.get('fornecedor/' + params.id)
                .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const getForList = (params) => {
    return new Promise((resolve, reject) => {
        http.get('fornecedor/forlist', {params: params})
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const getForSeg = (segmento) => {
    return new Promise((resolve, reject) => {
        http.get('fornecedor/forseg', {params: { segmento: segmento }})
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const store = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('fornecedor', datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const update = (id, datas) => {
    datas._method = 'PATCH' // transforming the request
    return new Promise((resolve, reject) => {
        http.post('fornecedor/' + id, datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const deletedata = (id) => {
    return new Promise((resolve, reject) => {
        http.delete('fornecedor/' + id)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { get, getForList, getForSeg, store, update, deletedata };