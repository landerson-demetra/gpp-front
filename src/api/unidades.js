import http from '../modules/http'

const exists = (PEP) => {
    return new Promise((resolve, reject) => {
        http.get('unidade/exists/' + PEP).then(r => resolve(r.data)).catch(e => reject(e))
    })
}

export { exists }