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
                        <form v-on:submit.prevent="onSubmit">
                            <div class="form-group">
                                <label for="ano_indice">Selecione o ano base do índice:</label>
                                <select v-model="selected_year" id="ano_indice" class="form-control">
                                    <option v-for="year in years" :value="year">Ano base: {{ year }}</option>
                                </select>
                            </div>

                            <div v-if="loaded" v-for="yrdata in actual_datas" class="form-row mb-3">
                                <div class="col">
                                    <input v-model="yrdata.month" type="text" class="form-control" placeholder="Mês">
                                </div>
                                <div class="col">
                                    <input v-model="yrdata.percentual" type="text" class="form-control" placeholder="Valor Mensal (%)">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button v-on:click.prevent="onSubmit" type="button" class="btn btn-primary">Salvar</button>
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
        years: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
        months: [],
        selected_year: null,
        actual_datas: [],
        year_data: [],
        monthsyear: [],
        loaded: false
    }),
    watch: {
        selected_year() {
            this.actual_datas = _.filter(this.monthsyear, item => item.year == this.selected_year)
        }
    },
    methods: {
        onSubmit() {
            this.$http.post('indice', this.actual_datas)

            this.$notify({ group: 'normal', type: 'success', text: 'Índices salvos com sucesso' })
            $('.modal').modal('hide')
        }
    },
    mounted() {
        moment.locale('pt_BR')

        this.years.forEach(year => {
            moment.months().forEach(month => {
                this.monthsyear.push({ year, month, percentual: null, orig_date: moment().year(year).month(month).date(1).format('YYYY-MM-DD') })
            })
        })

        this.$http.get('indice').then(r => {
            this.selected_year = (new Date()).getFullYear()

            r.data.results.forEach(indice => {
                this.monthsyear.forEach((item, key) => {
                    if(indice.date == item.orig_date) this.monthsyear[key]['percentual'] = indice.percentual
                })
            })

            this.loaded = true
        })
    }
}
</script>