export default {
    // Route
    route_mode: 'hash',

    // Http
    base_url: window.location.protocol + '//' + window.location.hostname + '/api/v1/',

    // Auth
    oauth_route: 'oauth/token',
    token_name: 'gpp__token',
    client_id: 2,
    client_secret: 'KFh3mT5NcU0ghNBfPu74oaDRZA2DecSa5r44WZ7y',

    // Cep
    cep_url: 'http://republicavirtual.com.br/web_cep.php?cep={cep}&formato=json',

    // Errors
    errors: {
        unexpected: { group: 'normal', type: 'error', title: 'Ops :/', text: 'Ocorreu um erro inesperado' }
    }
}