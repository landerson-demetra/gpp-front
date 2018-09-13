<template>
    <div id="DadosUnidade" class="wow fadeIn" data-wow-duration="2s">
        <div class="card shadow border-0">
            <div class="card-header border-0 bg-primary text-white">
                <h3 class="mt-0">Dados da Unidade <small class="opacity-small" v-if="this.pep_exists">[ {{ this.PEP }} ]</small></h3>
            </div>
            <div class="card-body">
                <form action="">
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="PEP">PEP</label>
                            <input v-model="PEP" id="PEP" type="text" class="form-control" placeholder="R.XXXX.99.99.99.9999">
                        </div>
                    </div>
<!--                     <div class="row">
                        <div class="form-group col-md-4">
                            <label for="Empreendimento">Empreendimento</label>
                            <v-select v-model="Empreendimento" name="Empreendimento" placeholder="Empreendimento" :options="this.Empreendimentos">
                                <span slot="no-options">Nenhum empreendimento encontrado.</span>
                            </v-select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="Bloco">Bloco</label>
                            <select :disabled="bloco_blocked" v-model="Bloco" name="bloco" id="Bloco" class="form-control">
                                <option value="" selected>Selecione</option> 
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="Unidade">Unidade</label>
                            <select :disabled="unidade_blocked" v-model="Unidade" name="bloco" id="Unidade" class="form-control">
                                <option value="" selected>Selecione</option> 
                            </select>
                        </div>
                    </div> -->
                </form>

                <hr>

                <div>
                    <div v-if="!pep_exists" class="alert alert-secondary text-center"><i class="fas fa-exclamation-circle"></i> PEP inválida</div>

                    <div v-if="pep_exists && !dados_unidade.length" class="alert alert-secondary text-center"><i class="fas fa-exclamation-circle"></i> Nenhum dado da unidade encontrado para PEP</div>

                    <table v-if="dados_unidade.length && pep_exists" class="table table-hover table-responsive-sm table-bordered table-striped border-top-0">
                        <thead>
                            <tr>
                                <th scope="col">PEP</th>
                                <th scope="col">Nº do Contribuinte</th>
                                <th scope="col">Usuário</th>
                                <th scope="col">Senha</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dado in dados_unidade">
                                <td>{{ dado.PEP_Unidade }}</td>
                                <td>{{ dado.N_Contribuinte }}</td>
                                <td>{{ dado.usuario }}</td>
                                <td>{{ dado.senha }}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button v-on:click="_setDadosUnidadeDatas(dado)" data-toggle="modal" data-target="#modalEditarDado" class="btn btn-warning"><i class="fa fa-edit"></i></button>
                                        <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="row" v-if="this.pep_exists">
                        <div class="col text-right">
                            <button class="btn btn-success" data-toggle="modal" data-target="#modalNovoDado"><i class="fas fa-plus"></i> Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Novo dado -->
        <DadosUnidadeModal action="New" name="NovoDado" title="Cadastrar Dado da Unidade"></DadosUnidadeModal>

        <!-- Editar dado -->
        <DadosUnidadeModal :datas="dados_unidade_selected" action="Edit" name="EditarDado" title="Editar Dado da Unidade"></DadosUnidadeModal>
    </div>
</template>

<script>
import Bus from '../../bus'

import { reMountPEP, parsePEP } from '../../modules/pep'
import { get, store, update } from '../../api/dados-unidade'
import { get as getE } from '../../api/empreendimentos'
import { exists } from '../../api/unidades'

import DadosUnidadeModal from '../includes/Modals/DadosUnidade'
import ClipLoader from 'vue-spinner/src/ClipLoader'

export default {
    name: 'DadosUnidade',
    components: { DadosUnidadeModal, ClipLoader },
    data(){
        return {
            isFetching: false,

            PEP: this.$route.params.pep || null,
            pepParsed: '',
            Empreendimento: '',
            Bloco: '',
            Unidade: '',

            Empreendimentos: [],
            Blocos: [],
            Unidades: [],

            bloco_blocked: true,
            unidade_blocked: true,

            dados_unidade: [],
            dados_unidade_selected: [],
            pep_exists: false
        }
    },
    methods: {
        fetch(){
            var self = this

            exists(this.PEP).then(r => {
                if(r.results) {
                    self.pep_exists = true
                    get(self.PEP).then(r => self.dados_unidade = r.results)
                } else {
                    self.pep_exists = false
                }
            })
        },
        saveDado(datas){
            datas.PEP_Unidade = this.PEP

            store(datas).then(r => {
                if(r.results) {
                    this.dados_unidade.push(r.results)
                }
            }).catch(e => {
                console.log(e)
            })

            // Fechando a modal
            $('.modal').modal('hide')
        },
        updateDado(fields){
            update(this.dados_unidade_selected.id, fields).then(r => {
                // Atualizando o dado da unidade na listagem
                let index = this.dados_unidade.map(e => e.id).indexOf(this.dados_unidade_selected.id)
                this.dados_unidade[index] = r.results

                // Forçando a atualização da DOM
                this.$forceUpdate()

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Dado da unidade atualizado com sucesso'})
            }).catch(e => {
                console.log(e)
            })

            // Fechando a modal
            $('.modal').modal('hide')
        },
        $initPEP(){
            if(!this.PEP || this.PEP.length < 20) {
                this.dados_unidade = []
                this.pep_exists = false
                return
            }

            this.fetch()
        },
        _setDadosUnidadeDatas(datas){
            this.dados_unidade_selected = datas
        }
    },
    watch: {
        PEP(pep){
            this.$initPEP()
        }
    },
    mounted(){
        var self = this

        // Save events
        Bus.$on('NovoDado-onOk', datas => self.saveDado(datas))

        // Edit events
        Bus.$on('EditarDado-onOk', datas => self.updateDado(datas))

        if(this.PEP)
            this.$initPEP(this.PEP)
    }
}
</script>

<style>
    .opacity-small{
        opacity: .5;
    }
</style>