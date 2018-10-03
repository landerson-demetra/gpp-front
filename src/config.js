export default {
    // Route
    route_mode: 'hash',

    // Http
    base_url: window.location.protocol + '//' + window.location.hostname + '/api/v1/',

    // Auth
    oauth_route: 'oauth/token',
    token_name: 'gpp__token',
    client_id: 2,
    client_secret: 'UUWJnnG6T6quLwnX6alQb2dmwK4bUwz4JQGYNse2',

    // Cep
    cep_url: 'http://republicavirtual.com.br/web_cep.php?cep={cep}&formato=json',

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