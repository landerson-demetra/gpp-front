import http from '../modules/http'

const get = (pep) => {
    return new Promise((resolve, reject) => {
        http.get('dados-unidade/pep/' + pep)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const store = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('dados-unidade', datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const update = (datas) => {
    datas._method = 'PATCH' // transforming the request
    return new Promise((resolve, reject) => {
        http.post('/dados-unidade/' + datas.id, datas).then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { get, store }