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

export { get }