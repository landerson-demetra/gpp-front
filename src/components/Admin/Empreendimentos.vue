<template>
    <div id="empreendimento" class="wow fadeIn" data-wow-duration="2s">
        <h3 class="mt-3">Empreendimentos<span class="selecteds text-muted" v-if="this.empreendimentos.checkeds.length"> ({{ this.empreendimentos.checkeds.length }} Selecionados)</span></h3>
        <hr>

        <div class="row">
            <div class="col-12" v-if="!this.empreendimentos.datas.length">
                <clip-loader class="my-5" :loading="true" :color="'#26256A'" :size="'70px'"></clip-loader>
            </div>
            <div class="col-12" v-else>
                <div class="row my-3 justify-content-end">
                    <div class="input-group col-md-2">
                        <select v-model="empreendimentos.paginator.per_page" class="form-control">
                            <option value="5">Mostrar: 5</option>
                            <option value="15">Mostrar: 15</option>
                            <option value="25">Mostrar: 25</option>
                            <option value="50">Mostrar: 25</option>
                        </select>
                    </div>
                </div>
                <table :class="{'is-fetching': isFetching}" class="table table-responsive-md table-borderless table-hover">
                    <thead>
                        <tr>
                            <th>
                                <div class="checkbox checkbox-success">
                                    <input v-model="check_all" type="checkbox" id="checkbox2" class="styled">
                                    <label></label>
                                </div>
                            </th>
                            <th>PEP</th>
                            <th>SPE</th>
                            <th>Empreendimento</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Listagem -->
                        <tr :id="data.id" v-on:click="checkUncheckTr(data.id)" v-for="data in empreendimentos.datas">
                            <th>
                                <div class="checkbox checkbox-success" style="pointer-events: none">
                                    <input type="checkbox" :value="data.id" class="styled">
                                    <label></label>
                                </div>
                            </th>
                            <th>{{ data.PEP }}</th>
                            <th>[{{ data.spe }}] {{ data.spe_cnpj }}</th>
                            <th>[{{ data.empreendimento_cod }}] {{ data.empreendimento_nome }}</th>
                            <th>
                                <div class="action-buttons text-right">
                                    <button class="btn btn-primary" v-on:click="viewUnidades(data.PEP)"><i class="fas fa-building"></i></button>
                                    <button class="btn btn-secondary"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
                
                <!-- Paginação -->
                <div :class="{'is-fetching': isFetching}">
                    <Paginator :paginator="this.empreendimentos.paginator" :limit="this.empreendimentos.paginator.limit_pages" v-on:changePage="$onEmpredsPageChange"></Paginator>
                </div>
            </div>
        </div>
        
        <!-- Vinculações -->
        <div v-if="this.empreendimentos.checkeds.length">
            <h3 class="mt-3">Vinculação</h3>

            <hr>

            <div class="row mb-5">
                <div class="col-md-12">
                    <form action="" method="POST" v-on:submit.prevent="">
                        <div class="row">
                            <div class="form-group col-md-3">
                                <v-select name="Administrador" placeholder="Administrador" :options="[]">
                                    <span slot="no-options">Nenhum administrador encontrado.</span>
                                </v-select>
                            </div>
                            <div class="form-group col-md-3">
                                <v-select name="Fornecedor" placeholder="Fornecedor" :options="[]">
                                    <span slot="no-options">Nenhum fornecedor encontrado.</span>
                                </v-select>
                            </div>
                            <div class="form-group col-md-3">
                                <v-select name="Prefeitura" placeholder="Prefeitura" :options="[]">
                                    <span slot="no-options">Nenhuma prefeitura encontrada.</span>
                                </v-select>
                            </div>
                            <div class="form-group col-md-3">
                                <select class="form-control" name="individualizado" id="individualizado">
                                    <option value="null">Individualizado</option> 
                                    <option value="0">Não</option> 
                                    <option value="1">Sim</option> 
                                </select>
                            </div>
                            <div class="form-group col-12">
                                <v-select name="Reponsavel" placeholder="Reponsável" :options="[]">
                                    <span slot="no-options">Nenhum responsavel encontrado.</span>
                                </v-select>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-success"><i class="fas fa-sync"></i> Vincular</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div :class="{'is-fetching': isFetching}" v-if="this.activeEmpre">
            <h3 id="unidades" class="mt-3">{{ this.unidades.datas.length }} Unidades ({{ activeEmpre.spe }} - {{ activeEmpre.empreendimento_nome }}) <small class="text-muted" v-if="this.unidades.searchTxt.length > 2">( Resultados para '{{ this.unidades.searchTxt }}' )</small>  </h3>

            <hr>

            <clip-loader class="my-5" :loading="isFetching" :color="'#26256A'" :size="'70px'"></clip-loader>

            <!-- Busca -->
            <div class="row my-3 justify-content-end" v-if="!isFetching">
                <div class="input-group mb-3 col-md-6">
                    <input v-model="unidades.searchTxt" type="text" class="form-control" placeholder="Busque por uma unidade (Bloco/Unidade) min.2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </div>

            <!-- Nenhum resultado encontrado -->
            <div v-if="unidades.notfound || !this.unidades.datas.length">
                <div class="alert alert-secondary" role="alert">Nenhuma unidade encontrada <span v-if="this.unidades.searchTxt.length">para <b>{{ this.unidades.searchTxt }}</b></span></div>
            </div>

            <!-- Listagem -->
            <div v-if="!unidades.notfound">
                <div class="row" v-if="!isFetching">
                    <div v-for="unidade in this.unidades.datasShow" class="col-xl-2 col-lg-3 col-md-4 col-sm-12 mb-3">
                        <div  class="card shadow bg-white">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><b>Bloco:</b> {{ unidade.bloco_nome }}</li>
                                <li class="list-group-item"><b>Unidade:</b> {{ unidade.unidade_nome }}</li>
                                <router-link :to="{name: 'GestaoPatromonios', params: {pep: unidade.PEP}}" title="Gerenciar Patrimônios" class="btn btn-primary btn-block">Gerir</router-link>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Paginação -->
                <div :class="{'is-fetching': isFetching}">
                    <Paginator :paginator="this.unidades.paginator" :limit="this.unidades.paginator.limit_pages" v-on:changePage="$onUnidsPageChange"></Paginator>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../../bus'
import Paginator from '../includes/Paginator'
import ClipLoader from 'vue-spinner/src/ClipLoader'

export default {
    name: 'Empreendimento',
    components: { Paginator, ClipLoader },
    data() {
        return {
            check_all: false,
            activeEmpre: '',
            empreendimentos: {
                datas: [],
                checkeds: [],
                paginator: { current_page: 1, per_page: 5, limit_pages: 6 }
            },
            unidades: {
                datas: [],
                datasShow: [],
                datasSearch: [],
                checkeds: [],
                searchTxt: '',
                notfound: false,
                paginator: { per_page: 12, limit_pages: 6, current_page: 1 }
            },
            isFetching: undefined
        }
    },
    watch: {
        unidades: {
            handler: function(){
                try{
                    $('html,body').animate({scrollTop: $('#unidades').offset().top}, 1300)
                }catch(e){}
            },
            deep: true
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
        },
        'unidades.searchTxt': function(newv){
            if(this.unidades.searchTxt !== '' && this.unidades.searchTxt.length < 2) return

            var self = this

            this.unidades.datasSearch = _.filter(this.unidades.datas, function(a){
                let searchlower = self.unidades.searchTxt.toLowerCase()

                return a.bloco_nome.toLowerCase().includes(searchlower)
                    || a.unidade_nome.toLowerCase().includes(searchlower)
            })

            if(this.unidades.datasSearch.length){
                this.unidades.notfound = false

                this.unidades.paginator.current_page = 1
                this._setPaginateUnids()
            }else{
                this.unidades.notfound = true
            }
        }
    },
    methods: {
        /*----------  Check/uncheck empreendimento  ----------*/
        checkUncheckTr: function(id){
            if(event.target.nodeName == 'BUTTON' || event.target.nodeName == 'I')
                return

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

        /*----------  Mostrar unidades  ----------*/
        viewUnidades: function(PEP) {
            this.$resetUnids()

            let found = _.filter(this.empreendimentos.datas, (o) => {
                return o.PEP == PEP
            })

            this.activeEmpre = found[0]
            this.fetchUnids(PEP)
        },

        /*----------  Fetch datas  ----------*/
        fetchEmpreds: function(page = 1) {
            this.$http.get('/empreendimentos', { params: { page: page, per_page: this.empreendimentos.paginator.per_page } }).then((response) => {
                let resp = response.data
                this.empreendimentos.datas = resp.data

                this._setPaginateEmpreds(resp)
            })
        },
        fetchUnids: function(PEP) {
            this.$http.get('/unidades', { params: { PEP: PEP } }).then((response) => {
                this.unidades.datas = response.data
                this._setPaginateUnids()
            })
        },

        /*----------  Events  ----------*/
        $onEmpredsPageChange: function(e){
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

        $onUnidsPageChange: function(e){
            this.unidades.paginator.current_page = e
            this._setPaginateUnids()
        },

        /*----------  Pagination  ----------*/
        _setPaginateEmpreds: function(resp){
            this.empreendimentos.paginator = {
                per_page: this.empreendimentos.paginator.per_page,
                limit_pages: this.empreendimentos.paginator.limit_pages,
                total: resp.total,
                last_page: Math.ceil(resp.total / this.empreendimentos.paginator.per_page),
                current_page: this.empreendimentos.paginator.current_page
            }
        },
        _setPaginateUnids: function(){
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
        $resetUnids: function(){
            this.unidades.searchTxt = ''
            this.unidades.datas = []
            this.unidades.datasShow = []
            this.unidades.datasSearch = []
            this.unidades.notfound = false
            this.unidades.paginator.current_page = 1
        }, 
    },
    mounted() {
        this.fetchEmpreds()
        Bus.$on('isFetching', is => this.isFetching = is)
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
    box-shadow: 0 0 .3em #CCC;
}
</style>