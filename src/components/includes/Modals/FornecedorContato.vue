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
                            <p>Você tem certeza que deseja deletar esse contato do fornecedor </b>?</p>
                            <p><b>{{ this.datas.nome }}</b> - <b>{{ this.datas.departamento }}</b></p>
                        </div>
                        <div v-else>
                            <form>
                                <div class="row">
                                     <div class="form-group col-lg-6">
                                        <label for="nome">Nome</label>
                                        <input v-model="NomeC" type="text" id="nome" class="form-control" placeholder="Nome...">
                                    </div>
                                     <div class="form-group col-lg-6">
                                        <label for="email">Email</label>
                                        <input v-model="EmailC" type="text" id="email" class="form-control" placeholder="Email...">
                                    </div>
                                     <div class="form-group col-lg-4">
                                        <label for="nome">Departamento</label>
                                        <input v-model="DepartamentoC" type="text" id="departamento" class="form-control" placeholder="Departamento...">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="telefone">Telefone</label>
                                        <input v-model="TelefoneC" v-mask="['(##) ####-####', '(##) #####-####']" type="tel" class="form-control" placeholder="Telefone...">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="celular">Celular</label>
                                        <input v-model="CelularC" v-mask="['(##) ####-####', '(##) #####-####']" type="tel" id="celular" class="form-control" placeholder="Telefone...">
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
    name: 'FornecedorContato',
    props: ['action','name','title','datas'],
    directives: {mask},
    data() {
        return {
            NomeC: '',
            DepartamentoC: '',
            EmailC: '',
            TelefoneC: '',
            CelularC: '',
        }
    },
    methods: {
        closeEvent(){
            if(this.action == 'New')
                this.reset()
        },
        emitOkEvent(){
            Bus.$emit(this.name + '-onOk', (this.action !== 'Delete' ? this.getFields : true))

            this.reset()
        },
        closeEvent(){
            if(this.action == 'New')
                this.reset()
        },
        fill(){
            this.NomeC = this.datas.nome
            this.DepartamentoC = this.datas.departamento
            this.EmailC = this.datas.email
            this.TelefoneC = this.datas.telefone
            this.CelularC = this.datas.celular
        },
        reset(){
            this.NomeC = ''
            this.DepartamentoC = ''
            this.EmailC = ''
            this.TelefoneC = ''
            this.CelularC = ''
        }
    },
    watch: {
        datas(){
            if(this.action == 'Edit')
                this.fill()
        }
    },
    computed: {
        getFields(){
            return {
                'nome': this.NomeC,
                'departamento': this.DepartamentoC,
                'email': this.EmailC,
                'telefone': this.TelefoneC,
                'celular': this.CelularC
            }
        }
    }
}
</script>