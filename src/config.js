let config = {
    // Route
    route_mode: 'hash',

    // Auth
    oauth_route: 'oauth/token',
    token_name: 'gpp__token',
    client_id: 2,
    client_secret: 'UUWJnnG6T6quLwnX6alQb2dmwK4bUwz4JQGYNse2',

    // Errors
    errors: {
        unexpected: { group: 'normal', type: 'error', title: 'Ops :/', text: 'Ocorreu um erro inesperado' }
    },

    // Currency
    currency: {
        symbol : '', // R$
        thousandsSeparator: '.',
        fractionCount: 2,
        fractionSeparator: ',',
        symbolPosition: 'front',
        symbolSpacing: true
    },

    // V-Money
    vMoney: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
    }
}


if(window.location.hostname !== 'localhost') {
    config.base_url = 'http://10.200.100.106:8082/api/v1/'
    config.cep_url = 'http://10.200.100.106:8082/api/v1/cep?cep={cep}'
} else {
    config.base_url = window.location.protocol + '//' + window.location.hostname + '/api/v1/'
    config.cep_url = window.location.protocol + '//' + window.location.hostname + '/api/v1/cep?cep={cep}'
}

export default config