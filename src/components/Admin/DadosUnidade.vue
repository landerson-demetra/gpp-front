<template>
    <div id="DadosUnidade" class="wow fadeIn" data-wow-duration="2s">
        <div class="card shadow border-0">
            <div class="card-header border-0 bg-primary text-white">
                <h3 class="mt-0">Dados da Unidade <small class="opacity-small" v-if="isFetching">[ Aguarde... ]</small><small class="opacity-small" v-if="pep_exists && !isFetching">[ {{ PEP }} ]</small></h3>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="form-group col-md-12">
                        <label for="PEP">PEP</label>
                        <input v-model="PEP" v-mask="['X.XXXX.##.##.##.####']" v-on:input="PEP = $event.target.value.toUpperCase()" id="PEP" type="text" class="form-control" placeholder="R.XXXX.99.99.99.9999">
                    </div>
                </div>

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
                                <td>{{ dado.PEP }}</td>
                                <td>{{ dado.N_Contribuinte }}</td>
                                <td>{{ dado.usuario }}</td>
                                <td>{{ dado.senha }}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button v-on:click="_setDadosUnidadeDatas(dado)" data-toggle="modal" data-target="#modalEditarDado" class="btn btn-warning"><i class="fa fa-edit"></i></button>
                                        <button v-on:click="_setDadosUnidadeDatas(dado)" data-toggle="modal" data-target="#modalDeletarDado"  class="btn btn-danger"><i class="fa fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="row" v-if="pep_exists">
                        <div class="col text-right">
                            <button class="btn btn-success" data-toggle="modal" data-target="#modalNovoDado"><i class="fas fa-plus"></i> Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Novo dado -->
        <DadosUnidadeModal :dadosunidade="dados_unidade" action="New" name="NovoDado" title="Cadastrar Dado da Unidade"></DadosUnidadeModal>

        <!-- Editar dado -->
        <DadosUnidadeModal :dadosunidade="dados_unidade" :datas="dados_unidade_selected" action="Edit" name="EditarDado" title="Editar Dado da Unidade"></DadosUnidadeModal>

        <!-- Deletar dado -->
        <DadosUnidadeModal :dadosunidade="dados_unidade" :datas="dados_unidade_selected" action="Delete" name="DeletarDado" title="Deletar dado da unidade"></DadosUnidadeModal>
    </div>
</template>

<script>
import { mask } from 'vue-the-mask'
import Bus from '../../bus'

import { reMountPEP, parsePEP } from '../../modules/pep'
import { get, store, update, deletedata } from '../../api/dados-unidade'
import { get as getE } from '../../api/empreendimentos'
import { exists } from '../../api/unidades'

import DadosUnidadeModal from '../includes/Modals/DadosUnidade'
import ClipLoader from 'vue-spinner/src/ClipLoader'

export default {
    name: 'DadosUnidade',
    components: { DadosUnidadeModal, ClipLoader },
    directives: {mask},
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

            exists(this.PEP).then(() => {
                self.pep_exists = true
                get(self.PEP)
                    .then(r => self.dados_unidade = r.results)
                    .catch(e => self.dados_unidade = [])
            })
        },
        saveDado(datas){
            datas.PEP = this.PEP

            store(datas).then(r => {
                if(r.results)
                    this.dados_unidade.push(r.results)
            }).catch(e => {
                console.log(e)
            })

            // Fechando a modal
            $('.modal').modal('hide')
        },
        updateDado(fields){
            update(this.dados_unidade_selected.id, fields).then(r => {
                // Re-atualizando a página, melhor do que atualizar no índice
                this.$initPEP()

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text: 'Dado da unidade atualizado com sucesso'})
            }).catch(e => {
                console.log(e)
            })

            // Fechando a modal
            $('.modal').modal('hide')
        },
        deleteDado(){
            deletedata(this.dados_unidade_selected.id).then(r => {
                // Re-atualizando a página, melhor do que remover do índice
                this.$initPEP()

                // Notificando o usuário
                this.$notify({group: 'normal', type: 'success', text: 'Dado da unidade deletado com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                if(e.response.status < 423) return
                this.$notify(this.$config.errors.unexpected)
            })
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
        console.log('blz')
        var self = this

        Bus.$on('isFetching', is => this.isFetching = is)

        // Save events
        Bus.$on('evNovoDado', datas => self.saveDado(datas))

        // Edit events
        Bus.$on('evEditarDado', datas => self.updateDado(datas))

        // Delete events
        Bus.$on('evDeletarDado', b => self.deleteDado())

        if(this.PEP)
            this.$initPEP(this.PEP)
    },
    beforeDestroy() {
        Bus.$off()
    }
}
</script>

<style>
    .opacity-small{
        opacity: .5;
    }
</style>