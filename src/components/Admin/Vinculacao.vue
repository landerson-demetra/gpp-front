<template>
    <div id="vinculacao" class="wow fadeIn" data-wow-duration="2s">
        <div class="card shadow border-0">
            <div class="card-header border-0 bg-primary text-white">
                <h3 class="mt-0">Vinculação <small class="opacity-small" v-if="isFetching">[ Carregando empreendimentos... ]</small></h3>
            </div>
            <div class="card-body" :class="{'is-fetching': isFetching}">
                <form>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="Empreendimento">Empreendimento</label>
                            <v-select v-model="empreendimento_selected" name="Empreendimento" id="Empreendimento" placeholder="Selecione..." :options="empreendimentos">
                                <span slot="no-options">Nenhum empreendimento encontrado.</span>
                            </v-select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="PEP">Projeto</label>
                            <input disabled="" v-model="PEP" type="text" class="form-control" placeholder="R.XXXX.99.99">
                        </div>
                    </div>
                </form>

                <hr>

                <div v-if="!this.empreendimento_selected" class="alert alert-secondary text-center"><i class="fas fa-exclamation-circle"></i> Escolha um empreendimento</div>

                <div v-if="this.empreendimento_selected && !this.vinculacao" class="alert alert-secondary text-center"><i class="fas fa-exclamation-circle"></i> Não há vinculações para PEP</div>

                <div class="row mt-3 no-gutters">
                    <table v-if="this.vinculacao" class="table table-hover table-responsive-sm table-bordered table-striped border-top-0">
                        <thead>
                            <tr>
                                <th scope="col">Projeto</th>
                                <th scope="col">ADM</th>
                                <th scope="col">Fornecedor</th>
                                <th scope="col">Fornecedor Água</th>
                                <th scope="col">Fornecedor Luz</th>
                                <th scope="col">Prefeitura</th>
                                <th scope="col">Responsável</th>
                                <th scope="col">Individualizado</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th :title="empreendimento_selected.label"><router-link :to="{ name: 'GestaoPatromonios', params: { pep: empreendimento_selected.projeto }}" class="nav-link">{{ empreendimento_selected.projeto }}</router-link></th>
                                <td><a href="#">{{ vinculacao.administradora ? vinculacao.administradora.nome : 'N/informado' }}</a></td>
                                <td><a href="#">{{ vinculacao.fornecedorsap ? vinculacao.fornecedorsap.nome : 'N/informado' }}</a></td>
                                <td><a href="#">{{ vinculacao.fornecedoragua ? vinculacao.fornecedoragua.nome : 'N/informado' }}</a></td>
                                <td><a href="#">{{ vinculacao.fornecedorluz ? vinculacao.fornecedorluz.nome : 'N/informado' }}</a></td>
                                <td><a href="#">{{ vinculacao.prefeitura ? vinculacao.prefeitura.nome : 'N/informado' }}</a></td>
                                <td><a href="#">{{ vinculacao.responsavel ? vinculacao.responsavel : 'N/informado' }}</a></td>
                                <td>{{ vinculacao.is_ind ? 'Sim' : 'Não' }}</td>
                                <td>
                                    <div class="action-buttons text-center">
                                        <button data-toggle="modal" data-target="#modalEditarVinculacao" class="btn btn-warning"><i class="fa fa-edit"></i></button>
                                        <button data-toggle="modal" data-target="#modalDeletarVinculacao" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="this.empreendimento_selected" class="col text-right">
                        <button :disabled="this.vinculacao" class="btn btn btn-success" data-toggle="modal" data-target="#modalNovaVinculacao"><i class="fas fa-plus"></i> Adicionar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal nova vinculação -->
        <VinculacaoModal action="New" name="NovaVinculacao" title="Criar vinculação"></VinculacaoModal>

        <!-- Modal editar vinculação -->
        <VinculacaoModal :datas="vinculacao" action="Edit" name="EditarVinculacao" title="Editar vinculação"></VinculacaoModal>

        <!-- Modal deletar vinculação -->
        <VinculacaoModal :datas="vinculacao" action="Delete" name="DeletarVinculacao" title="Deletar Vinculação"></VinculacaoModal>
    </div>
</template>

<script>
import Bus from '../../bus'
import { get, store, update, deletedata } from '../../api/vinculacoes'
import { get as getE, getForList } from '../../api/empreendimentos'

import VinculacaoModal from '../includes/Modals/VinculacaoModal'

export default {
    name: 'Vinculacao',
    components: { VinculacaoModal },
    data() {
        return {
            isFetching: false,

            empreendimentos: [],
            empreendimento_selected: false,

            PEP: '',

            vinculacao: null
        }
    },
    watch: {
        empreendimento_selected(selected){
            if(!selected) return

            this.vinculacao = null

            this.fetch()

            this.PEP = selected.projeto
        }
    },
    methods: {
        fetch() {
            get(this.empreendimento_selected.value)
                .then(r => {
                    this.vinculacao = r.results
                    this.vinculacao.projeto = this.empreendimento_selected.projeto
                })
        },
        saveVinculacao(datas) {
            datas.id_projeto = this.empreendimento_selected.value

            store(datas).then(r => {
                // Buscando novamente os registro, melhor do que inserir manualmente 
                this.fetch()

                // Notificando o usuário
                this.$notify({ group: 'normal', type: 'success', text: 'Vinculação para o projeto <b>' + this.PEP + '</b> criada com sucesso' })

                // Fechando a modal
                $('.modal').modal('hide')
            })
        },
        updateVinculacao(datas) {
            update(datas, this.vinculacao.id).then(r => {
                // Buscando novamente os registro, melhor do que atualizar manualmente
                this.fetch()

                // Notificando o usuário
                this.$notify({ group: 'normal', type: 'success', text: 'Vinculação para o projeto <b>' + this.PEP + '</b> atualizada com sucesso' })

                // Fechando a modal
                $('.modal').modal('hide')
            })
        },
        deleteVinculacao() {
            deletedata(this.vinculacao.id).then(r => {
                this.vinculacao = null

                // Notificando o usuário
                this.$notify({ group: 'normal', type: 'success', text: 'Vinculação para o projeto <b>' + this.PEP + '</b> deletada com sucesso' })

                // Fechando a modal
                $('.modal').modal('hide')
            })
        }
    },
    mounted() {
        // isFetching trick
        Bus.$on('isFetching', is => this.isFetching = is)

        // Save Events
        Bus.$on('evNovaVinculacao', (datas) => this.saveVinculacao(datas))

        // Edit events
        Bus.$on('evEditarVinculacao', (datas) => this.updateVinculacao(datas))

        // Delete events
        Bus.$on('evDeletarVinculacao', this.deleteVinculacao)

        // Obtendo a lista de empreendimentos
        getForList()
            .then(r => {
                _.forEach(r.results, v => this.empreendimentos.push({ label: v.empreendimento_nome, value: v.id, projeto: v.projeto }))

                if(this.$route.params.projeto)
                   this.empreendimento_selected = _.find(this.empreendimentos, (v) => v.projeto == this.$route.params.projeto)
            })
    },
    beforeDestroy() {
        Bus.$off()
    }
}
</script>