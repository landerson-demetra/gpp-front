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
                            <p>Você tem certeza que deseja deletar a vinculação para PEP <b>{{ this.datas.PEP_Empreendimento }}</b>?</p>
                        </div>
                        <div v-else>
                            <form v-on:submit.prevent>
                                <div class="row">
                                    <div class="form-group col-md-6" v-if="this.action == 'Edit'">
                                        <label for="PEP">PEP</label>
                                        <input v-model="PEP" disabled="" id="PEP" type="text" class="form-control">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="Individualizado">Individualizado</label>
                                        <select v-model="isEnd" class="form-control">
                                            <option value="" selected="">Selecione</option>
                                            <option value="1">Sim</option>
                                            <option value="0">Não</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-4">
                                        <label for="ADM">ADM</label>
                                        <v-select v-model="Administradora" id="ADM" placeholder="Selecione..." :options="administradoras">
                                            <span slot="no-options">Nenhuma administradora encontrada.</span>
                                        </v-select>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="Fornecedor">Fornecedor</label>
                                        <v-select v-model="Fornecedor" id="ADM" placeholder="Selecione..." :options="fornecedores">
                                            <span slot="no-options">Nenhum fornecedor encontrado.</span>
                                        </v-select>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="Prefeitura">Prefeitura</label>
                                        <v-select v-model="Prefeitura" id="ADM" placeholder="Selecione..." :options="prefeituras">
                                            <span slot="no-options">Nenhuma prefeitura encontrada.</span>
                                        </v-select>
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
            isEnd: '',
            Administradora: '',
            Fornecedor: '',
            Prefeitura: '',
            Responsavel: '',

            administradoras: [],
            fornecedores: [],
            prefeituras: [],
            responsaveis: [],
        }
    },
    methods: {
        emitOkEvent(){
            Bus.$emit('ev' + this.name, (this.action !== 'Delete' ? this.getFields : true))
        },
        closeEvent(){
            if(this.action == 'New')
                this.reset()
        },
        fill(){
            this.PEP = this.datas.PEP_Empreendimento
            this.isInd = this.datas.is_ind
            this.Administradora = ''
            this.Fornecedor = ''
            this.Prefeitura = ''
            this.Responsavel = ''
        },
        reset(){
            this.isInd = ''
            this.Administradora = ''
            this.Fornecedor = ''
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
                'adm_id': this.Administradora,
                'forn_id': this.Fornecedor,
                'pref_id': this.Prefeitura,
                'resp_id': this.Responsavel,
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
                if(v.segmentos.includes('Fornecedor'))
                    self.fornecedores.push(pushObj)
                if(v.segmentos.includes('Prefeitura'))
                    self.prefeituras.push(pushObj)
            })
        })
    }
}
</script>