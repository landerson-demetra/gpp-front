<template>
    <div id="empreendimento" class="wow fadeIn" data-wow-duration="2s">
        <h3 class="mt-3">Empreendimentos</h3>

        <hr>

        <div class="row">
            <div class="col-12">
                <table class="table table-responsive-md table-striped table-borderless table-hover">
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-on:click="selectEmpre" v-for="data in datas">
                            <th>
                                <div class="checkbox checkbox-success">
                                    <input type="checkbox" :id="data.id" class="styled">
                                    <label></label>
                                </div>
                            </th>
                            <th>{{ data.pep }}</th>
                            <th>[{{ data.spe_cod }}] {{ data.spe_cnpj }}</th>
                            <th>[{{ data.empreendimento_cod }}] {{ data.empreendimento_nome }}</th>
                            <th>{{ data.fase }}</th>
                            <th>[{{ data.bloco_cod }}] {{ data.bloco_nome }}</th>
                        </tr>
                    </tbody>
                </table>

                <div :class="{'pagination-disabled': isFetching}">
                    <Paginator :paginator="paginator" :limit="5" v-on:changePage="changePage"></Paginator>
                </div>
            </div>
        </div>

        <h3 class="mt-3">Unidades</h3>

        <hr>

        <div class="row">
            <div v-for="n in 12" class="col-md-2 mb-3">
                <div  class="card shadow-sm border-secondary bg-primary text-white">
                    <div class="card-body">
                        Card - {{ n }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Paginator from '../includes/Paginator'

export default {
    name: 'Empreendimento',
    components: { Paginator },
    data() {
        return {
            datas: [],
            isFetching: false,
            paginator: {
                current_page: 1,
            }
        }
    },
    methods: {
        selectEmpre: function(){
            console.log(event)
        },
        changePage: function(e){
            this.paginator.current_page = e
            this.fetchdatas(e)
        },
        fetchdatas: function(page) {
            this.isFetching = true

            this.$http.get('/empreendimentos', { params: { page: page ? page : 1 } }).then((response) => {
                this.isFetching = false

                let resp = response.data
                this.datas = resp.data

                this.paginator = {
                    per_page: resp.per_page,
                    limit_pages: this.paginator.limit_pages,
                    total: resp.total,
                    last_page: Math.ceil(resp.total / resp.per_page),
                    current_page: this.paginator.current_page
                }
            })
        }
    },
    mounted() {
        this.fetchdatas()
    }
}
</script>

<style lang="scss">
.table th{
    font-weight: 600;
    padding: .6rem;
}

.pagination-disabled{
    opacity: .5;
    pointer-events: none;
    cursor: default;
}
</style>