<template>
    <div>
        <div class="modal fade" id="modalResumo" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalResumoLabel">Resumo <small class="opacity-small">[ {{ this.newPEP ? this.newPEP : 'Todos empreendimentos' }} ]</small></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <grid-loader class="mx-auto my-5" :loading="isFetching" color="#26256A" size="10px"></grid-loader>
                        <div class="row" v-if="!isFetching && datas">
                            <div v-for="(count, name) in datas.counts" class="col-md-6 mb-3">
                                <div class="card">
                                    <div class="card-header border-0 bg-primary text-white">
                                        <h5>{{ name }}</h5>
                                    </div>
                                    <div class="card-body">
                                        <ul>
                                            <li>Valor {{ name == 'Pago' ? 'pago' : 'principal' }}: R$ {{ count.total | currency }}</li>
                                            <li>Multa: R$ {{ count.multa | currency }}</li>
                                            <li>Juros: R$ {{ count.juros | currency }}</li>
                                            <li>Correção: R$ {{ count.correcao | currency }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
<!--                             <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header border-0 bg-primary text-white">
                                        <h5>Pago</h5>
                                    </div>
                                    <div class="card-body">
                                        <ul>
                                            <li>R$ {{ datas.pago | currency }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div> -->
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header border-0 bg-primary text-white">
                                        <h5><small>+</small>Informações</h5>
                                    </div>
                                    <div class="card-body">
                                        <ul>
                                            <li><b>Ações:</b> {{ datas.acoes | numeral }}</li>
                                            <li><b>Invadido:</b> {{ datas.invadidos | numeral }}</li>
                                            <li><b>Unidades:</b> {{ datas.unidades | numeral }}</li>
                                            <li><b>Blocos:</b> {{ datas.blocos | numeral  }}</li>
                                            <li><b>Emprendimentos:</b> {{ datas.empreendimentos | numeral }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
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
import Bus from '../../../../bus'
import { resumo } from '../../../../api/gestao'
import GridLoader from 'vue-spinner/src/GridLoader'

export default {
    name: 'GestaoResumo',
    components: { GridLoader },
    props: ['PEP'],
    data() {
        return {
            newPEP: '',
            datas: false,
            isFetching: false
        }
    },
    watch: {
        PEP() {
            this.newPEP = this.PEP.substring(0, 12)
            resumo(this.newPEP).then(r => this.datas = r.results)
        }
    },
    methods: {
        onLoad() {
            if(this.PEP) {
                this.newPEP = this.PEP.substring(0, 12)
                resumo(this.newPEP).then(r => this.datas = r.results)
            } else {
                resumo().then(r => this.datas = r.results)
            }
        }
    },
    mounted() {
        // Events
        Bus.$on('isFetching', is => this.isFetching = is)
        Bus.$on('resetForms', () => this.onLoad)

        var self = this

        // Modal events
        $('#modalResumo').on('shown.bs.modal', () => this.onLoad()).on('hidden.bs.modal', () => this.datas = false)
    }
}
</script>