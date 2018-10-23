<template>
    <div id="empreendimento" class="wow fadeIn" data-wow-duration="2s">
        <h3 class="mt-3">Empreendimentos<span class="selecteds text-muted" v-if="this.empreendimentos.checkeds.length"> ({{ this.empreendimentos.checkeds.length }} Selecionados)</span></h3>

        <hr>

        <div class="row" :class="{'is-fetching': isFetching}" >
            <div class="col-12">
                <div class="row bg-white shadow-sm p-3 my-3 justify-content-start">
                    <div class="input-group mb-3 col-md-12">
                        <input v-on:input="S_SPE = $event.target.value.toUpperCase()" v-on:keyup.enter="fetchEmpreds(1)" v-model="S_SPE" v-mask="['XXXX']" type="text" class="form-control" placeholder="SPE (XXXX)...">
                        <input v-on:input="S_Razao = $event.target.value.toUpperCase()" v-on:keyup.enter="fetchEmpreds(1)" v-model="S_Razao" type="text" class="form-control" placeholder="SPE Razão Social...">
                        <input v-on:input="S_Empre = $event.target.value.toUpperCase()" v-on:keyup.enter="fetchEmpreds(1)" v-model="S_Empre" type="text" class="form-control" placeholder="Empreendimento...">
                        <select v-on:change="fetchEmpreds(1)" v-model="S_Order" class="form-control">
                            <option :value="null">Ordem: Mais antigos</option> 
                            <option value="id,desc">Ordem: Mais novos</option> 
                            <option value="empreendimento_nome,asc">Ordem: Nome</option> 
                            <option value="dt_lancamento,desc">Ordem: Data</option> 
                        </select>
                        <select v-model="empreendimentos.paginator.per_page" class="form-control">
                            <option v-for="max in [5, 15, 25, 50, 100]" :value="max">Mostrar: {{ max }}</option> 
                        </select>
                        <button class="btn btn-primary" v-on:click="fetchEmpreds(1)"><i class="fas fa-search"></i></button>
                    </div>
                </div>

                <div v-if="!this.empreendimentos.datas.length" class="alert alert-secondary" role="alert">Nenhum Projeto/Empreendimento encontrado</div>

               <div class="row" v-else>
                    <table :class="{'is-fetching': isFetching}" class="table table-bordered table-responsive-md  table-hover">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    <div class="checkbox checkbox-success">
                                        <input v-model="check_all" type="checkbox" id="checkbox2" class="styled">
                                        <label></label>
                                    </div>
                                </th>
                                <th>Projeto</th>
                                <th>SPE - Razão Social</th>
                                <th>Empreendimento</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Listagem -->
                            <tr class="align-middle" :id="data.id" v-on:click="checkUncheckTr(data.id)" v-for="data in empreendimentos.datas">
                                <th class="text-center">
                                    <div class="checkbox checkbox-success" style="pointer-events: none">
                                        <input type="checkbox" :value="data.id" class="styled">
                                        <label></label>
                                    </div>
                                </th>
                                <th class="align-middle">{{ data.projeto }}</th>
                                <th class="align-middle">[{{ data.spe }}] {{ data.spe_razao_social }}</th>
                                <th class="align-middle">{{ data.empreendimento_nome }}</th>
                                <th>
                                    <div class="action-buttons text-center align-middle">
                                        <button class="btn btn-primary" v-on:click="viewUnidades(data.id)"><i class="fas fa-building"></i></button>
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Paginação -->
                    <div class="w-100" :class="{'is-fetching': isFetching}">
                        <Paginator :paginator="this.empreendimentos.paginator" :limit="this.empreendimentos.paginator.limit_pages" v-on:changePage="$onEmpredsPageChange"></Paginator>
                    </div>
               </div>
            </div>
        </div>
        
        <!-- Vinculações -->
        <div v-if="this.empreendimentos.checkeds.length">
            <h3 class="mt-3">Vinculação</h3>

            <hr>

            <div class="row mb-5">
                <div class="col-md-12">
                    <form action="" method="POST" v-on:submit.prevent="vincularEmpreds">
                        <div class="row">
                            <div class="form-group col-md-3">
                                <v-select v-model="vinculacao.adm_sel" placeholder="Administrador" :options="vinculacao.administradoras">
                                    <span slot="no-options">Nenhuma administradora encontrada.</span>
                                </v-select>
                            </div>
                            <div class="form-group col-md-3">
                                <v-select v-model="vinculacao.forn_sap_sel" placeholder="Fornecedor SAP" :options="vinculacao.fornecedores_sap">
                                    <span slot="no-options">Nenhum fornecedor SAP encontrado.</span>
                                </v-select>
                            </div>
                            <div class="form-group col-md-3">
                                <v-select v-model="vinculacao.forn_agua_sel" placeholder="Fornecedor Água" :options="vinculacao.fornecedores_agua">
                                    <span slot="no-options">Nenhum fornecedor água encontrado.</span>
                                </v-select>
                            </div>
                            <div class="form-group col-md-3">
                                <v-select v-model="vinculacao.forn_luz_sel" placeholder="Fornecedor Luz" :options="vinculacao.fornecedores_luz">
                                    <span slot="no-options">Nenhum forneceder luz encontrado.</span>
                                </v-select>
                            </div>
                            <div class="form-group col-md-3">
                                <v-select v-model="vinculacao.prefeitura_sel" placeholder="Prefeitura" :options="vinculacao.prefeituras">
                                    <span slot="no-options">Nenhuma prefeitura encontrada.</span>
                                </v-select>
                            </div>
                            <div class="form-group col-md-3">
                                <select v-model="vinculacao.isInd" class="form-control">
                                    <option value="0" selected="">Individualizado</option>
                                    <option value="1">Sim</option>
                                    <option value="0">Não</option>
                                </select>
                            </div>
                            <div class="form-group col-6">
                                <input v-model="vinculacao.responsavel" class="form-control" id="Responsavel" placeholder="Nome do responsável..." type="text">
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-success"><i class="fas fa-sync"></i> Vincular</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div :class="{'is-fetching': isFetching}" v-if="this.activeEmpre">
            <h3 id="unidades" class="mt-3">{{ this.unidades.datas.length }} Unidades ({{ activeEmpre.spe }} - {{ activeEmpre.empreendimento_nome }}) <small class="text-muted" v-if="this.unidades.searchTxt.length > 2">( Resultados para '{{ this.unidades.searchTxt }}' )</small>  </h3>

            <hr>

            <grid-loader class="mx-auto my-5" :loading="isFetching" color="#26256A" size="10px"></grid-loader>

            <!-- Busca -->
            <div class="row my-3 justify-content-end" v-if="!isFetching">
                <div class="input-group mb-3 col-md-6">
                    <select v-model="bloco_selected" class="form-control">
                        <option :value="null">Todos os blocos</option>
                        <option v-for="bloco in blocos" :value="bloco">{{ bloco }}</option>
                    </select>
                    <select v-model="status_selected" class="form-control">
                        <option :value="null">Todos os status</option>
                        <option v-for="stat in status" :value="stat.STATUS">{{ stat.STATUS }}</option>
                    </select>
                    <select v-model="unidades.paginator.per_page" class="form-control">
                        <option v-for="max in [10,30,60,100,150,200]" :value="max">Mostrar: {{ max }}</option> 
                    </select>
                </div>
                <div class="input-group mb-3 col-md-6">
                    <input v-model="unidades.searchTxt" type="text" class="form-control" placeholder="Busque por uma unidade (Bloco/Unidade) min.2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </div>

            <!-- Nenhum resultado encontrado -->
            <div v-if="!this.isFetching && (unidades.notfound || !this.unidades.datas.length)">
                <div class="alert alert-secondary" role="alert">Nenhuma unidade encontrada <span v-if="this.unidades.searchTxt.length">para <b>{{ this.unidades.searchTxt }}</b></span></div>
            </div>

            <!-- Listagem -->
            <div v-if="!unidades.notfound">
                <div class="row" v-if="!isFetching">
                    <div class="col-md-12">
                        <table class="table table-units table-bordered table-striped shadow-sm">
                            <thead>
                                <tr>
                                    <th>Bloco</th>
                                    <th>Unidade</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="unidade in unidades.datasShow">
                                    <th>{{ unidade.bloco_nome }}</th>
                                    <th>{{ unidade.unidade_cod }}</th>
                                    <th>{{ unidade.status_contrato || 'N/Definido' }}</th>
                                    <th>
                                        <router-link :to="{name: 'GestaoPatromonios', params: {pep: unidade.PEP}}" title="Gerenciar Patrimônios" class="btn btn-primary">Gerir</router-link>
                                        <!-- <button class="btn btn-secondary"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button> -->
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="clearfix"></div>

                <!-- Paginação -->
                <div :class="{'is-fetching': isFetching}">
                    <Paginator :paginator="this.unidades.paginator" :limit="this.unidades.paginator.limit_pages" v-on:changePage="$onUnidsPageChange"></Paginator>
                </div>
            </div>
        </div>

        <!-- Editar empreendimento -->
        <EmpreendimentoModal action="Edit" name="EditarEmpreendimento" :title="'Editar ' + dadoActive.empreendimento_nome" :datas="dadoActive"></EmpreendimentoModal>

        <!-- Deletar empreendimento -->
        <EmpreendimentoModal action="Delete" name="DeletarEmpreendimento" :title="'Editar ' + dadoActive.empreendimento_nome" :datas="dadoActive"></EmpreendimentoModal>
    </div>
</template>

<script>
import Bus from '../../bus'
import Paginator from '../includes/Paginator'
import GridLoader from 'vue-spinner/src/GridLoader'
import {mask} from 'vue-the-mask'

// Modals
import EmpreendimentoModal from '../includes/Modals/EmpreendimentoModal'

// Api calls
import { get, search } from '../../api/empreendimentos'
import { get as getStatus } from '../../api/status-contrato'
import { get as getForList } from '../../api/fornecedor'
import { list as listUnidades } from '../../api/unidades'
import { storeMany } from '../../api/vinculacoes'

export default {
    name: 'Empreendimento',
    directives: {mask},
    components: {
        Paginator,
        GridLoader,
        EmpreendimentoModal
    },
    data() {
        return {
            check_all: false,
            activeEmpre: '',
            S_SPE: '',
            S_Razao: '',
            S_Empre: '',
            S_Order: null,
            empreendimentos: {
                datas: [],
                checkeds: [],
                paginator: { current_page: 1, per_page: 5, limit_pages: 6 }
            },
            vinculacao: {
                administradoras: [],
                fornecedores_sap: [],
                fornecedores_agua: [],
                fornecedores_luz: [],
                prefeituras: [],

                // Models
                adm_sel: null,
                forn_sap_sel: null,
                forn_agua_sel: null,
                forn_luz_sel: null,
                prefeitura_sel: null,
                isInd: 0,
                responsavel: null,
            },
            status: [],
            status_selected: null,
            blocos: [],
            bloco_selected: null,
            unidades: {
                datas: [],
                datasShow: [],
                datasSearch: [],
                checkeds: [],
                searchTxt: '',
                notfound: false,
                paginator: { per_page: 10, limit_pages: 6, current_page: 1 }
            },
            dadoActive: [],
            isFetching: undefined
        }
    },
    watch: {
        unidades: {
            handler: function(){
                try{
                    $('html,body').clearQueue().animate({scrollTop: $('#unidades').offset().top}, 500)
                }catch(e){}
            },
            deep: true
        },
        bloco_selected: function(bloco){
            if(bloco == null) {
                this.unidades.datasSearch = []
                this.unidades.notfound = false
                this._setPaginateUnids()
                return
            }

            this.unidades.datasSearch = _.filter(this.unidades.datas, (v) => {
                if(this.status_selected !== null)
                    return v.bloco_nome == bloco && v.status_contrato == this.status_selected
                else
                    return v.bloco_nome == bloco
            })

            if(this.unidades.datasSearch.length){
                this.unidades.notfound = false
                this.unidades.paginator.current_page = 1
                this._setPaginateUnids()
            }else{
                this.unidades.notfound = true
            }
        },
        status_selected: function(status){
            if(status == null) {
                this.unidades.datasSearch = []
                this.unidades.notfound = false
                this._setPaginateUnids()
                return
            }

            this.unidades.datasSearch = _.filter(this.unidades.datas, (v) => {
                if(this.bloco_selected !== null)
                    return v.status_contrato == status && v.bloco_selected == this.bloco_selected
                else
                    return v.status_contrato == status
            })

            if(this.unidades.datasSearch.length){
                this.unidades.notfound = false
                this.unidades.paginator.current_page = 1
                this._setPaginateUnids()
            }else{
                this.unidades.notfound = true
            }
        },
        'unidades.paginator.per_page': function(){
            this.unidades.paginator.current_page = 1
            this._setPaginateUnids()
        },
        'unidades.searchTxt': function(newv){
            if(this.unidades.searchTxt !== '' && this.unidades.searchTxt.length < 2) return

            var self = this

            this.unidades.datasSearch = _.filter(this.unidades.datas, (a) => {
                let searchlower = self.unidades.searchTxt.toLowerCase()

                return a.bloco_nome.toLowerCase().includes(searchlower) ||
                       a.unidade_cod.toString().toLowerCase().includes(searchlower)
            })

            if(this.unidades.datasSearch.length){
                this.unidades.notfound = false
                this.unidades.paginator.current_page = 1
                this._setPaginateUnids()
            }else{
                this.unidades.notfound = true
            }
        },
        check_all: function(v){
            var self = this,
                table = $('.table')

            table.find('th').first().toggleClass('checked')

            table.find('tbody tr').each((i, elem) => {
                let el = $(elem), input = el.find('input')

                el.toggleClass('checked')

                if(!input.is(':checked')){
                    input.attr('checked', true)
                    self.empreendimentos.checkeds.push(input.attr('value'))
                }else{
                    input.attr('checked', false)
                    let index = self.empreendimentos.checkeds.indexOf(input.attr('value'))
                    self.empreendimentos.checkeds.splice(index, 1)
                }
            })
        },
        'empreendimentos.paginator.per_page': function(){
            this.empreendimentos.paginator.current_page = 1
            this.fetchEmpreds()
        }
    },
    methods: {
        /*----------  Check/uncheck empreendimento  ----------*/
        checkUncheckTr(id) {
            if(event.target.nodeName == 'BUTTON' || event.target.nodeName == 'I')
                return

            this.activeEmpre = ''

            let tr = $('.table').find('tr[id='+ id +']'),
                input = tr.find('input')

            tr.toggleClass('checked')

            if(!input.is(':checked')){
                input.attr('checked', true)
                this.empreendimentos.checkeds.push(input.attr('value'))
            }else{
                input.attr('checked', false)
                let index = this.empreendimentos.checkeds.indexOf(input.attr('value'))
                this.empreendimentos.checkeds.splice(index, 1)
            }
        },

        /*----------  Vincular empreendimentos  ----------*/
        vincularEmpreds() {
            // Montando os dados para criar as vinculações
            let datas = {
                'empreendimentos': this.empreendimentos.checkeds,
                'vinculacoes': {
                    'is_ind': this.vinculacao.isInd,
                    'adm_id': (this.vinculacao.adm_sel ? this.vinculacao.adm_sel.value : null),
                    'forn_sap_id': (this.vinculacao.forn_sap_sel ? this.vinculacao.forn_sap_sel.value : null),
                    'forn_agua_id': (this.vinculacao.forn_agua_sel ? this.vinculacao.forn_agua_sel.value : null),
                    'forn_luz_id': (this.vinculacao.forn_luz_sel ? this.vinculacao.forn_agua_sel.value : null),
                    'pref_id': (this.vinculacao.prefeitura_sel ? this.vinculacao.prefeitura_sel.value : null),
                    'responsavel': this.vinculacao.responsavel
                }
            }

            // Salva as vinculações
            storeMany(datas).then(r => {
                if(r.results.createds > 0) {
                    let text = r.results.createds > 1 ? r.results.createds + ' vinculações criadas com sucesso.' : 'Vinculação criada com sucesso.'
                    this.$notify({ group: 'normal', type: 'success', text: text })
                }

                if(r.results.founds > 0) {
                    let text = r.results.founds > 1 ? r.results.founds + ' Vinculações já existiam para os empreendimentos selecionado.' : 'Empreendimento já vinculado.'
                    this.$notify({ group: 'normal', type: 'warn', text: text })
                }
            })
        },

        /*----------  Mostrar unidades  ----------*/
        viewUnidades(idProjeto) {
            this.$resetUnids()

            let found = _.filter(this.empreendimentos.datas, (o) => {
                return o.id == idProjeto
            })

            this.activeEmpre = found[0]
            this.fetchUnids(idProjeto)
        },

        /*----------  Fetch datas  ----------*/
        fetchEmpreds(page = 1) {
            this.$resetUnids()
            this.activeEmpre = ''

            get({ 
                spe: this.S_SPE,
                empreendimento: this.S_Empre,
                razao_social: this.S_Razao,
                order: this.S_Order,
                page: page,
                per_page: this.empreendimentos.paginator.per_page
            }).then((data) => {
                let resp = data.results
                this.empreendimentos.datas = resp.data || []

                this._setPaginateEmpreds(resp)

                // Carrega os status
                getStatus().then((data) => {
                    this.status  = data.results
                })
            })
        },
        fetchUnids(idProjeto) {
            listUnidades({ id_projeto: idProjeto }).then((data) => {
                this.unidades.datas = data.results
                this._setPaginateUnids()

                // Blocos da unidade
                var blcs = []
                _.forEach(_.mapValues(this.unidades.datas, 'bloco_nome'), (v) => {
                    if(!blcs.includes(v)) blcs.push(v)
                })

                this.blocos = blcs
            })
        },

        /*----------  Events  ----------*/
        $onEmpredsPageChange(e) {
            let tr = $('.table').find('tr'),
                input = tr.find('input')

            tr.removeClass('checked')
            input.attr('checked', false)

            this.empreendimentos.checkeds = []
            this.unidades.datas = []
            this.activeEmpre = ''

            this.empreendimentos.paginator.current_page = e
            this.fetchEmpreds(e)
        },
        $onUnidsPageChange(e) {
            this.unidades.paginator.current_page = e
            this._setPaginateUnids()
        },


        /*----------  Pagination  ----------*/
        _setPaginateEmpreds(resp) {
            this.empreendimentos.paginator = {
                per_page: this.empreendimentos.paginator.per_page,
                limit_pages: this.empreendimentos.paginator.limit_pages,
                total: resp.total,
                last_page: Math.ceil(resp.total / this.empreendimentos.paginator.per_page),
                current_page: this.empreendimentos.paginator.current_page
            }
        },
        _setPaginateUnids() {
            let datas = (this.unidades.datasSearch.length ? this.unidades.datasSearch : this.unidades.datas)
            let total = datas.length

            this.unidades.paginator = {
                per_page: this.unidades.paginator.per_page,
                limit_pages: this.unidades.paginator.limit_pages,
                total: total,
                last_page: Math.ceil(total / this.unidades.paginator.per_page),
                current_page: this.unidades.paginator.current_page
            }

            let offset = (this.unidades.paginator.current_page - 1) * this.unidades.paginator.per_page
            this.unidades.datasShow = datas.slice(offset, offset + this.unidades.paginator.per_page)
        },

        /*----------  Resets  ----------*/
        $resetUnids() {
            this.bloco_selected = null
            this.status_selected = null
            this.unidades.searchTxt = ''
            this.unidades.datas = []
            this.unidades.datasShow = []
            this.unidades.datasSearch = []
            this.unidades.notfound = false
            this.unidades.paginator.current_page = 1
        }, 
    },
    mounted() {
        var self = this

        this.fetchEmpreds()

        // Lista de fornecedores
        // Obtendo a lista de fornecedores
        getForList().then(r => {
            _.forEach(r.results, v => {
                let pushObj = { label: v.nome, value: v.id }

                if(v.segmentos.includes('Administradora'))
                    self.vinculacao.administradoras.push(pushObj)
                if(v.segmentos.includes('Fornecedor SAP'))
                    self.vinculacao.fornecedores_sap.push(pushObj)
                if(v.segmentos.includes('Fornecedor Água'))
                    self.vinculacao.fornecedores_agua.push(pushObj)
                if(v.segmentos.includes('Fornecedor Luz'))
                    self.vinculacao.fornecedores_luz.push(pushObj)
                if(v.segmentos.includes('Prefeitura'))
                    self.vinculacao.prefeituras.push(pushObj)
            })
        })

        Bus.$on('isFetching', is => this.isFetching = is)

        // Edit events
        Bus.$on('evEditarEmpreendimento', (datas) => this.updateEmpred(datas))

        // Delete events
        Bus.$on('evDeletarEmpreendimento', this.deleteEmpred)
    },
    beforeDestroy() {
        Bus.$off()
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/app";

.selecteds{
    font-size: 0.70em;
}

.table th{
    font-weight: 600;
    padding: .6rem;
}

.checked{
    background-color: #F1F1F1;
    box-shadow: inset 0 0 .3em #CCC;
}

.table-units{
    text-align: center;
}
</style>