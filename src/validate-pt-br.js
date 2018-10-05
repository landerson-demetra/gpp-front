import { Validator } from 'vee-validate'

const dictionary = {
    numeric: 'DEVE SER NUMERICO'
}

Validator.localize({ name: 'pt_br', dictionary, atrributes: {} })