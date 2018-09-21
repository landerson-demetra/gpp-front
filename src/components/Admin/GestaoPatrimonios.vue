<template>
    <div>
        <div class="row">
            <div class="content-gest mb-5 col-md-12 col-lg-12">
                <div class="card shadow border-0">
                    <div class="card-header border-0 bg-primary text-white">
                        <div class="row">
                            <h3 class="col-md-10 mt-0">Gestão de Patrimônios <span v-if="this.isFetching">[Aguarde...]</span></h3>
                            <div class="col-md-2 text-right d-none d-lg-block">
                                <button :disabled="this.pepIs !== 'unidade'" class="btn btn-primary border border-dark"><i class="fas fa-money-check-alt"></i> Resumo</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body" :class="{'is-fetching': this.isFetching}">
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
                                <div class="form-group col-md-3">
                                    <label for="Invadido">Invadido</label>
                                    <select :disabled="pepParsed.is !== 'unidade'" name="invadido" id="Invadido" class="form-control">
                                        <option value="">N/Definido</option>
                                        <option>Sim</option>
                                        <option>Não</option>
                                    </select>
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
                                <div class="form-group col-md-3">
                                    <label for="Bloco">Bloco</label>
                                    <select :disabled="bloco_blocked" v-model="bloco_selected" name="bloco" id="Bloco" class="form-control">
                                        <option value="" selected>Selecione</option> 
                                        <option v-for="bloco in blocos" :value="bloco.value">{{ bloco.text }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Unidade">Unidade</label>
                                    <select :disabled="unidade_blocked" v-model="unidade_selected" name="unidade" id="Unidade" class="form-control">
                                        <option value="">N°</option>
                                        <option v-for="unidade in unidades" :value="unidade.value">{{ unidade.text }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="Status">Status</label>
                                    <select :disabled="pepIs !== 'unidade'" name="status" id="Status" class="form-control">
                                        <option value="">N/Definido</option>
                                        <option>Estoque</option>
                                        <option>Pré-distrato</option>
                                    </select>
                                </div>
                            </div>
                        </form>

                        <h4 class="my-3 text-muted">Históricos e Status</h4>

                        <datatable :HeaderSettings="false" :Pagination="false" v-bind="$data.contratos" />

                        <h4 class="my-4 text-muted">Condomínios e IPTUs</h4>

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="condominios-tab" data-toggle="tab" href="#condominios" role="tab" aria-controls="home" aria-selected="true">Condominios [{{ this.condominios.total }}]</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="iptus-tab" data-toggle="tab" href="#iptus" role="tab" aria-controls="profile" aria-selected="false">IPTUs [{{ this.iptus.total }}]</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="agua-tab" data-toggle="tab" href="#agua" role="tab" aria-controls="profile" aria-selected="false">Água [{{ this.aguas.total }}]</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="luz-tab" data-toggle="tab" href="#luz" role="tab" aria-controls="profile" aria-selected="false">Luz [{{ this.luzes.total }}]</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="condominios" role="tabpanel" aria-labelledby="home-tab">
                                <datatable :HeaderSettings="false" :Pagination="false" v-bind="$data.condominios" />
                            </div>
                            <div class="tab-pane fade" id="iptus" role="tabpanel" aria-labelledby="iptus-tab">
                                <datatable :HeaderSettings="false" :Pagination="false" v-bind="$data.iptus" />
                            </div>
                            <div class="tab-pane fade" id="agua" role="tabpanel" aria-labelledby="agua-tab">

                            </div>
                            <div class="tab-pane fade" id="luz" role="tabpanel" aria-labelledby="luz-tab">

                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-primary text-white border-0 text-right">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-primary"><i class="fas fa-file-upload"></i> Anexar</button>
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
            <!-- <GppResumo :gest="gestExpanded"></GppResumo> -->
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

export default {
    name: 'GestaoPatrimonios',
    components: { GppResumo },
    data() {
        return {
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                suffix: ' #',
                precision: 2,
                masked: false
            },

            PEP: this.$route.params.pep || null,
            pepParsed: {},
            pepIs: null,
            gestExpanded: false,
            datas: {},

            empreendimentos: [],
            empreendimento_selected: '',

            blocos: [],
            bloco_selected: '',
            bloco_blocked: false,

            unidades: [],
            unidade_datas: [],
            unidade_selected: '',
            unidade_blocked: false,

            isFetching: undefined,

            // Resumo
            resumo: {},

            // DTables
            contratos: {
                tblClass: 'table-bordered table-responsive w-100 d-block d-md-table',
                columns: [
                    { title: 'Contrato', field: 'contrato' },
                    { title: 'Nome', field: 'nome' },
                    { title: 'CPF/CNPJ', field: 'cnpj_cpf'},
                    { title: 'V.Contrato', field: 'vlcontrato'},
                    { title: 'D.Contrato', field: 'dtcontrato'},
                    { title: 'Status', field: 'status'},
                ],
                data: [],
                total: 0,
                query: {}
            },

            condominios: {
                fixHeaderAndSetBodyMaxHeight: 300,
                tblStyle: 'table-layout: fixed',
                tblClass: 'table-bordered table-responsive d-md-table',
                columns: [
                    { title: 'Status', field: 'status' },
                    { title: 'Doc.SAP', field: 'doc_sap' },
                    { title: 'Periodo', field: 'periodo' },
                    { title: 'Vencimento', field: 'vencimento'},
                    { title: 'Valor', field: 'valor'},
                    { title: 'V.Pago', field: 'valor_pago'},
                    { title: 'Multa', field: 'multa'},
                    { title: 'Juros', field: 'juros'},
                    { title: 'Correção', field: 'correcao'},
                    { title: 'Fonte', field: 'fonte'},
                    { title: 'Total', field: 'total'},
                    { title: 'D.Pgto', field: 'data_pgto'},
                ].map(col => (col.colStyle = { width: '150px' }, col)),
                data: [],
                total: 0,
                query: {}
            },

            iptus: {
                fixHeaderAndSetBodyMaxHeight: 300,
                tblStyle: 'table-layout: fixed',
                tblClass: 'table-bordered table-responsive d-md-table',
                columns: [
                    { title: 'Periodo', field: 'periodo' },
                    { title: 'Parcela', field: 'parcela' },
                    { title: 'Vencimento', field: 'vencimento' },
                    { title: 'V.Principal', field: 'valor_principal' },
                    { title: 'Multa', field: 'multa' },
                    { title: 'Juros', field: 'juros' },
                    { title: 'C.Monetária', field: 'correcao_monetaria' },
                    { title: 'Dívida ativa', field: 'divida_ativa'},
                    { title: 'Fonte', field: 'fonte'},
                ].map(col => (col.colStyle = { width: '150px' }, col)),
                data: [],
                total: 0,
                query: {}
            },

            aguas: {
                tblClass: 'table-bordered table-responsive-sm',
                columns: [
                    { title: 'Contrato', field: 'contrato' },
                    { title: 'Nome', field: 'nome' },
                    { title: 'CPF/CNPJ', field: 'cpfcnpj'},
                    { title: 'Valor contrato', field: 'vlcontrato' },
                    { title: 'Data do contrato', field: 'drcontrato'},
                    { title: 'Status', field: 'status' },
                ],
                data: [],
                total: 0,
                query: {}
            },

            luzes: {
                tblClass: 'table-bordered table-responsive-sm',
                columns: [
                    { title: 'Contrato', field: 'contrato' },
                    { title: 'Nome', field: 'nome' },
                    { title: 'CPF/CNPJ', field: 'cpfcnpj'},
                    { title: 'Valor contrato', field: 'vlcontrato', sortable: true},
                    { title: 'Data do contrato', field: 'drcontrato'},
                    { title: 'Status', field: 'status', sortable: true},
                ],
                data: [],
                total: 0,
                query: {}
            },
        }
    },
    watch: {
        PEP: function(pep) {
            this.$initPep(pep)
            this.$router.push({ params: {pep: pep} })
        },
        empreendimento_selected: function(empreendimento){
            if(!empreendimento){
                this.bloco_blocked = true
                return
            }else{
                this.bloco_blocked = false
            }

            let datas = this.pepParsed
            datas.empreendimento = empreendimento.value

            this.PEP = reMountPEP(datas)
        },
        bloco_selected: function(bloco){
            if(!bloco){
                this.bloco_selected = ''
                this.unidade_selected = ''
            }

            // Reseta a unidade selecionada
            this.unidade_selected = ''

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

            // Reset unidade datas
            this.$resetUnidadeDatas()

            // Fetching the datas
            this.fetchDatas()
        },
        $resetUnidadeDatas(){
            this.contratos.data = []
            this.contratos.total = 0

            this.condominios.data = []
            this.condominios.total = 0

            this.unidade_datas = []
        },
        fetchDatas(){
            this.$http.post('/gestao', { PEP: this.PEP }).then((response) => {
                this.datas = response.data

               if(this.datas.length){
                    // Assinging values to the fields
                    this.assignValues()

                    // Limpando notificações antigas e exibindo as novas
                    this.$notify({ group: 'normal', clean: true })
                    this.$notify({
                        group: 'normal',
                        type: 'success',
                        text: 'Dados listados com sucesso',
                        duration: 5000
                     })
               } else {
                    this.$notify({
                        group: 'normal',
                        type: 'warn',
                        text: 'Nenhum dado encontrado para PEP <b>' + this.PEP + '</b>'
                    })
               }
            }).catch((e) =>{
                console.log('err:', e)
            })
        },
        fetchUnidadeDatas(){
            this.$http.post('/unidade-datas', { PEP: this.PEP }).then((response) => {
                this.unidade_datas = response.data

                // Assigning values to the fields
                this.assignUnidadeValues()
            })
        },
        assignValues(){
            var self = this

            // Assign empreendimentos
            this.empreendimentos = _.toArray(_.mapValues(this.datas, (o) => {
                return {
                    'label': o.empreendimento_nome,
                    'value': o.empreendimento_cod,
                    'PEP': o.PEP
                }
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

            // Caso a PEP pertencer a uma únidade,
            // Procura por contrato, condominios, iptus, aguas e luzes.
            if(this.pepIs == 'unidade')
                this.fetchUnidadeDatas()
            else
                this.$resetUnidadeDatas()

            // Resumo de patrimônios
        },
        assignUnidadeValues(){
            if(_.isEmpty(this.unidade_datas))
                return

            // - Não há contratos
            if(!this.unidade_datas.contratos.length)
                this.$notify({ group: 'normal', type: 'info', text: 'Não há contratos para PEP' })

            // - Não há condominios
            if(!this.unidade_datas.condominios.length)
                this.$notify({ group: 'normal', type: 'info', text: 'Não há condominios para PEP' })

            // - Não há IPTUS
            if(!this.unidade_datas.iptus.length)
                this.$notify({ group: 'normal', type: 'info', text: 'Não há IPTUs para PEP' })

            /* [ Contratos ] */
            var formated = []
            _.forEach(this.unidade_datas.contratos, (v) => {
                formated.push({
                    contrato: v.id,
                    nome: v.nome,
                    vlcontrato: v.valor_contrato,
                    cnpj_cpf: v.cnpj_cpf,
                    dtcontrato: v.data_contrato,
                    status: v.status_contrato,
                })
            })

            this.contratos.total = formated.length
            this.contratos.data = formated

            /* [ Condominios ] */
            formated = []
            _.forEach(this.unidade_datas.condominios, (v) => {
                formated.push({
                    status: 'R',
                    periodo: v.periodo,
                    doc_sap: v.doc_sap ? v.doc_sap : 'N/Informado',
                    vencimento: v.vencimento,
                    valor: this.$options.filters.currency(v.valor),
                    valor_pago: (v.valor_pago ? this.$options.filters.currency(v.valor_pago) : 'N/Pago'),
                    multa: v.multa + '%' ,
                    juros: v.juros + '%',
                    correcao: v.correcao + '%',
                    fonte: v.fonte,
                    total: '...',
                    data_pgto: (v.data_pagamento ? v.data_pagamento : 'N/Pago')
                })
            })

            this.condominios.total = formated.length
            this.condominios.data = formated

            /* [ Iptus ] */
            formated = []
            _.forEach(this.unidade_datas.iptus, (v) => {
                formated.push({
                    periodo: v.periodo,
                    parcela: v.parcela,
                    vencimento: v.vencimento,
                    valor_principal: this.$options.filters.currency(v.valor_principal),
                    multa: v.multa + '%',
                    juros: v.juros + '%',
                    correcao_monetaria: v.correcao_monetaria + '%',
                    divida_ativa: v.divida_ativa,
                    fonte: v.fonte,
                })
            })

            this.iptus.total = formated.length
            this.iptus.data = formated
        }
    },
    computed: { },
    mounted(){
        Bus.$on('isFetching', is => this.isFetching = is)

        if(this.PEP)
            this.$initPep(this.PEP)
    }
}
</script>

<style lang="scss">
.content-gest{
    -webkit-transition: all .3s;
    transition: all .3s;
}

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