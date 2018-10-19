<template>
    <div>
        <div class="row">
            <div class="mb-5 col-md-12 col-lg-12">
                <div class="card shadow border-0">
                    <div class="card-header border-0 bg-primary text-white">
                        <div class="row">
                            <h3 class="col-md-7 mt-0">Gerar relatório</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <h4 class="px-3 my-3 text-muted">1.Selecione o tipo de relatório a ser gerado <i  class="fas fa-file-excel text-success"></i></h4>

                        <div class="row">
                            <div class="w-100">
                                <div class="p-3 justify-content-start">
                                    <div class="input-group mb-3 col-md-12">
                                        <select v-model="relatorioSel" class="form-control">
                                            <option :value="null">Selecione o tipo de relatório</option>
                                            <option :value="{name: 'Condomínio', value: 1}">Gerar relatório: Condomínios</option>
                                            <option :value="{name: 'IPTUS', value: 2}">Gerar relatório: IPTUS</option>
                                            <option :value="{name: 'Fornecedores', value: 3}">Gerar relatório: Fornecedores</option>
                                            <option :value="{name: 'Resumo por empreendimento', value: 4}">Gerar relatório: Resumo por empreendimento</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h4 v-if="relatorioSel" class="px-3 my-3 text-muted">2.Selecione os filtros para gerar um relatório referente a {{ relatorioSel.name }} <i class="fas fa-filter text-primary"></i></h4>

                        <!-- Filtros para condominios -->
                        <div class="row" :class="{'is-fetching': isFetching}" v-if="relatorioSel && relatorioSel.value == 1">
                            <div class="w-100">
                                <div class="p-3 justify-content-start">
                                    <div class="input-group mb-3 col-md-12">
                                        <select v-model="condominios.empreendimento_selected" class="form-control">
                                            <option>Selecione o empreendimento</option>
                                            <option v-for="empre in condominios.empreendimentos" :value="empre">{{ empre.label }}</option>
                                        </select>
                                        <input v-model="condominios.data_cadastro" v-mask="['##/##/####']" type="text" placeholder="Data de cadastro [DD/MM/YYYY].." class="form-control">
                                        <input v-model="condominios.vencimento_de_ate" v-mask="['##/##/####-##/##/####']" type="text" placeholder="Vencimento de-até [DD/MM/YYYY-DD/MM/YYYY].." class="form-control">
                                        <input v-model="condominios.nome_resp" type="text" placeholder="Nome do responsável..." class="form-control">
                                    </div>
                                    <div class="input-group mb-3 col-md-12">
                                        <select v-model="condominios.administradoraSel" class="form-control">
                                            <option v-for="a in 10">Nome administradora {{ a }}</option>
                                        </select>
                                        <select v-model="condominios.statusSel" class="form-control">
                                            <option>Status</option>
                                            <option v-for="status in condominios.status" :value="status.value">{{ status.label }}</option>
                                        </select>
                                        <select v-model="condominios.com_debitos" class="form-control">
                                            <option :value="false">Todas unidades</option>
                                            <option :value="true">Somente com débito(s)</option>
                                        </select>
                                        <input v-model="condominios.data_ref" v-mask="['##/##/####']" type="text" placeholder="Data de referência [DD/MM/YYYY]" class="form-control">
                                    </div>
                                    <div class="col-md-12 text-right">
                                        <button v-on:click="mountAndMake" class="btn btn-success"><i class="fas fa-check"></i> Continuar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-primary text-white border-0 text-right">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <a href="#relatorio" class="btn btn-primary"><i class="fas fa-file-export"></i> Gerar relatório</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../../bus'
import { mask } from 'vue-the-mask'
import { getForList } from '../../api/empreendimentos'

export default {
    name: 'Relatorio',
    directives: {mask},
    data() {
        return {
            isFetching: undefined,
            relatorioSel: null,

            // Armazenaremos os filtro e empreendimentos em seus respectivos objetos.
            condominios: {
                filters: [],
                empreendimentos: [],
                empreendimento_selected: null,
                listLoaded: false,

                data_cadastro: null,
                vencimento_de_ate: null,
                nome_resp: null,

                administradoras: [],
                administradoraSel: null,

                status: [
                    {label: 'Aberto', value: 1},
                    {label: 'Pago', value: 2},
                    {label: 'Renegociado', value: 3}
                ],
                statusSel: 1,

                com_debitos: false,

                data_ref: null
            }
        }
    },
    watch: {
        relatorioSel(v) {
            if(!v.value == 1 || this.condominios.listLoaded) return

            getForList()
                .then(r => {
                    this.condominios.listLoaded = true

                    _.forEach(r.results, v => this.condominios.empreendimentos.push({ label: v.empreendimento_nome, value: v.id, projeto: v.projeto }))

                    if(this.$route.params.projeto)
                       this.condominios.empreendimento_selected = _.find(this.condominios.empreendimentos, (v) => v.projeto == this.$route.params.projeto)
                })
        }
    },
    methods: {
        mountAndMake() {
            console.log(this.mount())
        },
        mount() {
            // Condomínios
            if(this.relatorioSel.value == 1) {
                let mounted = {}

                mounted.empreendimento = this.condominios.empreendimento_selected.value
                mounted.administradora = this.condominios.administradoraSel
                mounted.vencimento_de_ate = this.condominios.vencimento_de_ate
                mounted.responsavel = this.condominios.nome_resp
                mounted.status = this.condominios.statusSel
                mounted.com_debitos = this.condominios.com_debitos
                mounted.data_cad = this.condominios.data_cadastro
                mounted.data_ref = this.condominios.data_ref

                return mounted
            }
        }
    },
    mounted() {
        /*==============================
        =            Events            =
        ==============================*/
        Bus.$on('isFetching', is => this.isFetching = is)
    }
}
</script>

<style type="text/css">
    h4{
        cursor: default;
    }
</style>