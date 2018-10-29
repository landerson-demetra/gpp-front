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
                                            <option :value="{value: null}">Selecione o tipo de relatório</option>
                                            <option :value="{name: 'Condomínios', value: 1}">Gerar relatório: Condomínios</option>
                                            <option :value="{name: 'IPTUs', value: 2}">Gerar relatório: IPTUs</option>
                                            <option :value="{name: 'Fornecedores', value: 3}">Gerar relatório: Fornecedores</option>
<!--                                             <option :value="{name: 'Fornecedores', value: 3}">Gerar relatório: Fornecedores</option>
                                            <option :value="{name: 'Resumo por empreendimento', value: 4}">Gerar relatório: Resumo por empreendimento</option> -->
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h4 v-if="relatorioSel.value" class="px-3 my-3 text-muted">2.Selecione os filtros para gerar um relatório referente a {{ relatorioSel.name }} <i class="fas fa-filter text-primary"></i></h4>

                        <!-- Filtros para condominios -->
                        <section class="row" :class="{'is-fetching': isFetching}" v-if="relatorioSel.value == 1">
                            <div class="w-100">
                                <div class="p-3 justify-content-start">
                                    <div class="mb-3 col-md-12">
                                        <v-select v-model="condominios.empreendimento_selected" name="Empreendimento" id="Empreendimento" placeholder="Selecione um empreendimento..." :options="condominios.empreendimentos">
                                            <span slot="no-options">Nenhum empreendimento encontrado.</span>
                                        </v-select>
                                    </div>
                                    <div class="input-group mb-3 col-md-12">
                                        <input v-model="condominios.data_cadastro" v-mask="['##/##/####']" type="text" placeholder="Data de cadastro [DD/MM/YYYY].." class="form-control">
                                        <input v-model="condominios.vencimento_de_ate" v-mask="['##/##/####-##/##/####']" type="text" placeholder="Vencimento de-até [DD/MM/YYYY-DD/MM/YYYY].." class="form-control">
                                        <input v-model="condominios.nome_resp" type="text" placeholder="Nome do responsável..." class="form-control">
                                        <select v-model="condominios.administradoraSel" class="form-control">
                                            <option :value="null">Selecione a administradora</option>
                                            <option v-for="administradora in condominios.administradoras" :value="administradora">{{ administradora }}</option>
                                        </select>
                                    </div>
                                    <div class="input-group mb-3 col-md-12">
                                        <select v-model="condominios.statusSel" class="form-control">
                                            <option :value="null">Qualquer status</option>
                                            <option v-for="status in condominios.status" :value="status">{{ status }}</option>
                                        </select>
                                        <select disabled="" v-model="condominios.com_debitos" class="form-control">
                                            <option :value="false">Todas unidades</option>
                                            <option :value="true">Somente com débito(s)</option>
                                        </select>
                                        <input disabled="" v-model="condominios.data_ref" v-mask="['##/##/####']" type="text" placeholder="Data de referência [DD/MM/YYYY]" class="form-control">
                                    </div>
                                    <!-- <div class="input-group mb-3 col-md-12">
                                        <div class="input-group-prepend"><span class="input-group-text">Email para notificação</span></div>
                                        <input disabled="" v-model="notificationMail" type="text" class="form-control" placeholder="Digite um e-mail válido...">
                                    </div> -->
                                    <div class="col-md-12 text-right">
                                        <button v-on:click="mountAndMake" class="btn btn-success"><i class="fas fa-check"></i> Gerar relatório</button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Filtros para IPTUs -->
                        <section class="row" :class="{'is-fetching': isFetching}" v-if="relatorioSel.value == 2">
                            <div class="w-100">
                                <div class="p-3 justify-content-start">
                                    <div class="mb-3 col-md-12">
                                        <v-select v-model="iptus.empreendimento_selected" name="Empreendimento" id="Empreendimento" placeholder="Selecione um empreendimento..." :options="iptus.empreendimentos">
                                            <span slot="no-options">Nenhum empreendimento encontrado.</span>
                                        </v-select>
                                    </div>
                                    <div class="input-group mb-3 col-md-12">
                                        <input v-model="iptus.data_cadastro" v-mask="['##/##/####']" type="text" placeholder="Data de cadastro [DD/MM/YYYY].." class="form-control">
                                        <input v-model="iptus.vencimento_de_ate" v-mask="['##/##/####-##/##/####']" type="text" placeholder="Vencimento de-até [DD/MM/YYYY-DD/MM/YYYY].." class="form-control">
                                        <select v-model="iptus.prefeituraSel" class="form-control">
                                            <option :value="null">Selecione a prefeitura</option>
                                            <option v-for="prefeitura in iptus.prefeituras" :value="prefeitura">{{ prefeitura }}</option>
                                        </select>
                                        <input v-model="iptus.nome_resp" type="text" placeholder="Nome do responsável..." class="form-control">
                                    </div>
                                    <div class="input-group mb-3 col-md-12">
                                        <select v-model="iptus.statusSel" class="form-control">
                                            <option :value="null">Qualquer status</option>
                                            <option v-for="status in iptus.status" :value="status">{{ status }}</option>
                                        </select>
                                        <select disabled="" v-model="iptus.com_debitos" class="form-control">
                                            <option :value="false">Todas unidades</option>
                                            <option :value="true">Somente com débito(s)</option>
                                        </select>
                                        <input v-model="iptus.numero_contribuinte" type="text" placeholder="Número do contribuinte..." class="form-control">
                                        <input disabled="" v-model="iptus.data_ref" v-mask="['##/##/####']" type="text" placeholder="Data de referência [DD/MM/YYYY]" class="form-control">
                                    </div>
                                    <div class="col-md-12 text-right">
                                        <button v-on:click="mountAndMake" class="btn btn-success"><i class="fas fa-check"></i> Gerar relatório</button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Filtos para fornecedores -->
                        <section class="row" :class="{'is-fetching': isFetching}" v-if="relatorioSel.value == 3">
                            <div class="w-100">
                                <div class="p-3 justify-content-start">
                                    <div class="input-group mb-3 col-md-12">
                                        <input v-model="fornecedores.nome" type="text" placeholder="Nome do Forncededor..." class="form-control">
                                        <input v-model="fornecedores.responsavel" type="text" placeholder="Responsável.." class="form-control">
                                        <input v-model="fornecedores.numerosap" type="text" placeholder="Número SAP..." class="form-control">
                                    </div>
                                    <div class="col-md-12 text-right">
                                        <button v-on:click="mountAndMake" class="btn btn-success"><i class="fas fa-check"></i> Gerar relatório</button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <h4 v-if="generatedRel" class="px-3 my-3 text-muted">3.Relatório gerado <i class="fas fa-check text-success"></i></h4>

                        <section id="generated_rel">
                            <div class="row" v-if="generatedRel">
                                <div class="w-100">
                                    <div class="p-3">
                                        <div class="jumbotron col-md-12">
                                            <h1 class="display-4">Relatório gerado com sucesso</h1>
                                            <p class="lead"></p>
                                            <p class="lead">
                                                <p class="lead">Download não iniciou? <a :href="generated.link" :title="generated.file_name">Clique aqui...</a></p>
                                                <hr class="my-4">
                                                <p>
                                                    <a v-on:click="resetDatas" href="#" title="Clique parar gerar outro relatório" class="btn btn-primary"><i class="fa fa-file-excel"></i> Gerar outro relatório</a>
                                                </p>
                                                <p class="text-muted"><b>Arquivo:</b> {{ generated.file_name }}</p>
                                                <p class="text-muted"><b>Gerado em:</b> {{ generated.when }}</p>
                                            </p>
                                            <p class="lead">
                                                <p class="text-muted"><i class="fa fa-info-circle text-warning"></i> Os relatório gerados ficarão disponíveis no sistema para download por 24hrs.</p>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="card-footer bg-primary text-white border-0 text-right"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../../bus'
import http from '../../modules/http'
import { mask } from 'vue-the-mask'
import { generate, store } from '../../api/relatorios'
import { getForList } from '../../api/empreendimentos'
import { getForSeg as getFornList } from '../../api/fornecedor'

// As vezes precisamos resetar os adaos para o seu estado original
// Então criamos uma função para armazenar os dados originais e se precisa
// Resetar eles.
function getDefaultData() {
    return {
        isFetching: undefined,
        relatorioSel: {value: null},
        generatedRel: false,
        notificationMail: '',

        // Guardando os dados do relatório gerado
        generated: {
            file_name: '',
            link: '',
            when: ''
        },

        // Armazenaremos os filtro e empreendimentos em seus respectivos objetos.
        condominios: {
            empreendimentos: [],
            empreendimento_selected: null,
            listLoaded: false,

            data_cadastro: null,
            vencimento_de_ate: null,
            nome_resp: null,

            administradoras: [],
            administradoraSel: null,

            status: ['Aberto','Pago','Renegociado'],
            statusSel: null,

            com_debitos: false,

            data_ref: null
        },

        iptus: {
            empreendimentos: [],
            empreendimento_selected: null,
            listLoaded: false,

            data_cadastro: null,
            vencimento_de_ate: null,
            nome_resp: null,
            numero_contribuinte: null,

            prefeituras: [],
            prefeituraSel: null,

            status: ['Aberto','Pago','Renegociado'],
            statusSel: null,

            com_debitos: false,

            data_ref: null
        },

        fornecedores: {
            nome: null,
            responsavel: null,
            numerosap: null,
        }
    }
}

export default {
    name: 'Relatorio',
    directives: {mask},
    data: getDefaultData,
    watch: {
        generatedRel() {
            try{
                $('html,body').clearQueue().animate({scrollTop: $('#generated_rel').offset().top}, 500)
            }catch(e){ console.log(e) }
        },
        relatorioSel(v) {
            // Condomínios
            if(v.value == 1 && !this.condominios.listLoaded) {
                getForList().then(r => {
                    _.forEach(r.results, v => this.condominios.empreendimentos.push({ label: v.empreendimento_nome, value: v.id, projeto: v.projeto }))

                    if(this.$route.params.projeto)
                       this.condominios.empreendimento_selected = _.find(this.condominios.empreendimentos, (v) => v.projeto == this.$route.params.projeto)
                }).then(
                    getFornList('Administradora').then(r => {
                        this.condominios.listLoaded = true

                        _.forEach(r.results, v => this.condominios.administradoras.push(v.nome))
                    })
                )
            }

            // Iptus
            if(v.value == 2 && !this.iptus.listLoaded) {
                getForList().then(r => {
                    _.forEach(r.results, v => this.iptus.empreendimentos.push({ label: v.empreendimento_nome, value: v.id, projeto: v.projeto }))

                    if(this.$route.params.projeto)
                       this.iptus.empreendimento_selected = _.find(this.iptus.empreendimentos, (v) => v.projeto == this.$route.params.projeto)
                }).then(
                    getFornList('Prefeitura').then(r => {
                        this.iptus.listLoaded = true

                        _.forEach(r.results, v => this.iptus.administradoras.push(v.nome))
                    })
                )
            }
        }
    },
    methods: {
        mountAndMake() {
            this.$notify({ group: 'normal',  type: 'success', text: 'Gerando o relatório, isso pode levar uns minutos...', duration: -1 })

            this.generatedRel = false

            generate(this.mount()).then(r => {
                this.generatedRel = true

                this.generated.file_name = r.results.file_name
                this.generated.link = r.results.file_link
                this.generated.when = r.results.when

                // Limpando notificações antigas e exibindo as novas
                this.$notify({ group: 'normal', clean: true })
                this.$notify({ group: 'normal',  type: 'success', text: 'Relatório gerado com sucesso!' })

                // Forçando o download do arquivo nos navegadores modernos
                window.location = this.generated.link
            }).catch(e => {
                // Limpando notificações antigas e exibindo as novas
                this.$notify({ group: 'normal', clean: true })

                if(e.response.status == 404) {
                    this.$notify({ group: 'normal', type: 'warn', text: 'Nenhum dado encontrado, confira os filtros.' })
                } else {
                    this.$notify({ group: 'normal', type: 'error', text: 'Ocorreu um erro inesperado ao tentar gerar o relatório :/' })
                }
            })
        },
        mount() {
            var mounted = {}

            mounted.type = this.relatorioSel.value
            mounted.search = {}

            // Condomínios
            if(this.relatorioSel.value == 1) {
                mounted.search.empreendimento = (this.condominios.empreendimento_selected ? this.condominios.empreendimento_selected.value : null)
                mounted.search.administradora = this.condominios.administradoraSel
                mounted.search.vencimento_de_ate = this.condominios.vencimento_de_ate
                mounted.search.responsavel = this.condominios.nome_resp
                mounted.search.status = this.condominios.statusSel
                mounted.search.com_debitos = this.condominios.com_debitos
                mounted.search.data_cad = this.condominios.data_cadastro
                mounted.search.data_ref = this.condominios.data_ref
            }

            // IPTUs
            if(this.relatorioSel.value == 2) {
                mounted.search.empreendimento = (this.iptus.empreendimento_selected ? this.iptus.empreendimento_selected.value : null)
                mounted.search.prefeitura = this.iptus.administradoraSel
                mounted.search.vencimento_de_ate = this.iptus.vencimento_de_ate
                mounted.search.responsavel = this.iptus.nome_resp
                mounted.search.status = this.iptus.statusSel
                mounted.search.com_debitos = this.iptus.com_debitos
                mounted.search.data_cad = this.iptus.data_cadastro
                mounted.search.data_ref = this.iptus.data_ref
            }

            // Fornecedores
            if(this.relatorioSel.value == 3) {
                mounted.search.nome = this.fornecedores.nome
                mounted.search.responsavel = this.fornecedores.responsavel
                mounted.search.numerosap = this.fornecedores.numerosap
            }

            return mounted
        },
        resetDatas() {
            Object.assign(this.$data, getDefaultData())
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