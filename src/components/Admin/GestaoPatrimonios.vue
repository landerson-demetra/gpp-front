<template>
    <div>
        <div class="row">
            <div class="content-gest mb-5 col-md-12" :class="{ 'col-lg-9': !gestExpanded, 'col-lg-12': gestExpanded }">
                <div class="card shadow border-0">
                    <div class="card-header border-0 bg-white">
                        <div class="row">
                            <h3 class="col-md-10 mt-0">Gestão de Patrimônios <span v-if="this.isFetching">[ Aguarde... ]</span></h3>
                            <div class="col-md-2 text-right d-none d-lg-block">
                                <button class="btn-primary" v-on:click="gestExpanded = !gestExpanded"><i class="fas" :class="{ 'fa-forward': !gestExpanded, 'fa-backward': gestExpanded }"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <form action="#noaction">
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="PEP">PEP</label>
                                    <input v-model="PEP" id="PEP" type="text" class="form-control" :class="{'is-invalid': pepIs == false}" placeholder="R.XXXX.99.99.99.9999">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="Contribuinte">Contribuinte</label>
                                    <input id="Contribuinte" type="text" class="form-control" placeholder="NºContribuinte" disabled>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Vendido">Vendido</label>
                                    <input id="Vendido" type="text" class="form-control" placeholder="Não" disabled>
                                </div>
                                <!-- <div class="form-group col-md-2">
                                    <label class="invisible">Ação</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#exampleModal">ADM</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="invisible">Ação</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-primary" type="button">Jurídico</button>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                            <div class="row">
                               <div class="form-group col-md-4">
                                    <label for="Empreendimento">Empreendimento</label>
                                    <v-select name="Empreendimento" placeholder="Empreendimento" v-model="empreendimento_selected" :options="empreendimentos">
                                        <span slot="no-options">Nenhum empreendimento encontrado.</span>
                                    </v-select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Bloco">Bloco</label>
                                    <select :disabled="bloco_blocked" v-model="bloco_selected" name="bloco" id="Bloco" class="form-control">
                                        <option value="">Selecione</option> 
                                        <option v-for="bloco in blocos" :value="bloco.value">{{ bloco.text }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Unidade">Unidade</label>
                                    <select :disabled="unidade_blocked" v-model="unidade_selected" name="unidade" id="Unidade" class="form-control">
                                        <option value="">Selecione</option>
                                        <option v-for="unidade in unidades" :value="unidade.value">{{ unidade.text }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Invadido">Invadido</label>
                                    <select :disabled="pepParsed.is !== 'unidade'" name="invadido" id="Invadido" class="form-control">
                                        <option>Sim</option>
                                        <option>Não</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Status">Status</label>
                                    <select :disabled="pepParsed.is !== 'unidade'" name="status" id="Status" class="form-control">
                                        <option>Estoque</option>
                                        <option>Pré-distrato</option>
                                    </select>
                                </div>
                            </div>
                        </form>

                        <h4 class="pb-3 text-muted border-bottom">Históricos e status</h4>

                        

                        <h4 class="mt-4 pb-3 text-muted">Condominios e IPTUs</h4>

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Condominios [?]</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="iptus-tab" data-toggle="tab" href="#iptus" role="tab" aria-controls="profile" aria-selected="false">IPTUs [?]</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="agua-tab" data-toggle="tab" href="#agua" role="tab" aria-controls="profile" aria-selected="false">Água [?]</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="luz-tab" data-toggle="tab" href="#luz" role="tab" aria-controls="profile" aria-selected="false">Luz [?]</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                            <div class="tab-pane fade" id="agua" role="tabpanel" aria-labelledby="agua-tab">...</div>
                            <div class="tab-pane fade" id="luz" role="tabpanel" aria-labelledby="luz-tab">...</div>
                        </div>
                    </div>
                    <div class="card-footer bg-primary text-white border-0 text-right">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-primary"><i class="fas fa-print"></i> Imprimir</button>
                            <div class="dropup">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><i class="fas fa-file-export"></i> Exportar</button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#"><i class="fas fa-file-pdf"></i> PDF</a>
                                    <a class="dropdown-item" href="#"><i class="fas fa-file-excel"></i> CSV</a>
                                    <a class="dropdown-item" href="#"><i class="fas fa-file-excel"></i> XLSX</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Resumo de patrimônios -->
            <GppResumo :gest="gestExpanded"></GppResumo>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Administração</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ul>
                            <li>...</li>
                            <li>...</li>
                            <li>...</li>
                            <li>...</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../../bus'
import { mapState } from 'vuex'
import { parsePEP, reMountPEP } from '../../modules/pep'
import GppResumo from '../includes/GppResumo'

/* [ PARCELAS AGUA LUZ ] */

export default {
    name: 'GestaoPatrimonios',
    components: { GppResumo },
    data() {
        return {
            PEP: this.$route.params.pep || '',
            pepParsed: {},
            pepIs: '',
            gestExpanded: false,
            datas: {},

            empreendimentos: [],
            empreendimento_selected: '',

            blocos: [],
            bloco_selected: '',
            bloco_blocked: false,

            unidades: [],
            unidade_selected: '',
            unidade_blocked: false,

            isFetching: undefined,

            // DTables
            
        }
    },
    watch: {
        PEP: function(pep) {
            this.$initPep(pep)
        },
        empreendimento_selected: function(empreendimento){
            this.bloco_blocked = !empreendimento

            let datas = this.pepParsed
            datas.empreendimento = empreendimento.value

            this.PEP = reMountPEP(datas)
        },
        bloco_selected: function(bloco){
            if(!bloco){
                this.bloco_selected = ''
                this.unidade_selected = ''
            }

            let datas = this.pepParsed
            datas.bloco_cod = bloco

            this.PEP = reMountPEP(datas)
        },
        unidade_selected: function(unidade){
            let datas = this.pepParsed
            datas.unidade_cod = unidade

            this.PEP = reMountPEP(datas)
        }
    },
    methods: {
        $initPep(pep){
            let parsed = parsePEP(pep)

            if(!parsed) {
                this.pepIs = false
                return false
            }

            this.pepParsed = parsed
            this.pepIs = (Object.keys(parsed).length <= 4 ? 'empreendimento' : 'unidade')

            if(this.pepIs == 'empreendimento') {
                // [ ? ]
            }

            // Fetching the datas
            this.fetchDatas()
        },
        fetchDatas(){
            this.$http.post('/gestao', { PEP: this.PEP }).then((response) => {
                this.datas = response.data

                // Assinging values to the fields
                this.assignValues()
            }).catch((e) =>{
                console.log('err:', e)
            })
        },
        assignValues(){
            var self = this

            // Assign empreendimentos
            this.empreendimentos = _.toArray(_.mapValues(this.datas, (o) => {
                return {'label': o.empreendimento_nome, 'value': o.empreendimento_cod, 'PEP': o.PEP}
            }))
            this.empreendimento_selected = _.find(this.empreendimentos, (f) => {
                return f.value == self.pepParsed.empreendimento
            })

            // Assigining blocos
            var blocosArr = []

            _.mapValues(this.datas, (o) => {
                let unidades = _.filter(o.unidades, (v) => {
                    return v.PEP_Empreendimento == this.empreendimento_selected.PEP
                })
                _.mapValues(unidades, (a) => blocosArr.push({ 'text' : a.bloco_nome, 'value' : a.bloco_cod}))
            })

            this.blocos = _.uniqBy(blocosArr, 'value')

            if(self.pepParsed.bloco_cod){
                let find = _.find(this.blocos, (f) => {
                    return f.value == self.pepParsed.bloco_cod
                })

                this.bloco_selected = (find ?  find.value : this.blocos[0].value)
            }

            // Assigning unidades
            var unidadesArr = []

            _.mapValues(this.datas, (o) => {
                let unidades = _.filter(o.unidades, (v) => {
                    return v.bloco_cod == this.bloco_selected
                })
                _.mapValues(unidades, (a) => unidadesArr.push({ 'text' : a.unidade_nome, 'value' : a.unidade_cod}))
            })

            this.unidades = _.uniqBy(unidadesArr, 'value')

            if(this.pepParsed.unidade_cod)
                this.unidade_selected = parseInt(this.pepParsed.unidade_cod)
        }
    },
    computed: {
        
    },
    mounted(){
        Bus.$on('isFetching', is => this.isFetching = is)

        if(this.PEP !== '')
            this.$initPep(this.PEP)
    }
}
</script>

<style lang="scss">
.v-select {
    span.selected-tag {
        pointer-events: none;
    }

    span.selected-tag + input[type=search] {
        width: 0 !important;
    }

    &.open input[type=search] {
        width: auto !important;
    }
}
</style>