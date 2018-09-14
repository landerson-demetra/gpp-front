<template>
    <div id="vinculacao" class="wow fadeIn" data-wow-duration="2s">
        <div class="card shadow border-0">
            <div class="card-header border-0 bg-primary text-white">
                <h3 class="mt-0">Vinculação PEP</h3>
            </div>
            <div class="card-body" :class="{'is-fetching': isFetching}">
                <form>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="Empreendimento">Empreendimento</label>
                            <v-select v-model="fornecedor_selected" name="Empreendimento" id="Empreendimento" placeholder="Selecione..." :options="this.fornecedores">
                                <span slot="no-options">Nenhum empreendimento encontrado.</span>
                            </v-select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="PEP">Condominio</label>
                            <input v-model="PEP" type="text" class="form-control" placeholder="R.XXXX.99.99">
                        </div>
                    </div>
                </form>

                <hr>

                <div v-if="!this.fornecedor_selected" class="alert alert-secondary text-center"><i class="fas fa-exclamation-circle"></i> Você precisa escolher um empreendimento/condomínio</div>

                <div class="row mt-3 no-gutters" v-else>
                    <table class="table table-hover table-responsive-sm table-bordered table-striped border-top-0">
                        <thead>
                            <tr>
                                <th scope="col">PEP</th>
                                <th scope="col">ADM</th>
                                <th scope="col">Fornecedor</th>
                                <th scope="col">Prefeitura</th>
                                <th scope="col">Responsável</th>
                                <th scope="col">Individualizado</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="vinculacao in vinculacoes">
                                <th :title="fornecedor_selected.label"><a href="#">{{ vinculacao.PEP_Empreendimento }}</a></th>
                                <td><a href="#">{{ vinculacao.administradora.nome }}</a></td>
                                <td><a href="#">{{ vinculacao.fornecedor.nome }}</a></td>
                                <td><a href="#">{{ vinculacao.prefeitura.nome }}</a></td>
                                <td><a href="#">{{ vinculacao.responsavel.name }}</a></td>
                                <td>{{ vinculacao.is_ind ? 'Sim' : 'Não' }}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn btn-warning"><i class="fa fa-edit"></i></button>
                                        <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="col text-right">
                        <button class="btn btn btn-success" data-toggle="modal" data-target="#modalNovaVinculacao"><i class="fas fa-plus"></i> Adicionar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal nova vinculação -->
        <VinculacaoModal action="New" name="NovaVinculacao" title="Criar vinculação"></VinculacaoModal>
    </div>
</template>

<script>
import Bus from '../../bus'
import { get } from '../../api/vinculacoes'
import { get as getE, getForList } from '../../api/empreendimentos'

import VinculacaoModal from '../includes/Modals/VinculacaoModal'

export default {
    name: 'Vinculacao',
    components: { VinculacaoModal },
    data() {
        return {
            isFetching: false,

            fornecedores: [],
            fornecedor_selected: false,

            PEP: '',

            vinculacoes: []
        }
    },
    watch: {
        fornecedor_selected(selected){
            if(!selected) return

            this.vinculacoes = []

            this.fetch()

            this.PEP = selected.value
        }
    },
    methods: {
        fetch() {
            get(this.fornecedor_selected.value)
                .then(r => this.vinculacoes = r.results)
        }
    },
    mounted() {
        var self = this

        // isFetching trick
        Bus.$on('isFetching', is => self.isFetching = is)

        // Obtendo a lista de fornecedores
        getForList()
            .then(r => _.forEach(r.results, v => self.fornecedores.push({ label: v.empreendimento_nome, value: v.PEP })))
    }
}
</script>