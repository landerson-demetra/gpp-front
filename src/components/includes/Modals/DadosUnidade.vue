<template>
    <div>
        <div class="modal fade" :id="'modal' + this.name" tabindex="-1" role="dialog">
            <div class="modal-dialog shadow" :class="{'modal-lg': this.action !== 'Delete'}" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" :id="'modal' + this.name + 'Label'">{{ this.title }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="this.action == 'Delete'">
                            <p>Você tem certeza que deseja deletar o dado da unidade referente a PEP <b>{{ this.datas.PEP }}</b>?</p>
                        </div>
                        <div v-else>
                            <form>
                                <div class="row" v-if="this.action == 'Edit'">
                                    <div class="form-group col-md-5">
                                        <label for="PEP_Unidade">PEP</label>
                                        <input v-model="PEP" id="PEP_Unidade" type="text" class="form-control" disabled="">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-4">
                                        <label>NºContribuinte</label>
                                        <input v-model="NContribuinte"
                                               v-validate="'required|numeric'"
                                               data-vv-as="Número do contribuinte"
                                               name="n_contribuinte"
                                               :class="{'is-invalid': errors.has('n_contribuinte')}"
                                               :disabled="contribuinte_blocked"
                                        type="text" placeholder="Número do contribuinte..." class="form-control">
                                        <div class="invalid-feedback">{{ errors.first('n_contribuinte') }}</div>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>Usuário</label>
                                        <input v-model="Usuario"
                                               v-validate="'required'"
                                               data-vv-as="Usuário"
                                               :class="{'is-invalid': errors.has('usuario')}"
                                               name="usuario"
                                        type="text" placeholder="Usuário..." class="form-control">
                                        <div class="invalid-feedback">{{ errors.first('usuario') }}</div>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>Senha</label>
                                        <input v-model="Senha"
                                               v-validate="'required'"
                                               data-vv-as="Senha"
                                               :class="{'is-invalid': errors.has('senha')}"
                                               name="senha"
                                               type="text" placeholder="Senha..." class="form-control">
                                        <div class="invalid-feedback">{{ errors.first('senha') }}</div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div v-if="this.action == 'New'">
                            <p class="text-muted"><i class="fa fa-info-circle text-warning"></i> Os campos acima referem-se aos dados para acessar o sistema do condomínio.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-if="this.action !== 'Delete'">
                            <button type="button" class="btn btn-default" v-on:click="onClose" data-dismiss="modal">Fechar</button>
                            <button v-on:click="onSubmit" type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                        </div>
                        <div v-else>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Não</button>
                            <button v-if="this.action == 'Delete'" v-on:click="onSubmit" type="button" class="btn btn-danger"><i class="fas fa-trash"></i> Sim, tenho.</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../../../bus'
import {mask} from 'vue-the-mask'

export default {
    name: 'DadosUnidadeModal',
    props: ['action','name','title','datas','dadosunidade'],
    directives: {mask},
    data() {
        return  {
            contribuinte_blocked: false,

            // Form dado da unidade
            PEP: '',
            NContribuinte: '',
            Usuario: '',
            Senha: '',
        }
    },
    methods: {
        onSubmit(){
            // Não teremos validação na action 'Delete'.
            if(this.action == 'Delete')
                return Bus.$emit('ev' + this.name, true)

            // Verifica por erros de validação.
            this.$validator.validate().then(result => {
                if(result)
                    Bus.$emit('ev' + this.name, this.getFields)
                else
                    this.$notify({ group: 'normal', type: 'warn', text: 'Corrija os campos informados.' })
            })
        },
        onClose(){
            if(this.action == 'New')
                this.reset()
        },
        fill(){
            if(this.dadosunidade.length > 1) {
                this.contribuinte_blocked  = true
            } else {
                this.contribuinte_blocked = false
            }
            this.PEP =  this.datas.PEP
            this.NContribuinte =  this.datas.N_Contribuinte
            this.Usuario = this.datas.usuario
            this.Senha = this.datas.senha
        },
        reset(){
            this.contribuinte_blocked  = false
            this.PEP  = ''
            this.NContribuinte  = ''
            this.Usuario  = ''
            this.Senha  = ''
        }
    },
    watch: {
        CEP(cep){
            if(cep && cep.length < 9) return

            this.$http.get(_.replace(this.$config.cep_url, '{cep}', cep))
                .then(r => this.assignCepValues(r.data))
        },
        datas(){
            if(this.action == 'Edit')
                this.fill()
        },
        dadosunidade(dados) {
            if(this.action !== 'New' || !this.dadosunidade.length) return

            this.contribuinte_blocked = true
            this.NContribuinte = this.dadosunidade[0].N_Contribuinte
        }
    },
    computed: {
        getFields() {
            return {
                'N_Contribuinte': this.NContribuinte,
                'usuario': this.Usuario,
                'senha': this.Senha
            }
        }
    }
}
</script>