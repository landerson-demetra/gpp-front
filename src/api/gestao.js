import http from '../modules/http'

const fetchGestao = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('gestao', datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const fetchUnidades = (datas) => {
    return new Promise((resolve, reject) => {
        http.post('unidade-datas', datas)
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

const resumo = (PEP) => {
    return new Promise((resolve, reject) => {
        http.post('gestao/resumo', {PEP: PEP})
            .then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { fetchGestao, fetchUnidades, resumo }