<template>
    <div>
        <div class="modal fade" id="modalIndices" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalResumoLabel">Índices IPCA</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p><strong>Em construção.</strong></p>
                        <form v-on:submit.prevent="onSubmit">
                            <div class="form-group">
                                <label for="ano_indice">Selecione o ano base do índice:</label>
                                <select id="ano_indice" class="form-control">
                                    <option :value="2019">Ano base: 2019</option>
                                </select>
                            </div>

                            <div v-for="month in monthsWithPer" class="form-row mb-3">
                                <div class="col">
                                    <input v-model="month.month" type="text" class="form-control" placeholder="Mês">
                                </div>
                                <div class="col">
                                    <input v-model="month.value" v-mask="['#,#%','#,##%','##,##%','###']" type="text" class="form-control" placeholder="Valor Mensal (%)">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button v-on:click.prevent="onSubmit" data-dismiss="modal" type="button" class="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { resumo } from '../../../api/gestao'
import GridLoader from 'vue-spinner/src/GridLoader'

export default {
    name: 'IndicesModal',
    components: { GridLoader },
    data: () => ({
        months: [],
        monthsWithPer: []
    }),
    methods: {
        onSubmit() {
            this.$notify({ group: 'normal', type: 'success', text: 'Dados salvos.' })
        }
    },
    mounted() {
        moment.locale('pt_BR')
        moment.months().forEach((item) => this.monthsWithPer.push({ month: item, value: null }))
    }
}
</script>