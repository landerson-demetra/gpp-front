<template>
    <div id="empreendimento" class="wow fadeIn" data-wow-duration="2s">
        <h3 class="mt-3">Empreendimentos<span class="selecteds text-muted" v-if="this.empreendimentos.checkeds.length"> ({{ this.empreendimentos.checkeds.length }} Selecionados)</span></h3>
        <hr>

        <div class="row">
            <div class="col-12">
                <table :class="{'is-fetching': isFetching}" class="table table-responsive-md table-borderless table-hover">
                    <thead>
                        <tr>
                            <th>
                                <div class="checkbox checkbox-success">
                                    <input type="checkbox" id="checkbox2" class="styled">
                                    <label></label>
                                </div>
                            </th>
                            <th>PEP</th>
                            <th>SPE</th>
                            <th>Empreendimento</th>
                            <th>Fase</th>
                            <th>Bloco</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :id="data.id" v-on:click="checkTr(data.id)" v-for="data in empreendimentos.datas">
                            <th>
                                <div class="checkbox checkbox-success" style="pointer-events: none">
                                    <input type="checkbox" :value="data.id" class="styled">
                                    <label></label>
                                </div>
                            </th>
                            <th>{{ data.pep }}</th>
                            <th>[{{ data.spe_cod }}] {{ data.spe_cnpj }}</th>
                            <th>[{{ data.empreendimento_cod }}] {{ data.empreendimento_nome }}</th>
                            <th>{{ data.fase }}</th>
                            <th>[{{ data.bloco_cod }}] {{ data.bloco_nome }}</th>
                            <th>
                                <div class="action-buttons">
                                    <button class="btn btn-primary" v-on:click="viewUnidades(data.spe_cod)"><i class="fa fa-building"></i></button>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>

                <div :class="{'is-fetching': isFetching}">
                    <Paginator :paginator="this.empreendimentos.paginator" :limit="5" v-on:changePage="onPageChange"></Paginator>
                </div>
            </div>
        </div>

        <div v-if="this.empreendimentos.checkeds.length">
            <h3 class="mt-3">Vinculação</h3>

            <hr>

            <div class="row mb-5">
                <div class="col-md-12">
                    <form action="" method="POST">
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
                                    <option value="0">Individualizado</option> 
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
            <h3 id="unidades" class="mt-3">{{ this.unidades.datas.length }} Unidades ({{ activeEmpre.spe_cod }} - {{ activeEmpre.empreendimento_nome }})</h3>

            <hr>

            <clip-loader class="my-5" :loading="isFetching" :color="'#26256A'" :size="'70px'"></clip-loader>

            <div class="row my-3 justify-content-end" v-if="!isFetching">
                <div class="input-group mb-3 col-md-6">
                    <input v-model="unidades.searchTxt" type="text" class="form-control" placeholder="Busque por uma unidade (Bloco, unidade, e.t.c)">
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </div>

            <div class="row" v-if="!isFetching">
                <div v-for="unidade in this.unidades.datas" class="col-md-2 mb-3">
                    <div  class="card shadow-sm border-secondary bg-primary text-white">
                        <div class="card-body">
                            <p>Bloco: {{ unidade.bloco_nome }}</p>
                            <p>Unidade: {{ unidade.unidade_nome }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Paginator from '../includes/Paginator'
import ClipLoader from 'vue-spinner/src/ClipLoader'

export default {
    name: 'Empreendimento',
    components: { Paginator, ClipLoader },
    data() {
        return {
            activeEmpre: '',
            empreendimentos: {
                datas: [],
                checkeds: [],
                paginator: {
                    current_page: 1,
                }
            },
            unidades: {
                datas: [],
                datasShow: [],
                checkeds: [],
                searchTxt: ''
            },
            isFetching: false,
        }
    },
    watch: {
        'unidades.searchTxt': function(newv){
            var self = this

            let datas = _.filter(this.unidades.datas, function(a){
                let searchlower = self.unidades.searchTxt.toLowerCase()

                return a.bloco_nome.toLowerCase().includes(searchlower)
                    || a.unidade_nome.toLowerCase().includes(searchlower)
            })

            console.log(datas)
        }
    },
    methods: {
        checkTr: function(id){
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
        onPageChange: function(e){
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
        viewUnidades: function(spe_cod) {
            let found = _.filter(this.empreendimentos.datas, function(o){
                return o.spe_cod == spe_cod
            })

            this.activeEmpre = found[0]
            this.fetchUnids(spe_cod)

            try{
                $('html, body').animate({scrollTop: $('#unidades').offset().top - 10}, 1000)
            }catch(E){}
        },
        fetchEmpreds: function(page) {
            this.isFetching = true

            this.$http.get('/empreendimentos', { params: { page: page ? page : 1 } }).then((response) => {
                this.isFetching = false

                let resp = response.data
                this.empreendimentos.datas = resp.data

                this.empreendimentos.paginator = {
                    per_page: resp.per_page,
                    limit_pages: this.empreendimentos.paginator.limit_pages,
                    total: resp.total,
                    last_page: Math.ceil(resp.total / resp.per_page),
                    current_page: this.empreendimentos.paginator.current_page
                }
            })
        },
        fetchUnids: function(spe_cod) {
            this.isFetching = true

            this.$http.get('/unidades', { params: { spe_cod: spe_cod } }).then((response) => {
                this.isFetching = false

                this.unidades.datas = response.data
            })
        }
    },
    mounted() {
        this.fetchEmpreds()
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

.table tr.checked{
    background-color: #F1F1F1;
    box-shadow: 0 0 .3em #CCC;
}

.is-fetching{
    opacity: .5;
    pointer-events: none;
    cursor: default;
}
</style>