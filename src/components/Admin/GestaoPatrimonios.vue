<template>
    <div>
        <div class="row">
            <div class="content-gest mb-5 col-md-12 col-lg-12">
                <div class="card shadow border-0">
                    <div class="card-header border-0 bg-primary text-white">
                        <div class="row">
                            <h3 class="col-md-7 mt-0">Gestão de Patrimônios <span v-if="this.isFetching">[Aguarde...]</span></h3>
                            <div class="col-md-5 text-right d-none d-lg-block bg-black">
                                <button :disabled="!pepIs" class="btn btn-primary border-0 border-dark" data-toggle="modal" data-target="#modalResponsaveis"><i class="fas fa-users"></i> Responsáveis</button>
                                <button :disabled="!pepIs" class="btn btn-primary border-0 border-dark">Ações Jurídicas</button>
                                <button :disabled="this.pepIs !== 'unidade'" data-toggle="modal" data-target="#modalResumo" class="btn btn-primary border-0 border-dark"><i class="fas fa-money-check-alt"></i> Resumo</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body" :class="{'is-fetching': this.isFetching}">
                        <form action="#noaction">
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="PEP">PEP</label>
                                    <input v-on:input="PEP = $event.target.value.toUpperCase()" v-model="PEP" id="PEP" type="text" class="form-control" :class="{'is-invalid': pepIs == false}" placeholder="R.XXXX.99.99.99.9999">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="Contribuinte">Nº Contribuinte</label>
                                    <input v-model="Contribuinte" id="Contribuinte" type="text" class="form-control" placeholder="NºContribuinte" readonly>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="Vendido">Vendido</label>
                                    <input v-model="vendido" id="Vendido" type="text" class="form-control" placeholder="N/Definido" disabled>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="Invadido">Invadido</label>
                                    <select v-model="invadido" v-on:change="changeStatus" :disabled="pepIs !== 'unidade'" id="Invadido" class="form-control">
                                        <option :value="null">N/Definido</option>
                                        <option value="S">Sim</option>
                                        <option value="N">Não</option>
                                    </select>
                                </div>
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
                                    <select v-model="status" v-on:change="changeStatus" :disabled="!unidade_selected" name="status" id="Status" class="form-control">
                                        <option :value="null">N/Definido</option>
                                        <option value="E">Estoque</option>
                                        <option value="P">Pré-distrato</option>
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
                                <div v-if="this.pepIs == 'unidade'" class="row">
                                    <div class="col mt-4 no-gutters text-right">
                                        <button class="btn btn-success" data-toggle="modal" data-target="#modalNovoCondominio"><i class="fas fa-plus"></i> Adicionar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="iptus" role="tabpanel" aria-labelledby="iptus-tab">
                                <datatable :HeaderSettings="false" :Pagination="false" v-bind="$data.iptus" />
                                <div v-if="this.pepIs == 'unidade'" class="row">
                                    <div class="col mt-4 no-gutters text-right">
                                        <button class="btn btn-success" data-toggle="modal" data-target="#modalNovoIptu"><i class="fas fa-plus"></i> Adicionar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="agua" role="tabpanel" aria-labelledby="agua-tab">
                                <datatable :HeaderSettings="false" :Pagination="false" v-bind="$data.aguas" />
                                <div v-if="this.pepIs == 'unidade'" class="row">
                                    <div class="col mt-4 no-gutters text-right">
                                        <button class="btn btn-success" data-toggle="modal" data-target="#modalNovaAgua"><i class="fas fa-plus"></i> Adicionar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="luz" role="tabpanel" aria-labelledby="luz-tab">
                                <datatable :HeaderSettings="false" :Pagination="false" v-bind="$data.luzes" />
                                <div v-if="this.pepIs == 'unidade'" class="row">
                                    <div class="col mt-4 no-gutters text-right">
                                        <button class="btn btn-success" data-toggle="modal" data-target="#modalNovaLuz"><i class="fas fa-plus"></i> Adicionar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-primary text-white border-0 text-right">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-primary"><i class="fas fa-file-upload"></i> Anexar</button>
                            <button type="button" class="btn btn-primary"><i class="fas fa-print"></i> Imprimir</button>
                            <a href="#relatorio" class="btn btn-primary"><i class="fas fa-file-export"></i> Relatório</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- [ Responsaveis modal ] -->
                <Responsaveis :PEP="PEP" :Projeto="empreendimento_selected"></Responsaveis>
            <!-- [ /Responsaveis modal ] -->

            <!-- [ Resumo ] -->
                <GestaoResumo :datas="unidade_datas" :PEP="PEP"></GestaoResumo>
            <!-- [ /Resumo ] -->

            <!-- [ Condomínios modals ] -->
                <!-- Novo -->
                <CUDCondominios action="New" name="NovoCondominio" title="Cadastrar Condomínio"></CUDCondominios>
                <!-- Editar -->
                <CUDCondominios action="Edit" name="EditarCondominio" title="Editar Condomínio" :datas="dadoActive"></CUDCondominios>
                <!-- Deletar -->
                <CUDCondominios action="Delete" name="DeletarCondominio" title="Deletar Condomínio" :datas="dadoActive"></CUDCondominios>
            <!-- [ /Condominios modals ] -->

            <!-- [ IPTUs modals ] -->
                <!-- Novo -->
                <CUDIptus action="New" name="NovoIptu" title="Cadastrar IPTU"></CUDIptus>
                <!-- Editar -->
                <CUDIptus action="Edit" name="EditarIptu" title="Editar IPTU" :datas="dadoActive"></CUDIptus>
                <!-- Deletar -->
                <CUDCondominios action="Delete" name="DeletarIptu" title="Deletar IPTU" :datas="dadoActive"></CUDCondominios>
            </div>
            <!-- [ /IPTUs modals ] -->

            <!-- [ Aguas modals ] -->
                <!-- Novo -->
                <CUDAguas action="New" name="NovaAgua" title="Cadastrar Água"></CUDAguas>
                <!-- Editar -->
                <CUDAguas action="Edit" name="EditarAgua" title="Editar Água" :datas="dadoActive"></CUDAguas>
                <!-- Deletar -->
                <CUDAguas action="Delete" name="DeletarAgua" title="Deletar Água" :datas="dadoActive"></CUDAguas>
            <!-- [ /Aguas modals ] -->

            <!-- [ Luzes modals ] -->
                <!-- Novo -->
                <CUDLuzes action="New" name="NovaLuz" title="Cadastrar Luz"></CUDLuzes>
                <!-- Editar -->
                <CUDLuzes action="Edit" name="EditarLuz" title="Editar Luz" :datas="dadoActive"></CUDLuzes>
                <!-- Deletar -->
                <CUDLuzes action="Delete" name="DeletarLuz" title="Deletar Luz" :datas="dadoActive"></CUDLuzes>
            <!-- [ /Luzes modals ] -->
        </div>
    </div>
</template>

<script>
import Bus from '../../bus'
import { mapState } from 'vuex'
import { parsePEP, reMountPEP } from '../../modules/pep'

// Api calls
import { fetchUnidades, fetchGestao } from '../../api/gestao'
import { store as storeStatus, update as updateStatus } from '../../api/status'
import { store as storeCond, update as editCond, deletedata as delCond } from '../../api/condominios'
import { store as storeIptu, update as editIptu, deletedata as delIptu } from '../../api/iptus'
import { store as storeAgua, update as editAgua, deletedata as delAgua } from '../../api/agua'
import { store as storeLuz, update as editLuz, deletedata as delLuz } from '../../api/luz'

// Components
import GestaoResumo from '../includes/Modals/Gestao/Resumo'
import Responsaveis from '../includes/Modals/Gestao/Responsaveis'
import ActionButtons from '../includes/Buttons/ActionButtons'
import CUDCondominios from '../includes/Modals/Gestao/CUD_Condominios'
import CUDIptus from '../includes/Modals/Gestao/CUD_Iptus'
import CUDAguas from '../includes/Modals/Gestao/CUD_Aguas'
import CUDLuzes from '../includes/Modals/Gestao/CUD_Luzes'

export default {
    name: 'GestaoPatrimonios',
    components: {
        GestaoResumo,
        Responsaveis,
        CUDCondominios,
        CUDIptus,
        CUDAguas,
        CUDLuzes
    },
    data() {
        return {
            PEP: this.$route.params.pep || null,
            pepParsed: {},
            pepIs: null,
            gestExpanded: false,
            datas: {},

            Contribuinte: null,

            vendido: null,
            invadido: null,
            status: null,

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

            // Events helpers
            dadoActive: [],

            // Resumo
            resumo: {},

            // DTables
            contratos: {
                tblClass: 'table-bordered table-responsive w-100 d-block d-md-table',
                columns: [
                    { title: 'Contrato', field: 'contrato' },
                    { title: 'Nome', field: 'nome' },
                    { title: 'CPF/CNPJ', field: 'cnpj_cpf'},
                    { title: 'Valor Contrato', field: 'vlr_contrato'},
                    { title: 'Data Contrato', field: 'dt_contrato'},
                    { title: 'Status', field: 'status_contrato'},
                    { title: 'Modelo', field: 'modelo_contrato'}
                ],
                data: [],
                total: 0,
                query: {}
            },

            condominios: {
                fixHeaderAndSetBodyMaxHeight: 300,
                tblStyle: 'table-layout: fixed',
                tblClass: 'border table-responsive d-md-table',
                columns: [
                    { title: 'Status', field: 'status' },
                    { title: 'Documento SAP', field: 'doc_sap' },
                    { title: 'Periodo', field: 'periodo' },
                    { title: 'Vencimento', field: 'vencimento'},
                    { title: 'Valor', field: 'valor'},
                    { title: 'Valor Pago', field: 'valor_pago'},
                    { title: 'Data Pgto', field: 'data_pgto'},
                    { title: 'Multa', field: 'multa'},
                    { title: 'Juros', field: 'juros'},
                    { title: 'Correção', field: 'correcao'},
                    { title: 'Fonte', field: 'fonte'},
                    { title: 'Total', field: 'total'},
                    { title: 'Ação', fixed: 'right', tdComp: ActionButtons }
                ].map(col => (col.colStyle = { width: '150px' }, col)),
                data: [],
                total: 0,
                query: {},
                xprops: { evName: 'Condominio' }
            },

            iptus: {
                fixHeaderAndSetBodyMaxHeight: 300,
                tblStyle: 'table-layout: fixed',
                tblClass: 'border table-responsive d-md-table',
                columns: [
                    { title: 'Status', field: 'status' },
                    { title: 'Periodo', field: 'periodo' },
                    { title: 'Parcela', field: 'parcela' },
                    { title: 'Vencimento', field: 'vencimento' },
                    { title: 'Valor Principal', field: 'valor_principal' },
                    { title: 'Multa', field: 'multa' },
                    { title: 'Juros', field: 'juros' },
                    { title: 'Correção', field: 'correcao_monetaria' },
                    { title: 'Total', field: 'total' },
                    { title: 'Dívida ativa', field: 'divida_ativa'},
                    { title: 'Fonte', field: 'fonte'},
                    { title: 'Ação', fixed: 'right', tdComp: ActionButtons }
                ].map(col => (col.colStyle = { width: '150px' }, col)),
                data: [],
                total: 0,
                query: {},
                xprops: { evName: 'Iptu' }
            },

            aguas: {
                fixHeaderAndSetBodyMaxHeight: 300,
                tblStyle: 'table-layout: fixed',
                tblClass: 'border table-responsive d-md-table',
                columns: [
                    { title: 'Status', field: 'status' },
                    { title: 'Documento SAP', field: 'doc_sap' },
                    { title: 'Periodo', field: 'periodo' },
                    { title: 'Vencimento', field: 'vencimento'},
                    { title: 'Valor', field: 'valor'},
                    { title: 'Valor Pago', field: 'valor_pago'},
                    { title: 'Data Pgto', field: 'data_pagamento'},
                    { title: 'Fonte', field: 'fonte'},
                    { title: 'Ação', fixed: 'right', tdComp: ActionButtons }
                ].map(col => (col.colStyle = { width: '150px' }, col)),
                data: [],
                total: 0,
                query: {},
                xprops: { evName: 'Agua' }
            },

            luzes: {
                fixHeaderAndSetBodyMaxHeight: 300,
                tblStyle: 'table-layout: fixed',
                tblClass: 'border table-responsive d-md-table',
                columns: [
                    { title: 'Status', field: 'status' },
                    { title: 'Documento SAP', field: 'doc_sap' },
                    { title: 'Periodo', field: 'periodo' },
                    { title: 'Vencimento', field: 'vencimento'},
                    { title: 'Valor', field: 'valor'},
                    { title: 'Valor Pago', field: 'valor_pago'},
                    { title: 'Data Pgto', field: 'data_pagamento'},
                    { title: 'Fonte', field: 'fonte'},
                    { title: 'Ação', fixed: 'right', tdComp: ActionButtons }
                ].map(col => (col.colStyle = { width: '150px' }, col)),
                data: [],
                total: 0,
                query: {},
                xprops: { evName: 'Luz' }
            },
        }
    },
    watch: {
        PEP(pep) {
            this.$initPep(pep)
            this.$router.push({ params: {pep: pep} })
        },
        empreendimento_selected(empreendimento) {
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
        bloco_selected(bloco, old) {
            if(!bloco){
                this.bloco_selected = ''
                this.unidade_selected = ''
                this.unidade_blocked = true
            }else{
                this.unidade_blocked = false
            }

            if(old)
                this.unidade_selected = ''

            let datas = this.pepParsed
            datas.bloco_cod = bloco

            this.PEP = reMountPEP(datas)
        },
        unidade_selected(unidade) {
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
        changeStatus() {
            if(this.unidade_datas.status) {
                updateStatus({ invadido: this.invadido, status: this.status }, this.unidade_datas.status.id)
            } else {
                storeStatus({
                    PEP: this.PEP,
                    invadido: this.invadido,
                    status: this.status
                }).then(r => {
                    this.unidade_datas.status = r.results
                })
            }
            //
            this.$notify({ group: 'normal', clean: true })
            this.$notify({ group: 'normal', type: 'success', text: 'Status atualizado com sucesso' })
        },
        $resetUnidadeDatas() {
            this.invadido = null
            this.vendido = null
            this.status = null

            this.contratos.data = []
            this.contratos.total = 0

            this.condominios.data = []
            this.condominios.total = 0

            this.unidade_datas = []
        },
        fetchDatas() {
            fetchGestao({ PEP: this.PEP }).then((data) => {
                this.datas = data.results

                if(this.datas.length){
                    // Limpando notificações antigas e exibindo as novas
                    this.$notify({ group: 'normal', clean: true })

                    // Assinging values to the fields
                    this.assignValues()
                } else {
                    this.$notify({ group: 'normal', type: 'warn', text: 'Nenhum dado encontrado para PEP <b>' + this.PEP + '</b>' })
                }
            }).catch((e) => {
                console.log('err:', e)
            })
        },
        fetchUnidadeDatas() {
            this.isFetching = false
            fetchUnidades({ PEP: this.PEP }).then((data) => {
                this.unidade_datas = data.results

                // Assigning values to the fields
                this.assignUnidadeValues()

                // Notificando o usuário
                this.$notify({ group: 'normal', clean: true })
                this.$notify({ group: 'normal', type: 'success', text: 'Dados listados com sucesso', duration: 3000 })
            })
        },
        assignValues() {
            var self = this

            // Assign empreendimentos
            this.empreendimentos = _.toArray(_.mapValues(this.datas, (o) => {
                return {
                    label: o.empreendimento_nome,
                    value: o.empreendimento_cod,
                    id: o.id
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
                _.mapValues(unidades, (a) => blocosArr.push({ text : a.bloco_nome, value : a.bloco_cod}))
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
                _.mapValues(_.orderBy(unidades, ['unidade_cod','asc']), (a) => unidadesArr.push({
                    text: a.unidade_cod,
                    value : a.unidade_cod
                }))
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
        },
        assignUnidadeValues(){
            if(_.isEmpty(this.unidade_datas))
                return

            // - Não há contratos
            // if(!this.unidade_datas.contratos.length)
            //     this.$notify({ group: 'normal', type: 'info', text: 'Não há contratos para PEP' })

            // - Não há condominios
            if(!this.unidade_datas.condominios.length)
                this.$notify({ group: 'normal', type: 'info', text: 'Não há condominios para PEP' })

            // - Não há IPTUS
            if(!this.unidade_datas.iptus.length)
                this.$notify({ group: 'normal', type: 'info', text: 'Não há IPTUs para PEP' })

            /* [ Dados da unidade ] */
            this.Contribuinte = this.unidade_datas.dadosunidade.length ? this.unidade_datas.dadosunidade[0].N_Contribuinte : 'N/Definido'

            /* [ Status ] */
            if(this.unidade_datas.status) {
                this.invadido = this.unidade_datas.status.invadido
                this.vendido = this.unidade_datas.status.vendido
                this.status = this.unidade_datas.status.status
            } else {
                this.invadido = null
                this.status = null
            }

            /* [ Contratos ] */
            var formated = []
            _.forEach(this.unidade_datas.contratos, (v) => {
                formated.push({
                    contrato: v.id_contrato,
                    nome: v.nome,
                    vlr_contrato: this.$options.filters.currency(v.vlr_contrato),
                    cnpj_cpf: this.$options.filters.cpfcnpj(v.cnpj_cpf),
                    dt_contrato: v.dt_contrato,
                    status_contrato: v.status_contrato,
                    modelo_contrato: v.modelo_contrato
                })
            })

            this.contratos.total = formated.length
            this.contratos.data = formated

            /* [ Condominios ] */
            formated = []
            _.forEach(this.unidade_datas.condominios, (v) => {
                formated.push({
                    id: v.id,
                    status: (v.status ? v.status : 'N/Informado'),
                    periodo: v.periodo,
                    doc_sap: v.doc_sap ? v.doc_sap : 'N/Informado',
                    vencimento: v.vencimento,
                    valor: this.$options.filters.currency(v.valor),
                    valor_pago: this.$options.filters.currency(v.valor_pago),
                    multa: v.multa + '%' ,
                    juros: v.juros + '%',
                    correcao: v.correcao + '%',
                    fonte: (v.fonte == 'R' ? 'Relatório' : 'Projeção'),
                    total: '...',
                    data_pgto: (v.data_pagamento ? v.data_pagamento : 'N/Pago'),
                    raw: v
                })
            })

            this.condominios.total = formated.length
            this.condominios.data = formated

            /* [ Iptus ] */
            formated = []
            _.forEach(this.unidade_datas.iptus, (v) => {
                formated.push({
                    id: v.id,
                    status: (v.status ? v.status : 'N/Informado'),
                    periodo: v.periodo,
                    parcela: v.parcela,
                    vencimento: v.vencimento,
                    valor_principal: this.$options.filters.currency(v.valor_principal),
                    multa: v.multa + '%',
                    juros: v.juros + '%',
                    correcao_monetaria: v.correcao_monetaria + '%',
                    total: '...',
                    divida_ativa: v.divida_ativa,
                    fonte: (v.fonte == 'R' ? 'Relatório' : 'Projeção'),
                    raw: v
                })
            })

            this.iptus.total = formated.length
            this.iptus.data = formated

            /* [ Aguas ] */
            formated = []
            _.forEach(this.unidade_datas.aguas, (v) => {
                formated.push({
                    id: v.id,
                    status: (v.status ? v.status : 'N/Informado'),
                    doc_sap: v.doc_sap ? v.doc_sap : 'N/Informado',
                    periodo: v.periodo,
                    vencimento: v.vencimento,
                    valor: this.$options.filters.currency(v.valor),
                    valor_pago: this.$options.filters.currency(v.valor_pago),
                    fonte: (v.fonte == 'R' ? 'Relatório' : 'Projeção'),
                    total: '...',
                    data_pagamento: (v.data_pagamento ? v.data_pagamento : 'N/Pago'),
                    raw: v
                })
            })

            this.aguas.total = formated.length
            this.aguas.data = formated

            /* [ Aguas ] */
            formated = []
            _.forEach(this.unidade_datas.luzes, (v) => {
                formated.push({
                    id: v.id,
                    status: (v.status ? v.status : 'N/Informado'),
                    periodo: v.periodo,
                    doc_sap: v.doc_sap ? v.doc_sap : 'N/Informado',
                    vencimento: v.vencimento,
                    valor: this.$options.filters.currency(v.valor),
                    valor_pago: this.$options.filters.currency(v.valor_pago),
                    fonte: (v.fonte == 'R' ? 'Relatório' : 'Projeção'),
                    total: '...',
                    data_pagamento: (v.data_pagamento ? v.data_pagamento : 'N/Pago'),
                    raw: v
                })
            })

            this.luzes.total = formated.length
            this.luzes.data = formated
        },

        /*============================================
        =            Condominios - Events            =
        ============================================*/
        saveCond(datas){
            datas.PEP = this.PEP

            storeCond(datas).then(r => {
                let v = r.results
                this.condominios.total++
                this.condominios.data.push({
                    status: '',
                    periodo: v.periodo,
                    doc_sap: v.doc_sap ? v.doc_sap : 'N/Informado',
                    vencimento: v.vencimento,
                    valor: this.$options.filters.currency(v.valor),
                    valor_pago: this.$options.filters.currency(v.valor_pago),
                    data_pgto: (v.data_pagamento ? v.data_pagamento : 'N/Pago'),
                    multa: v.multa + '%' ,
                    juros: v.juros + '%',
                    correcao: v.correcao + '%',
                    fonte: v.fonte,
                    total: '...',
                    raw: v
                })

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Condomínio criado com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                if(e.response.status < 423) return
                this.$notify({group:'normal', type:'error', title:'Ops :/', text:'Ocorreu um erro inesperado'})
            })
        },
        updateCond(datas){
            editCond(datas, this.dadoActive.id).then(r => {
                let v = r.results,
                    index = this.condominios.data.map(e => e.id).indexOf(this.dadoActive.id)

                // Atualizando o condomínio na lista
                this.condominios.data[index].status = (v.status ? v.status : 'N/Informado')
                this.condominios.data[index].periodo = v.periodo
                this.condominios.data[index].doc_sap = v.doc_sap ? v.doc_sap : 'N/Informado'
                this.condominios.data[index].vencimento = v.vencimento
                this.condominios.data[index].valor = this.$options.filters.currency(v.valor)
                this.condominios.data[index].valor_pago = this.$options.filters.currency(v.valor_pago)
                this.condominios.data[index].multa = v.multa + '%' 
                this.condominios.data[index].juros = v.juros + '%'
                this.condominios.data[index].correcao = v.correcao + '%'
                this.condominios.data[index].fonte = v.fonte
                this.condominios.data[index].total = '...'
                this.condominios.data[index].data_pgto = (v.data_pagamento ? v.data_pagamento : 'N/Pago')
                this.condominios.data[index].raw = v

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Condomínio atualizado com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                console.log(e)
            })
        },
        deleteCond(){
            delCond(this.dadoActive.id).then(r => {
                // Removendo o condomínio da lista
                let index = this.condominios.data.map(e => e.id).indexOf(this.dadoActive.id)
                this.condominios.data.splice(index, 1)

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Condomínio deletado com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                console.log(e)
            })
        },
        /*=====  End of Condominios - Events  ======*/

        /*======================================
        =            IPTUS - Events            =
        ======================================*/
        saveIptu(datas) {
            datas.PEP = this.PEP

            storeIptu(datas).then(r => {
                let v = r.results
                v.raw = v
                this.iptus.data.push(r.results)

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'IPTU cadastrado com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                console.log(e)
            })
        },
        updateIptu(datas) {
            editIptu(datas, this.dadoActive.id).then(r => {
                let v = r.results,
                    index = this.iptus.data.map(e => e.id).indexOf(this.dadoActive.id)

                // Atualizando o Iptu na lista
                this.iptus.data[index].status = (v.status ? v.status : 'N/Informado')
                this.iptus.data[index].periodo = v.periodo
                this.iptus.data[index].parcela = v.parcela
                this.iptus.data[index].vencimento = v.vencimento
                this.iptus.data[index].valor_principal = this.$options.filters.currency(v.valor_principal)
                this.iptus.data[index].multa = v.multa + '%'
                this.iptus.data[index].juros = v.juros + '%'
                this.iptus.data[index].correcao_monetaria = v.correcao_monetaria + '%'
                this.iptus.data[index].divida_ativa = v.divida_ativa
                this.iptus.data[index].fonte = v.fonte
                this.iptus.data[index].raw = v

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'IPTU atualizado com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                console.log(e)
            })
        },
        deleteIptu() {
            delIptu(this.dadoActive.id).then(r => {
                // Removendo o iptu da lista
                let index = this.iptus.data.map(e => e.id).indexOf(this.dadoActive.id)
                this.iptus.data.splice(index, 1)

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Iptu deletado com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                console.log(e)
            })
        },
        /*=====  End of IPTUS - Events  ======*/

        /*=====================================
        =            Água - Events            =
        =====================================*/
        saveAgua(datas) {
            datas.PEP = this.PEP

            storeAgua(datas).then(r => {
                let v = r.results
                v.raw = v
                this.aguas.data.push(r.results)

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Água cadastrada com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                console.log(e)
            })
        },
        updateAgua(datas) {
            editAgua(datas, this.dadoActive.id).then(r => {
                let v = r.results,
                    index = this.aguas.data.map(e => e.id).indexOf(this.dadoActive.id)

                // Atualizando a água na lista
                this.aguas.data[index].status = (v.status ? v.status : 'N/Informado')
                this.aguas.data[index].doc_sap = (v.doc_sap ? v.doc_sap : 'N/Informado')
                this.aguas.data[index].periodo = v.periodo
                this.aguas.data[index].vencimento = v.vencimento
                this.aguas.data[index].valor = this.$options.filters.currency(v.valor)
                this.aguas.data[index].valor_pago = this.$options.filters.currency(v.valor_pago)
                this.aguas.data[index].multa = v.multa + '%' 
                this.aguas.data[index].juros = v.juros + '%'
                this.aguas.data[index].correcao = v.correcao + '%'
                this.aguas.data[index].fonte = (v.fonte == 'R' ? 'Relatório' : 'Projeção')
                this.aguas.data[index].total = '...'
                this.aguas.data[index].data_pagamento = (v.data_pagamento ? v.data_pagamento : 'N/Pago')
                this.aguas.data[index].raw = v

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Água atualizada com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                console.log(e)
            })
        },
        deleteAgua() {
            delAgua(this.dadoActive.id).then(r => {
                // Removendo a água da lista
                let index = this.aguas.data.map(e => e.id).indexOf(this.dadoActive.id)
                this.aguas.data.splice(index, 1)

                // Notificando o usuário
                this.$notify({ group:'normal', type:'success', text:'Água deletada com sucesso' })

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                console.log(e)
            })
        },
        /*=====  End of Água - Events  ======*/

        /*====================================
        =            Luz - Events            =
        ====================================*/
        saveLuz(datas) {
            datas.PEP = this.PEP

            storeLuz(datas).then(r => {
                let v = r.results
                v.raw = v
                this.luzes.data.push(r.results)

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Luz cadastrada com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                console.log(e)
            })
        },
        updateLuz(datas) {
            editLuz(datas, this.dadoActive.id).then(r => {
                let v = r.results,
                    index = this.luzes.data.map(e => e.id).indexOf(this.dadoActive.id)

                // Atualizando a luz na lista
                this.luzes.data[index].status = (v.status ? v.status : 'N/Informado')
                this.luzes.data[index].doc_sap = v.doc_sap ? v.doc_sap : 'N/Informado'
                this.luzes.data[index].periodo = v.periodo
                this.luzes.data[index].vencimento = v.vencimento
                this.luzes.data[index].valor = this.$options.filters.currency(v.valor)
                this.luzes.data[index].valor_pago = this.$options.filters.currency(v.valor_pago)
                this.luzes.data[index].multa = v.multa + '%' 
                this.luzes.data[index].juros = v.juros + '%'
                this.luzes.data[index].correcao = v.correcao + '%'
                this.luzes.data[index].fonte = (v.fonte == 'R' ? 'Relatório' : 'Projeção')
                this.luzes.data[index].total = '...'
                this.luzes.data[index].data_pagamento = (v.data_pagamento ? v.data_pagamento : 'N/Pago')
                this.luzes.data[index].raw = v

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Luz atualizada com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                console.log(e)
            })
        },
        deleteLuz() {
            delLuz(this.dadoActive.id).then(r => {
                // Removendo a luz da lista
                let index = this.luzes.data.map(e => e.id).indexOf(this.dadoActive.id)
                this.luzes.data.splice(index, 1)

                // Notificando o usuário
                this.$notify({ group:'normal', type:'success', text:'Água deletada com sucesso' })

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                console.log(e)
            })
        }
        /*=====  End of Luz - Events  ======*/

    },
    mounted(){
        if(this.PEP) this.$initPep(this.PEP)

        /*==============================
        =            Events            =
        ==============================*/
        Bus.$on('isFetching', is => this.isFetching = is)

        // Dado active
        Bus.$on('evActiveDado', datas => this.dadoActive = datas)

        // Save events
        Bus.$on('evNovoCondominio', datas => this.saveCond(datas))
        Bus.$on('evNovoIptu', datas => this.saveIptu(datas))
        Bus.$on('evNovaAgua', datas => this.saveAgua(datas))
        Bus.$on('evNovaLuz', datas => this.saveLuz(datas))

        // Edit events
        Bus.$on('evEditarCondominio', datas => this.updateCond(datas))
        Bus.$on('evEditarIptu', datas => this.updateIptu(datas))
        Bus.$on('evEditarAgua', datas => this.updateAgua(datas))
        Bus.$on('evEditarLuz', datas => this.updateLuz(datas))

        // Delete events
        Bus.$on('evDeletarCondominio', this.deleteCond)
        Bus.$on('evDeletarIptu', this.deleteIptu)
        Bus.$on('evDeletarAgua', this.deleteAgua)
        Bus.$on('evDeletarLuz', this.deleteLuz)
    },
    beforeDestroy(){
        Bus.$off()
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