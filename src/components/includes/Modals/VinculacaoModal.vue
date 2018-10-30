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
                        <div v-if="this.datas && this.action == 'Delete'">
                            <p>Você tem certeza que deseja deletar a vinculação para o projeto <b>{{ this.datas.projeto }}</b>?</p>
                        </div>
                        <div v-else>
                            <form v-on:submit="onSubmit">
                                <div class="row">
                                    <div class="form-group col-md-8" v-if="this.action == 'Edit'">
                                        <label for="PEP">Projeto</label>
                                        <input v-model="PEP" disabled="" id="PEP" type="text" class="form-control">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="Individualizado">Individualizado</label>
                                        <select v-model="isInd" class="form-control">
                                            <option value="0" selected="">Selecione</option>
                                            <option value="1">Sim</option>
                                            <option value="0">Não</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="ADM">Administradora</label>
                                        <v-select v-model="Administradora" id="ADM" placeholder="Selecione..." :options="administradoras">
                                            <span slot="no-options">Nenhuma administradora encontrada.</span>
                                        </v-select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="Fornecedor">Fornecedor SAP</label>
                                        <v-select v-model="FornecedorSap" id="ADM" placeholder="Selecione..." :options="fornecedores_sap">
                                            <span slot="no-options">Nenhum fornecedor SAP encontrado.</span>
                                        </v-select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="Fornecedor">Fornecedor Água</label>
                                        <v-select v-model="FornecedorAgua" id="ADM" placeholder="Selecione..." :options="fornecedores_agua">
                                            <span slot="no-options">Nenhum fornecedor para água encontrado.</span>
                                        </v-select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="Fornecedor">Fornecedor Luz</label>
                                        <v-select v-model="FornecedorLuz" id="ADM" placeholder="Selecione..." :options="fornecedores_luz">
                                            <span slot="no-options">Nenhum fornecedor para luz encontrado.</span>
                                        </v-select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="Prefeitura">Prefeitura</label>
                                        <v-select v-model="Prefeitura" id="ADM" placeholder="Selecione..." :options="prefeituras">
                                            <span slot="no-options">Nenhuma prefeitura encontrada.</span>
                                        </v-select>
                                    </div>
                                    <div class="form-group col-md-12">
                                        <label Responsavel="Prefeitura">Responsável</label>
                                        <input v-model="Responsavel" class="form-control" id="Responsavel" placeholder="Nome do responsável..." type="text">
                                    </div>
                                 </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-if="this.action !== 'Delete'">
                            <button type="button" class="btn btn-default" v-on:click="this.onClose" data-dismiss="modal">Fechar</button>
                            <button v-on:click="this.onSubmit" type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                        </div>
                        <div v-else>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Não</button>
                            <button v-if="this.action == 'Delete'" v-on:click="this.onSubmit" type="button" class="btn btn-danger"><i class="fas fa-trash"></i> Sim, tenho.</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../../../bus'
import { getForList } from '../../../api/fornecedor'
import {mask} from 'vue-the-mask'

export default {
    name: 'VinculacaoModal',
    props: ['action','name','title','datas'],
    directives: {mask},
    data() {
        return  {
            // Form vinculação
            PEP: '',
            isInd: 0,
            Administradora: '',
            FornecedorSap: '',
            FornecedorAgua: '',
            FornecedorLuz: '',
            Prefeitura: '',
            Responsavel: '',

            administradoras: [],
            fornecedores_sap: [],
            fornecedores_agua: [],
            fornecedores_luz: [],
            prefeituras: [],
            responsaveis: [],
        }
    },
    methods: {
        onSubmit(){
            Bus.$emit('ev' + this.name, (this.action !== 'Delete' ? this.getFields : true))
        },
        onClose(){
            if(this.action == 'New')
                this.reset()
        },
        fill(){
            if(!this.datas) return

            this.PEP = this.datas.projeto
            this.isInd = this.datas.is_ind

            if(this.datas.administradora)
                this.Administradora = {label: this.datas.administradora.nome, value: this.datas.administradora.id}

            if(this.datas.fornecedorsap)
                this.FornecedorSap = {label: this.datas.fornecedorsap.nome, value: this.datas.fornecedorsap.id}

            if(this.datas.fornecedoragua)
                this.FornecedorAgua = {label: this.datas.fornecedoragua.nome, value: this.datas.fornecedoragua.id}

            if(this.datas.fornecedorluz)
                this.FornecedorLuz = {label: this.datas.fornecedorluz.nome, value: this.datas.fornecedorluz.id}

            if(this.datas.prefeitura)
                this.Prefeitura = {label: this.datas.prefeitura.nome, value: this.datas.prefeitura.id}

            this.Responsavel = this.datas.responsavel
        },
        reset(){
            this.isInd = 0
            this.Administradora = ''
            this.FornecedorSap = ''
            this.FornecedorAgua = ''
            this.FornecedorLuz = ''
            this.Prefeitura = ''
            this.Responsavel = ''
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
                'is_ind': this.isInd,
                'adm_id': (this.Administradora ? this.Administradora.value : null),
                'forn_sap_id': (this.FornecedorSap ? this.FornecedorSap.value : null),
                'forn_agua_id': (this.FornecedorAgua ? this.FornecedorAgua.value : null),
                'forn_luz_id': (this.FornecedorLuz ? this.FornecedorLuz.value : null),
                'pref_id': (this.Prefeitura ? this.Prefeitura.value : null),
                'responsavel': this.Responsavel,
            }
        }
    },
    mounted() {
        var self = this

        getForList().then(r => {
            _.forEach(r.results, v => {
                let pushObj = { label: v.nome, value: v.id }

                if(v.segmentos.includes('Administradora'))
                    self.administradoras.push(pushObj)
                if(v.segmentos.includes('Fornecedor SAP'))
                    self.fornecedores_sap.push(pushObj)
                if(v.segmentos.includes('Fornecedor Água'))
                    self.fornecedores_agua.push(pushObj)
                if(v.segmentos.includes('Fornecedor Luz'))
                    self.fornecedores_luz.push(pushObj)
                if(v.segmentos.includes('Prefeitura'))
                    self.prefeituras.push(pushObj)
            })
        })
    }
}
</script>