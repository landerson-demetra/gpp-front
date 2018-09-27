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
                                    <input v-model="PEP" id="PEP" type="text" class="form-control" :class="{'is-invalid': pepIs == false}" placeholder="R.XXXX.99.99.99.9999">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="Contribuinte">Contribuinte</label>
                                    <input id="Contribuinte" type="text" class="form-control" placeholder="NºContribuinte" disabled>
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
                                
                            </div>
                            <div class="tab-pane fade" id="luz" role="tabpanel" aria-labelledby="luz-tab">
                                
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-primary text-white border-0 text-right">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-primary"><i class="fas fa-file-upload"></i> Anexar</button>
                            <button type="button" class="btn btn-primary"><i class="fas fa-print"></i> Imprimir</button>
                            <a href="#relatorio" class="btn btn-primary" data-toggle="dropdown"><i class="fas fa-file-export"></i> Relatório</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- [ Responsaveis modal ] -->
                <Responsaveis :PEP="PEP"></Responsaveis>
            <!-- [ /Responsaveis modal ] -->

            <!-- [ Resumo ] -->
                <GestaoResumo :datas="unidade_datas"></GestaoResumo>
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

// Components
import GestaoResumo from '../includes/Modals/Gestao/Resumo'
import Responsaveis from '../includes/Modals/Gestao/Responsaveis'
import ActionButtons from '../includes/Buttons/ActionButtons'
import CUDCondominios from '../includes/Modals/Gestao/CUD_Condominios'
import CUDIptus from '../includes/Modals/Gestao/CUD_Iptus'

export default {
    name: 'GestaoPatrimonios',
    components: {
        GestaoResumo,
        Responsaveis,
        CUDCondominios,
        CUDIptus
    },
    data() {
        return {
            PEP: this.$route.params.pep || null,
            pepParsed: {},
            pepIs: null,
            gestExpanded: false,
            datas: {},

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
                tblClass: 'border table-responsive d-md-table',
                columns: [
                    { title: 'Documento SAP', field: 'doc_sap' },
                    { title: 'Periodo', field: 'periodo' },
                    { title: 'Vencimento', field: 'vencimento'},
                    { title: 'Valor', field: 'valor'},
                    { title: 'Valor Pago', field: 'valor_pago'},
                    { title: 'Multa', field: 'multa'},
                    { title: 'Juros', field: 'juros'},
                    { title: 'Correção', field: 'correcao'},
                    { title: 'Fonte', field: 'fonte'},
                    { title: 'Total', field: 'total'},
                    { title: 'Data Pgto', field: 'data_pgto'},
                    { title: 'Ação', fixed: 'right', tdComp: ActionButtons },
                ].map(col => (col.colStyle = { width: '150px' }, col)),
                data: [],
                total: 0,
                query: {},
                xprops: {
                    evName: 'Condominio',
                }
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
                    { title: 'Ação', fixed: 'right', tdComp: ActionButtons },
                ].map(col => (col.colStyle = { width: '150px' }, col)),
                data: [],
                total: 0,
                query: {},
                xprops: {
                    evName: 'Iptu'
                }
            },

            aguas: {
                tblClass: 'border table-responsive-sm',
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
                tblClass: 'border table-responsive-sm',
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
                    PEP_Unidade: this.PEP,
                    invadido: this.invadido,
                    status: this.status
                }).then(r => {
                    this.unidade_datas.status = r.results
                })
            }

            this.$notify({ group: 'normal', clean: true })
            this.$notify({ group: 'normal', type: 'success', text: 'Status atualizado com sucesso' })
        },
        $resetUnidadeDatas() {
            this.invadido = ''
            this.vendido = ''
            this.status = ''

            this.contratos.data = []
            this.contratos.total = 0

            this.condominios.data = []
            this.condominios.total = 0

            this.unidade_datas = []
        },
        fetchDatas() {
            fetchGestao({ PEP: this.PEP }).then((data) => {
                this.datas = data

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
            }).catch((e) => {
                console.log('err:', e)
            })
        },
        fetchUnidadeDatas() {
            fetchUnidades({ PEP: this.PEP }).then((data) => {
                this.unidade_datas = data
                // Assigning values to the fields
                this.assignUnidadeValues()
            })
        },
        assignValues() {
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
                _.mapValues(unidades, (a) => unidadesArr.push({
                    'text' : a.unidade_nome,
                    'value' : a.unidade_cod
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

            // Resumo de patrimônios
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
                    id: v.id,
                    contrato: v.id,
                    nome: v.nome,
                    vlcontrato: v.valor_contrato,
                    cnpj_cpf: v.cnpj_cpf,
                    dtcontrato: v.data_contrato,
                    status: v.status_contrato,
                    raw: v
                })
            })

            this.contratos.total = formated.length
            this.contratos.data = formated

            /* [ Condominios ] */
            formated = []
            _.forEach(this.unidade_datas.condominios, (v) => {
                formated.push({
                    id: v.id,
                    periodo: v.periodo,
                    doc_sap: v.doc_sap ? v.doc_sap : 'N/Informado',
                    vencimento: v.vencimento,
                    valor: this.$options.filters.currency(v.valor),
                    valor_pago: this.$options.filters.currency(v.valor_pago),
                    multa: v.multa + '%' ,
                    juros: v.juros + '%',
                    correcao: v.correcao + '%',
                    fonte: v.fonte,
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
                    status: v.status,
                    periodo: v.periodo,
                    parcela: v.parcela,
                    vencimento: v.vencimento,
                    valor_principal: this.$options.filters.currency(v.valor_principal),
                    multa: v.multa + '%',
                    juros: v.juros + '%',
                    correcao_monetaria: v.correcao_monetaria + '%',
                    total: '...',
                    divida_ativa: v.divida_ativa,
                    fonte: v.fonte,
                    raw: v
                })
            })

            this.iptus.total = formated.length
            this.iptus.data = formated
        },

        /*============================================
        =            Condominios - Events            =
        ============================================*/
        saveCond(datas){
            datas.PEP_Unidade = this.PEP

            storeCond(datas).then(r => {
                let v = r.results
                this.condominios.total++
                this.condominios.data.push({
                    periodo: v.periodo,
                    doc_sap: v.doc_sap ? v.doc_sap : 'N/Informado',
                    vencimento: v.vencimento,
                    valor: this.$options.filters.currency(v.valor),
                    valor_pago: this.$options.filters.currency(v.valor_pago),
                    multa: v.multa + '%' ,
                    juros: v.juros + '%',
                    correcao: v.correcao + '%',
                    fonte: v.fonte,
                    total: '...',
                    data_pgto: (v.data_pagamento ? v.data_pagamento : 'N/Pago'),
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
            datas.PEP_Unidade = this.PEP

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
                this.iptus.data[index].status = v.status
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
    },
    mounted(){
        if(this.PEP) this.$initPep(this.PEP)

        /*==============================
        =            Events            =
        ==============================*/
        Bus.$on('isFetching', is => this.isFetching = is)

        // Save events
        Bus.$on('evNovoCondominio', datas => this.saveCond(datas))
        Bus.$on('evNovoIptu', datas => this.saveIptu(datas))

        // Edit events
        Bus.$on('evActCondominioEdit', datas => this.dadoActive = datas)
        Bus.$on('evEditarCondominio', datas => this.updateCond(datas))

        Bus.$on('evActIptuEdit', datas => this.dadoActive = datas)
        Bus.$on('evEditarIptu', datas => this.updateIptu(datas))

        // Delete events
        Bus.$on('evActCondominioDelete', datas => this.dadoActive = datas)
        Bus.$on('evDeletarCondominio', this.deleteCond)

        Bus.$on('evActIptuDelete', datas => this.dadoActive = datas)
        Bus.$on('evDeletarIptu', this.deleteIptu)
    },
    beforeDestroy(){
        // ..
        Bus.$off()
        // Bus.$off([
        //     'evNovoCondominio',
        //     'evActCondominioEdit',
        //     'evEditarCondominio',
        //     'evActCondominioDelete',
        //     'evDeletarCondominio'
        // ])
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