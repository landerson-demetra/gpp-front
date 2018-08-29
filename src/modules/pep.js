function mountPEP(spe, empreendimento, fase, bloco = null, unidade = null) {
    
}

function reMountPEP(parsed){
    _.forEach(parsed, function(v,k){
        if(!v) {
            delete parsed[k]
        }
        if(_.isNumber(v)) {
            if(k == 'unidade_cod') {
                if(v <= 99){
                    parsed[k] = '00'+v
                } else if(v > 99 && v <= 999) {
                    parsed[k] = '0'+v
                }
                // <= 999 ? 00999 ! 0999 -> 9999
            }else if(v <= 9) {
                parsed[k] = '0'+v
            }
        }
    })

    return _.values(parsed).join('.')
}

/**
 * parsePEP
 * @param  {string} PEP
 * @return {array} 
 */
function parsePEP(PEP) {
    if(PEP !== PEP.toUpperCase())
        return false

    let splited = PEP.split('.')

    if(splited.length > 6 || splited.length < 4)
        return false

    for (let i = splited.length - 1; i >= 0; i--) 
        if(splited[i].length > 4 || (i !== 0 && splited[i].length < 2) || (splited.length == 6 && splited[5].length < 4)) return false

    let parsed = { letter: splited[0], spe: splited[1], empreendimento: splited[2], fase: splited[3] }

    if(splited.length > 4){
        parsed.bloco_cod = splited[4]
    }

    if(splited.length > 5){
        parsed.unidade_cod = splited[5]
    }

    return parsed
}

export { mountPEP, reMountPEP, parsePEP }