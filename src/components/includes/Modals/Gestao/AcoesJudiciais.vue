<template>
    <div>
        <div class="modal fade" id="modalAcoesJudiciais" tabindex="-1" role="dialog">
            <div class="modal-lg modal-dialog shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalAcoesJudiciaisLabel">Ações Judiciais <small v-if="PEP" class="opacity-small">[ {{ this.PEP }} ]</small></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="!AcoesJudiciais.length" class="alert alert-warning">Não há ações judiciais para esta unidade.</div>

                        <div v-else class="table-responsive">
                            <table class="table table-striped table-bordered table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col"># Caso</th>
                                        <th scope="col">P.Autora</th>
                                        <th scope="col">Empresa</th>
                                        <th scope="col">Processo</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Causa Raiz</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="Acao in AcoesJudiciais">
                                        <th scope="col">{{ Acao.caso }}</th>
                                        <td scope="col">{{ Acao.parte_autora }}</td>
                                        <td scope="col">{{ Acao.empresa }}</td>
                                        <td scope="col">{{ Acao.processo }}</td>
                                        <td scope="col">{{ Acao.status }}</td>
                                        <td scope="col">{{ Acao.causa_raiz }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from '../../../../api/acoes'

export default {
    name: 'AcoesJudiciais',
    props: ['PEP'],
    data() {
        return {
            AcoesJudiciais: []
        }
    },
    watch: {
        PEP() {
            if(!this.PEP || this.PEP.length !== 20) return

            this.fetchAcoes()
        }
    },
    methods: {
        fetchAcoes() {
            get(this.PEP)
                .then(r => {
                    if(r.results.length) {
                        this.AcoesJudiciais = r.results
                        this.$notify({ group: 'keep', type: 'warn', text: 'Essa unidade possui ações judiciais' })
                    }
                })
        }
    },
    mounted() {
        if(this.PEP && this.PEP.length == 20)
            this.fetchAcoes()
    }
}
</script>