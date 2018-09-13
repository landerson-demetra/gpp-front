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
                            <p>Você tem certeza que deseja deletar o dado da unidade?</p>
                        </div>
                        <div v-else>
                            <form>
                                <div class="row" v-if="this.action == 'Edit'">
                                    <div class="form-group col-md-5">
                                        <label for="PEP">PEP</label>
                                        <input id="PEP" type="text" class="form-control" disabled="" v-model="PEP">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-4">
                                        <label for="NContribuinte">NºContribuinte</label>
                                        <input id="NContribuinte" type="text" placeholder="Número do contribuinte..." class="form-control" v-model="NContribuinte">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="NContribuinte">Usuário</label>
                                        <input id="NContribuinte" type="text" placeholder="Usuário..." class="form-control" v-model="Usuario">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="NContribuinte">Senha</label>
                                        <input id="NContribuinte" type="text" placeholder="Senha..." class="form-control" v-model="Senha">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-if="this.action !== 'Delete'">
                            <button type="button" class="btn btn-default" v-on:click="this.closeEvent" data-dismiss="modal">Fechar</button>
                            <button v-on:click="this.emitOkEvent" type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                        </div>
                        <div v-else>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Não</button>
                            <button v-if="this.action == 'Delete'" v-on:click="this.emitOkEvent" type="button" class="btn btn-danger"><i class="fas fa-trash"></i> Sim, tenho.</button>
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
    props: ['action','name','title','datas'],
    directives: {mask},
    data() {
        return  {
            // Form dado da unidade
            PEP: '',
            NContribuinte: '',
            Usuario: '',
            Senha: '',
        }
    },
    methods: {
        emitOkEvent(){
            Bus.$emit(this.name + '-onOk', (this.action !== 'Delete' ? this.getFields : true))
        },
        closeEvent(){
            if(this.action == 'New')
                this.reset()
        },
        fill(){
            this.PEP =  this.datas.PEP_Unidade
            this.NContribuinte =  this.datas.N_Contribuinte
            this.Usuario = this.datas.usuario
            this.Senha = this.datas.senha
        },
        reset(){
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